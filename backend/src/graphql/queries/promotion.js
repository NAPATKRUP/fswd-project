import { schemaComposer } from 'graphql-compose';

import { PromotionModel, PromotionTC } from '../../models/promotion';

export const availablePromotion = schemaComposer.createResolver({
  name: 'availablePromotion',
  kind: 'query',
  type: [PromotionTC.getType()],
  resolve: async () => {
    const promotion = await PromotionModel.find({
      $or: [{ startDate: { $gte: new Date() } }, { endDate: { $gte: new Date() } }],
    });
    return promotion;
  },
});

export const promotionById = PromotionTC.getResolver('findById');
export const promotionByMany = PromotionTC.getResolver('findMany');
