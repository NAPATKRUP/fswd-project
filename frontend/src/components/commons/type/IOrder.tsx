import { ICart } from './ICart';
export interface IOrder {
  _id: string;
  userId: string;
  cartId: string;
  cart: ICart;
  orderStatus: string;
  usePromotion: IUsePro[];
}

export interface IUsePro {
  product: string;
  promotion: string;
}
