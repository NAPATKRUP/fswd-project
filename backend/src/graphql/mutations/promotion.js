import {
  PromotionTC,
  GiveawayPromotionTC,
  SaleFlatPromotionTC,
  SalePercentPromotionTC,
} from '../../models/promotion';

export const createGiveawayPromotion = GiveawayPromotionTC.getResolver('createOne');
export const updateGiveawayPromotionById = GiveawayPromotionTC.getResolver('updateById');

export const createSaleFlatPromotion = SaleFlatPromotionTC.getResolver('createOne');
export const updateSaleFlatPromotionById = SaleFlatPromotionTC.getResolver('updateById');

export const createSalePercentPromotion = SalePercentPromotionTC.getResolver('createOne');
export const updateSalePercentPromotionById = SalePercentPromotionTC.getResolver('updateById');

export const removePromotionById = PromotionTC.getResolver('removeById');
