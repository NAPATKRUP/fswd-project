import { PromotionTC, ProductTC } from '../../models';

PromotionTC.addRelation('products', {
  resolver: () => ProductTC.getResolver('findMany'),
  prepareArgs: {
    filter: (source) => ({
      promotionId: source._id,
    }),
  },
  projection: { _id: 1 },
});
