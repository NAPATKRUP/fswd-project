import { ValidationError } from 'apollo-server-express';
import { schemaComposer } from 'graphql-compose';
import moment from 'moment';
import 'moment/locale/th';

import { OrderModel, OrderTC, CartModel } from '../../models';
import { requiredAuth } from '../middlewares';

export const orderById = OrderTC.getResolver('findById');
export const orderByMany = OrderTC.getResolver('findMany');

export const orderByUserContext = schemaComposer
  .createResolver({
    name: 'orderByUserContext',
    kind: 'query',
    type: [OrderTC.getType()],
    resolve: async ({ context }) => {
      const { _id: userId } = context.user;
      const order = await OrderModel.find({ userId }).sort({ checkoutAt: -1 });
      return order;
    },
  })
  .wrapResolve(requiredAuth);

export const orderByIdOfUser = schemaComposer
  .createResolver({
    name: 'orderByIdOfUser',
    kind: 'query',
    type: OrderTC.getType(),
    args: {
      orderId: 'MongoID!',
    },
    resolve: async ({ args, context }) => {
      const { orderId } = args;
      const { _id: userId } = context.user;
      const order = await OrderModel.findOne({ _id: orderId, userId });
      return order;
    },
  })
  .wrapResolve(requiredAuth);

const orderSummaryPayload = schemaComposer.createObjectTC({
  name: 'orderSummaryPayload',
  fields: {
    date: 'String',
    total: 'Float',
  },
});
export const orderSummary = schemaComposer
  .createResolver({
    name: 'orderSummary',
    kind: 'query',
    type: [orderSummaryPayload],
    resolve: async ({ context }) => {
      const { role } = context.user;
      if (role !== 'admin') {
        throw new ValidationError('โปรดใช้บัญชีแอดมินในการเข้าใช้งาน');
      }
      const orders = await OrderModel.find({
        $or: [{ orderStatus: 'SUCCESS' }, { orderStatus: 'SHIPPING' }, { orderStatus: 'ARRIVED' }],
      }).sort({ checkoutAt: 1 });
      const listOfDate = [];
      for (const order of orders) {
        const newDate = moment(order.checkoutAt).format('L');
        const cart = await CartModel.findById(order.cartId);
        const findInArrray = listOfDate.find((x) => x.date === newDate);
        if (findInArrray) {
          findInArrray.total += cart.totalFinalPrice;
        } else {
          listOfDate.push({ date: newDate, total: cart.totalFinalPrice });
        }
      }
      return listOfDate;
    },
  })
  .wrapResolve(requiredAuth);
