import { schemaComposer } from "graphql-compose";

import { PromotionModel, PromotionTC } from "../../models/promotion";

export const latestPromotionResolver = schemaComposer.createResolver({
  name: "latestPromotion",
  kind: "query",
  type: [PromotionTC.getType()],
  args: {
    show: "Int!",
  },
  resolve: async ({ args }) => {
    const { show } = args;
    const promotion = await PromotionModel.find().sort({ updateAt: -1 }).limit(show);
    return promotion;
  },
});

export const promotionById = PromotionTC.getResolver("findById");
export const promotionByMany = PromotionTC.getResolver("findMany");
