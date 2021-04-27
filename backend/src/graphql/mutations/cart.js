import { ValidationError } from "apollo-server-express";
import { schemaComposer } from "graphql-compose";

import CartModel, { CartTC } from "../../models/cart";
import ProductModel from "../../models/product";
import PromotionModel from "../../models/promotion";
import OrderModel from "../../models/order";
import { requiredAuth } from "../middlewares";

const summaryCart = async (userId) => {
  const cartToSummary = await CartModel.findOne({ userId, status: "WAITING" });

  let totalPrice = 0;
  let promotionDiscount = 0;
  for (const item of cartToSummary.items) {
    const promotionProduct = item.product?.promotionId;
    const priceOfItem = item.product.price * item.amount;
    if (promotionProduct) {
      const infoPromotion = await PromotionModel.findById(promotionProduct);
      const promotionType = infoPromotion.type;
      const promotionCondition = infoPromotion?.condition || 0;
      const isSalePromotion = promotionType === "SaleFlat" || promotionType === "SalePercent";
      const isActive = infoPromotion.startDate <= Date.now() && infoPromotion.endDate >= Date.now();
      const isPassPromotionCondition =
        priceOfItem >= promotionCondition && isSalePromotion && isActive;
      if (isPassPromotionCondition && promotionType === "SaleFlat") {
        promotionDiscount += infoPromotion.discount;
      } else if (isPassPromotionCondition && promotionType === "SalePercent") {
        promotionDiscount += (priceOfItem * infoPromotion.discount) / 100;
      }
    }
    totalPrice += priceOfItem;
  }
  const totalFinalPrice = totalPrice - promotionDiscount;

  await CartModel.findOneAndUpdate(
    { userId, status: "WAITING" },
    {
      $set: {
        totalPrice,
        promotionDiscount,
        totalFinalPrice,
      },
    }
  );
};

export const createCart = CartTC.getResolver("createOne");

export const addItemInCart = schemaComposer.createResolver({
  name: "addItemInCart",
  kind: "mutation",
  type: CartTC.getType(),
  args: {
    productId: "MongoID!",
  },
  resolve: async ({ args, context }) => {
    const { productId } = args;
    // const { _id: userId } = context;
    const userId = "6086470c1a67f5279c406ab0";

    const product = await ProductModel.findById(productId);
    if (!product) {
      throw new ValidationError("Invalid Product ID");
    }

    if (product.stock <= 0) {
      throw new ValidationError("No Stock");
    }
    await ProductModel.findByIdAndUpdate(productId, { stock: product.stock - 1 });

    const cart = await CartModel.findOne({ userId, status: "WAITING" });
    if (!cart) {
      throw new ValidationError("Invalid User have not cart please contact to admin");
    }

    let inCart = false;
    for (const item of cart.items) {
      if (item.product._id.toString() === productId) {
        inCart = true;
        await CartModel.updateOne(
          { _id: cart._id, "items._id": item._id },
          {
            $set: {
              "items.$.amount": item.amount + 1,
            },
          }
        ).exec();
        break;
      }
    }
    if (!inCart) {
      await CartModel.findByIdAndUpdate(cart._id, { $push: { items: { product, amount: 1 } } });
    }

    await summaryCart(userId);

    const updateCart = await CartModel.findOne({ userId, status: "WAITING" });
    return updateCart;
  },
});
// .wrapResolve(requiredAuth);

export const removeItemInCart = schemaComposer.createResolver({
  name: "removeItemInCart",
  kind: "mutation",
  type: CartTC.getType(),
  args: {
    productId: "MongoID!",
  },
  resolve: async ({ args, context }) => {
    const { productId } = args;
    // const { _id: userId } = context;
    const userId = "6086470c1a67f5279c406ab0";

    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new ValidationError("Invalid Product ID");
    }

    await ProductModel.findByIdAndUpdate(productId, { stock: product.stock + 1 });

    const cart = await CartModel.findOne({ userId, status: "WAITING" });
    if (!cart) {
      throw new ValidationError("Invalid User have not cart please contact to admin");
    }

    for (const item of cart.items) {
      if (item.product._id.toString() === productId) {
        if (item.amount === 1) {
          await CartModel.findOne({ _id: cart._id }, (error, docs) => {
            if (error) {
              throw new ValidationError("Cart Not Found");
            }
            docs.items.remove({ _id: item._id });
            docs.save();
          });
          break;
        }
        await CartModel.updateOne(
          { _id: cart._id, "items._id": item._id },
          {
            $set: {
              "items.$.amount": item.amount - 1,
            },
          }
        ).exec();
        break;
      }
    }

    await summaryCart(userId);

    const updateCart = await CartModel.findOne({ userId, status: "WAITING" });
    return updateCart;
  },
});
// .wrapResolve(requiredAuth);

export const checkoutCart = schemaComposer.createResolver({
  name: "checkoutCart",
  kind: "mutation",
  type: CartTC.getType(),
  resolve: async ({ context }) => {
    // const { _id: userId } = context;
    const userId = "6086470c1a67f5279c406ab0";

    const cart = await CartModel.findOne({ userId, status: "WAITING" });
    if (!cart) {
      throw new ValidationError("Invalid Cart ID");
    }

    if (cart.status === "CHECKOUT") {
      throw new ValidationError("This Cart has been CHECKOUT");
    }

    if (cart.items.length <= 0) {
      throw new ValidationError("Checkout Cart Require Minimum item > 0");
    }

    await summaryCart(userId);

    const usePromotionList = [];
    for (const item of cart.items) {
      const itemProduct = item.product;
      const product = await ProductModel.findById(itemProduct._id);
      const itemPromotion = await PromotionModel.findById(product.promotionId);
      if (itemPromotion === null) continue;

      const isActive = itemPromotion.startDate <= Date.now() && itemPromotion.endDate >= Date.now();
      if (itemPromotion.type === "Giveaway" && item.amount >= itemPromotion.condition && isActive) {
        if (product.stock < itemPromotion.amount) {
          usePromotionList.push({
            product: `${itemProduct.brand} | ${itemProduct.name}`,
            promotion: `${itemPromotion.type} | ${itemPromotion.name} ( สินค้าหมดไม่สามารถใช้โปรโมชั่นได้ )`,
          });
          continue;
        }
        await ProductModel.findByIdAndUpdate(itemProduct._id, {
          stock: product.stock - itemPromotion.amount,
        });
        await CartModel.updateOne(
          { _id: cart._id, "items._id": item._id },
          {
            $set: {
              "items.$.amount": item.amount + itemPromotion.amount,
            },
          }
        ).exec();
        usePromotionList.push({
          product: `${itemProduct.brand} | ${itemProduct.name}`,
          promotion: `${itemPromotion.type} | ${itemPromotion.name} ( ซื้อครบ ${itemPromotion.condition} ชิ้น แถม ${itemPromotion.amount} ชิ้น )`,
        });
      } else if (
        itemPromotion.type === "Giveaway" &&
        item.amount < itemPromotion.condition &&
        isActive
      ) {
        usePromotionList.push({
          product: `${itemProduct.brand} | ${itemProduct.name}`,
          promotion: `${itemPromotion.type} | ${itemPromotion.name} ( ไม่ได้รับโปรโมชั่นเนื่องจากซื้อสินค้าไม่ครบตามที่กำหนด )`,
        });
      } else if (itemPromotion.type === "SaleFlat" && isActive) {
        usePromotionList.push({
          product: `${itemProduct.brand} | ${itemProduct.name}`,
          promotion: `${itemPromotion.type} | ${itemPromotion.name} ( ซื้อครบ ${itemPromotion.condition} บาท ได้รับส่วนลด ${itemPromotion.discount} บาท )`,
        });
      } else if (itemPromotion.type === "SalePercent" && isActive) {
        usePromotionList.push({
          product: `${itemProduct.brand} | ${itemProduct.name}`,
          promotion: `${itemPromotion.type} | ${itemPromotion.name} ( ซื้อครบ ${itemPromotion.condition} บาท ได้รับส่วนลด ${itemPromotion.discount} % )`,
        });
      }
    }
    console.log(usePromotionList);

    await CartModel.findByIdAndUpdate(cart._id, { $set: { status: "CHECKOUT" } });

    const order = new OrderModel({
      orderStatus: "WAITING",
      userId: userId.toString(),
      cartId: cart._id,
      usePromotion: usePromotionList,
    });
    await order.save();

    const newCart = new CartModel({
      status: "WAITING",
      userId: userId.toString(),
    });
    await newCart.save();

    const updateCart = CartModel.findOne({ userId, status: "WAITING" });
    return updateCart;
  },
});
// .wrapResolve(requiredAuth);
