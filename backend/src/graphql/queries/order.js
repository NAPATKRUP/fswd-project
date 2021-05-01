import { schemaComposer } from 'graphql-compose';

import { OrderModel, OrderTC } from '../../models/order';
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
