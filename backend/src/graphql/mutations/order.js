import { ValidationError } from "apollo-server-express";
import { schemaComposer } from "graphql-compose";

import OrderModel, { OrderTC } from "../../models/order";
import AddressModel from "../../models/address";
import PaymentModel from "../../models/payment";
import CartModel from "../../models/cart";
import ProductModel from "../../models/product";
import { requiredAuth } from "../middlewares";

export const confirmOrder = schemaComposer.createResolver({
  name: "confirmOrder",
  kind: "mutation",
  type: OrderTC.getType(),
  args: {
    orderId: "MongoID!",
    addressId: "MongoID!",
    paymentId: "MongoID!",
  },
  resolve: async ({ args, context }) => {
    const { orderId, addressId, paymentId } = args;
    // const { _id: userId } = context;
    const userId = "6086470c1a67f5279c406ab0";

    const order = await OrderModel.findOne({ userId, _id: orderId });
    if (!order) {
      throw new ValidationError("Invalid Order ID");
    }
    if (order.orderStatus === "SUCCESS") {
      throw new ValidationError("This Order Has Been Paid.");
    }
    if (order.orderStatus === "CANCEL") {
      throw new ValidationError("This Order Has Been Cancel.");
    }

    const address = await AddressModel.findOne({ userId, _id: addressId });
    if (!address) {
      throw new ValidationError("Invalid Address ID");
    }

    const payment = await PaymentModel.findOne({ userId, _id: paymentId });
    if (!payment) {
      throw new ValidationError("Invalid Payment ID");
    }
    // TODO Check money

    await OrderModel.findOneAndUpdate(
      { userId, _id: orderId },
      {
        orderStatus: "SUCCESS",
        addressId: address._id,
        paymentId: payment._id,
        checkoutAt: Date.now(),
      }
    );

    const updateOrder = await OrderModel.findOne({ userId, _id: orderId });
    return updateOrder;
  },
});
// .wrapResolve(requiredAuth);

export const cancelOrder = schemaComposer.createResolver({
  name: "confirmOrder",
  kind: "mutation",
  type: OrderTC.getType(),
  args: {
    orderId: "MongoID!",
  },
  resolve: async ({ args, context }) => {
    const { orderId } = args;
    // const { _id: userId } = context;
    const userId = "6086470c1a67f5279c406ab0";

    const order = await OrderModel.findOne({ userId, _id: orderId });
    if (!order) {
      throw new ValidationError("Invalid Order ID");
    }
    if (order.orderStatus === "CANCEL") {
      throw new ValidationError("This Order Has Been Cancel.");
    }

    const cart = await CartModel.findOne({ userId, _id: order.cartId });
    for (const item of cart.items) {
      const product = await ProductModel.findById(item.product._id);
      await ProductModel.findByIdAndUpdate(item.product._id, {
        stock: product.stock + item.amount,
      });
      // Refund Money To Customer
    }

    await OrderModel.findOneAndUpdate(
      { userId, _id: orderId },
      { orderStatus: "CANCEL", cancelAt: Date.now() }
    );

    const updateOrder = await OrderModel.findOne({ userId, _id: orderId });
    return updateOrder;
  },
});
// .wrapResolve(requiredAuth);
