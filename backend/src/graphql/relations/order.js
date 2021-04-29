import { OrderTC, CartTC } from '../../models';

OrderTC.addRelation('cart', {
  resolver: () => CartTC.getResolver('findOne'),
  prepareArgs: {
    filter: (source) => ({
      _id: source.cartId,
    }),
  },
  projection: { cartId: 1 },
});
