import { IPromotion } from "./IPromotion";

export interface IProduct {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  description?: string;
  price: number;
  image?: string;
  stock?: number;
  promotion?: IPromotion;
  updateAt: string;
}
