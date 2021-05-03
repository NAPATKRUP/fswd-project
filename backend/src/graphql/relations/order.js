import { OrderTC, CartTC, AddressTC, PaymentTC } from '../../models';

OrderTC.addRelation('cart', {
  resolver: () => CartTC.getResolver('findOne'),
  prepareArgs: {
    filter: (source) => ({
      _id: source.cartId,
    }),
  },
  projection: { cartId: 1 },
});

OrderTC.addRelation('address', {
  resolver: () => AddressTC.getResolver('findOne'),
  prepareArgs: {
    filter: (source) => ({
      _id: source.addressId,
    }),
  },
  projection: { addressId: 1 },
});

OrderTC.addRelation('payment', {
  resolver: () => PaymentTC.getResolver('findOne'),
  prepareArgs: {
    filter: (source) => ({
      _id: source.paymentId,
    }),
  },
  projection: { paymentId: 1 },
});
