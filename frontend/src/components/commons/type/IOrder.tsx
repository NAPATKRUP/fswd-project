import { ICart } from './ICart';
export interface IOrder {
  _id: string;
  userId: string;
  cartId: string;
  cart: ICart;
  orderStatus: string;
  usePromotion: IUsePromotion[];
}

export interface IUsePromotion {
  product: string;
  promotion: string;
}
