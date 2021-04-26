import { ProductTC, PromotionTC } from "../../models";

ProductTC.addRelation("promotion", {
  resolver: () => PromotionTC.getResolver("findOne"),
  prepareArgs: {
    filter: (source) => ({
      _operators: {
        endDate: { gte: Date.now() },
      },
      _id: source.promotionId,
    }),
  },
  projection: { promotionId: 1 },
});
