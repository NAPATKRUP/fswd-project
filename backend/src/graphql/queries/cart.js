import { schemaComposer } from 'graphql-compose';

import { CartModel, CartTC } from '../../models/cart';

export const waitingCart = schemaComposer.createResolver({
  name: 'waitingCart',
  kind: 'query',
  type: CartTC.getType(),
  resolve: async ({ context }) => {
    const { _id } = context.user;
    const cart = await CartModel.findOne({ userId: _id, status: 'WAITING' });
    return cart;
  },
});
