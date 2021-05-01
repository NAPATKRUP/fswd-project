import { schemaComposer } from 'graphql-compose';

import { OrderModel, OrderTC } from '../../models/order';

export const orderById = OrderTC.getResolver('findById');
export const orderByMany = OrderTC.getResolver('findMany');

export const customerOrders = schemaComposer.createResolver({
  name: 'customerOrders',
  type: [OrderTC.getType()],
  resolve: async ({ context }) => {
    // const { _id } = context.user;
    try {
      const _id = '6086470c1a67f5279c406ab0';
      const result = await OrderModel.find({ userId: _id });
      return result;
    } catch (e) {
      console.log(e);
    }
  },
});
