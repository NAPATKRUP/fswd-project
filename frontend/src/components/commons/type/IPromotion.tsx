import { IProduct } from "./IProduct";

export interface IPromotion {
  slug: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string;
  updateAt: Date;
  products: IProduct[];
}
