import { IProduct } from './IProduct';
export interface ICart {
  _id: string;
  status: string;
  items: IItem[];
  totalPrice: number;
  promotionDiscount: number;
  totalFinalPrice: number;
}

export interface IItem {
  _id: string;
  product: IProduct;
  amount: number;
}

export enum EnumCartStatus {
  WAITING = 'WAITING',
  CHECKOUT = 'CHECKOUT',
}
