import { IPromotion } from './IPromotion';

export interface IProduct {
  _id: string;
  slug: string;
  name: string;
  brand: string;
  description?: string;
  price: number;
  image?: string;
  stock: number;
  promotionId?: string;
  promotion?: IPromotion;
  createAt?: string;
  updateAt?: string;
}

export interface ICreateProduct {
  slug?: string;
  name?: string;
  brand?: string;
  price?: number;
  description?: string;
  image?: string;
}

export interface IUpdateProduct {
  slug?: string;
  name?: string;
  brand?: string;
  price?: number;
  stock?: number;
  description?: string;
  image?: string;
}
