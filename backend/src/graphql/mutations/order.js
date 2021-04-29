import { ValidationError } from 'apollo-server-express';
import { schemaComposer } from 'graphql-compose';

import OrderModel, { OrderTC } from '../../models/order';
import AddressModel from '../../models/address';
import PaymentModel from '../../models/payment';
import CartModel from '../../models/cart';
import ProductModel from '../../models/product';
import { requiredAuth } from '../middlewares';

export const confirmOrder = schemaComposer
  .createResolver({
    name: 'confirmOrder',
    kind: 'mutation',
    type: OrderTC.getType(),
    args: {
      orderId: 'MongoID!',
      addressId: 'MongoID!',
    },
    resolve: async ({ args, context }) => {
      const { orderId, addressId } = args;
      const { _id: userId } = context.user;

      const order = await OrderModel.findOne({ userId, _id: orderId });
      if (!order) {
        throw new ValidationError('ไม่พบออร์เดอร์สินค้า');
      }
      if (order.orderStatus === 'SUCCESS') {
        throw new ValidationError('ออร์เดอร์นี้ได้ถูกทำการสั่งซื้อแล้ว');
      }
      if (order.orderStatus === 'CANCEL') {
        throw new ValidationError('ออร์เดอร์นี้ถูกยกเลิกการสั่งซื้อ');
      }

      const address = await AddressModel.findOne({ userId, _id: addressId });
      if (!address) {
        throw new ValidationError('ไม่พบที่อยู่ในการจัดส่ง');
      }

      await OrderModel.findOneAndUpdate(
        { userId, _id: orderId },
        {
          orderStatus: 'CONFIRM',
          addressId: address._id,
          checkoutAt: Date.now(),
        }
      );

      const updateOrder = await OrderModel.findOne({ userId, _id: orderId });
      return updateOrder;
    },
  })
  .wrapResolve(requiredAuth);

export const paymentOrder = schemaComposer
  .createResolver({
    name: 'paymentOrder',
    kind: 'mutation',
    type: OrderTC.getType(),
    args: {
      orderId: 'MongoID!',
      paymentId: 'MongoID!',
    },
    resolve: async ({ args, context }) => {
      const { orderId, paymentId } = args;
      const { _id: userId } = context.user;

      const order = await OrderModel.findOne({ userId, _id: orderId });
      if (!order) {
        throw new ValidationError('ไม่พบออร์เดอร์สินค้า');
      }
      if (order.orderStatus === 'WAITING') {
        throw new ValidationError('โปรดทำการยืนยันสินค้า และใส่ที่อยู่ในการจัดส่งก่อนการชำระเงิน');
      }
      if (order.orderStatus === 'SUCCESS') {
        throw new ValidationError('ออร์เดอร์นี้ได้ถูกทำการสั่งซื้อแล้ว');
      }
      if (order.orderStatus === 'CANCEL') {
        throw new ValidationError('ออร์เดอร์นี้ถูกยกเลิกการสั่งซื้อ');
      }

      const payment = await PaymentModel.findOne({ userId, _id: paymentId });
      if (!payment) {
        throw new ValidationError('ยืนยันการชำระเงินผิดพลาด');
      }
      // TODO Check money

      await OrderModel.findOneAndUpdate(
        { userId, _id: orderId },
        {
          orderStatus: 'SUCCESS',
          paymentId: payment._id,
          checkoutAt: Date.now(),
        }
      );

      const updateOrder = await OrderModel.findOne({ userId, _id: orderId });
      return updateOrder;
    },
  })
  .wrapResolve(requiredAuth);

export const cancelOrder = schemaComposer
  .createResolver({
    name: 'confirmOrder',
    kind: 'mutation',
    type: OrderTC.getType(),
    args: {
      orderId: 'MongoID!',
    },
    resolve: async ({ args, context }) => {
      const { orderId } = args;
      const { _id: userId } = context.user;

      const order = await OrderModel.findOne({ userId, _id: orderId });
      if (!order) {
        throw new ValidationError('ไม่พบออร์เดอร์สินค้า');
      }
      if (order.orderStatus === 'CANCEL') {
        throw new ValidationError('ออร์เดอร์นี้ถูกยกเลิกการสั่งซื้อแล้ว');
      }

      const cart = await CartModel.findOne({ userId, _id: order.cartId });
      for (const item of cart.items) {
        const product = await ProductModel.findById(item.product._id);
        await ProductModel.findByIdAndUpdate(item.product._id, {
          stock: product.stock + item.amount,
        });
        // Refund Money To Customer if order has payment
      }

      await OrderModel.findOneAndUpdate(
        { userId, _id: orderId },
        { orderStatus: 'CANCEL', cancelAt: Date.now() }
      );

      const updateOrder = await OrderModel.findOne({ userId, _id: orderId });
      return updateOrder;
    },
  })
  .wrapResolve(requiredAuth);
