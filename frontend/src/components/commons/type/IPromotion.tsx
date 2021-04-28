import { IProduct } from './IProduct';

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
  updateAt: Date;
  products: IProduct[];
}
