import { schemaComposer } from 'graphql-compose';

import { PromotionModel, PromotionTC } from '../../models/promotion';

export const availablePromotion = schemaComposer.createResolver({
  name: 'availablePromotion',
  kind: 'query',
  type: [PromotionTC.getType()],
  resolve: async () => {
    const promotion = await PromotionModel.find({
      $or: [{ startDate: { $gte: new Date() } }, { endDate: { $gte: new Date() } }],
    }).sort({ startDate: 1 });
    return promotion;
  },
});

export const nowPromotion = schemaComposer.createResolver({
  name: 'nowPromotion',
  kind: 'query',
  type: [PromotionTC.getType()],
  resolve: async () => {
    const promotion = await PromotionModel.find({
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
    }).sort({ endDate: 1 });
    return promotion;
  },
});

export const promotionById = PromotionTC.getResolver('findById');
export const promotionByMany = PromotionTC.getResolver('findMany');
