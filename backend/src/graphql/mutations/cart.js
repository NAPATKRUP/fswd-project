import { ValidationError } from 'apollo-server-express';
import { schemaComposer } from 'graphql-compose';

import CartModel, { CartTC } from '../../models/cart';
import ProductModel from '../../models/product';
// import { requiredAuth } from '../middlewares';

export const createCart = CartTC.getResolver('createOne');

export const addItemInCart = schemaComposer.createResolver({
  name: 'addItemInCart',
  kind: 'mutation',
  type: CartTC.getType(),
  args: {
    productId: 'MongoID!',
  },
  resolve: async ({ args, context }) => {
    const { productId } = args;
    const userId = '6086470c1a67f5279c406ab0';
    // const { _id: userId } = context;

    const product = await ProductModel.findById(productId);
    // Check Product
    if (!product) {
      throw new ValidationError('Invalid Product ID');
    }

    // Check Stock
    if (product.stock <= 0) {
      throw new ValidationError('No Stock');
    }
    await ProductModel.findByIdAndUpdate(productId, { stock: product.stock - 1 });

    const cart = await CartModel.findOne({ userId, status: 'WAITING' });
    if (!cart) {
      throw new ValidationError('Invalid User have not cart please contact to admin');
    }

    // Add in Cart list
    let inCart = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cart.items) {
      if (item.product._id.toString() === productId) {
        inCart = true;
        // eslint-disable-next-line no-await-in-loop
        await CartModel.updateOne(
          { _id: cart._id, 'items._id': item._id },
          {
            $set: {
              'items.$.amount': item.amount + 1,
            },
          }
        ).exec();
        break;
      }
    }
    if (!inCart) {
      await CartModel.findByIdAndUpdate(cart._id, { $push: { items: { product, amount: 1 } } });
    }

    const newCart = await CartModel.findOne({ userId, status: 'WAITING' });
    return newCart;
  },
});
// .wrapResolve(requiredAuth);

export const removeItemInCart = schemaComposer.createResolver({
  name: 'removeItemInCart',
  kind: 'mutation',
  type: CartTC.getType(),
  args: {
    productId: 'MongoID!',
  },
  resolve: async ({ args, context }) => {
    const { productId } = args;
    const userId = '6086470c1a67f5279c406ab0';
    // const { _id: userId } = context;

    const product = await ProductModel.findById(productId);
    // Check Product
    if (!product) {
      throw new ValidationError('Invalid Product ID');
    }

    // Check Stock
    await ProductModel.findByIdAndUpdate(productId, { stock: product.stock + 1 });

    const cart = await CartModel.findOne({ userId, status: 'WAITING' });
    if (!cart) {
      throw new ValidationError('Invalid User have not cart please contact to admin');
    }

    // Remove in Cart list
    // eslint-disable-next-line no-restricted-syntax
    for (const item of cart.items) {
      if (item.product._id.toString() === productId) {
        if (item.amount === 1) {
          // eslint-disable-next-line no-await-in-loop
          await CartModel.findOne({ _id: cart._id }, (error, docs) => {
            if (error) {
              throw new ValidationError('Cart Not Found');
            }
            docs.items.remove({ _id: item._id });
            docs.save();
          });
          break;
        }
        // eslint-disable-next-line no-await-in-loop
        await CartModel.updateOne(
          { _id: cart._id, 'items._id': item._id },
          {
            $set: {
              'items.$.amount': item.amount - 1,
            },
          }
        ).exec();
        break;
      }
    }

    const newCart = await CartModel.findOne({ userId, status: 'WAITING' });
    return newCart;
  },
});
// .wrapResolve(requiredAuth);

export const checkoutCart = schemaComposer.createResolver({
  name: 'checkoutCart',
  kind: 'mutation',
  type: CartTC.getType(),
  args: {
    cartId: 'MongoID!',
  },
  resolve: async ({ args, context }) => {
    const { cartId } = args;
    const userId = '6086470c1a67f5279c406ab0';
    // const { _id: userId } = context;

    const cart = await CartModel.findById(cartId);
    // Check cart
    if (!cart) {
      throw new ValidationError('Invalid Cart ID');
    }

    if (cart.status === 'CHECKOUT') {
      throw new ValidationError('This Cart has been CHECKOUT');
    }

    if (cart.items.length <= 0) {
      throw new ValidationError('Checkout Cart Require Minimum item > 0');
    }

    await CartModel.findByIdAndUpdate(cartId, { $set: { status: 'CHECKOUT' } });
    // Create New WAITING Cart
    const newCart = new CartModel({
      status: 'WAITING',
      userId: userId.toString(),
    });
    await newCart.save();

    const updateCart = CartModel.findById(cartId);
    return updateCart;
  },
});
// .wrapResolve(requiredAuth);
