import { ProductTC, PromotionTC } from "../../models";

ProductTC.addRelation("promotion", {
  resolver: () => PromotionTC.getResolver("findById"),
  prepareArgs: {
    _id: (source) => source.promotionId,
  },
  projection: { promotionId: 1 },
});

// ProductTC.addFields({
// })
