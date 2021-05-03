import { IProduct } from './IProduct';

// old interface; prevent breaking change
export interface IPromotion {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  type: string;
  condition?: number;
  discount?: number;
  amount?: number;
  startDate: Date;
  endDate: Date;
  products: IProduct[];
}

export interface IPromotionBase {
  _id: string;
  type: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  startDate: Date;
  endDate: Date;
  products: IProduct[];
}

export interface IGiveawayPromotion {
  type: 'Giveaway';
  condition: number;
  amount: number;
}

export interface ISaleFlatPromotion {
  type: 'SaleFlat';
  condition: number;
  discount: number;
}
export interface ISalePercentPromotion {
  type: 'SalePercent';
  condition: number;
  discount: number;
}

export type PromotionType = (IGiveawayPromotion | ISaleFlatPromotion | ISalePercentPromotion) &
  IPromotionBase;
export type GiveawayPromotionType = IGiveawayPromotion & IPromotionBase;
export type SaleFlatPromotionType = ISaleFlatPromotion & IPromotionBase;
export type SalePercentPromotionType = ISalePercentPromotion & IPromotionBase;

export type CreatePromotionType = Partial<PromotionType>;
export type CreateGiveawayPromotionType = Partial<GiveawayPromotionType>;
export type CreateSaleFlatPromotionType = Partial<SaleFlatPromotionType>;
export type CreateSalePercentPromotionType = Partial<SalePercentPromotionType>;

export type UpdatePromotionType = Partial<PromotionType>;
export type UpdateGiveawayPromotionType = Partial<GiveawayPromotionType>;
export type UpdateSaleFlatPromotionType = Partial<SaleFlatPromotionType>;
export type UpdateSalePercentPromotionType = Partial<SalePercentPromotionType>;
