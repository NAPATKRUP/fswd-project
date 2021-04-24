import { PromotionTC } from "../../models/promotion";

export const promotionById = PromotionTC.getResolver("findById");
export const promotionByMany = PromotionTC.getResolver("findMany");
