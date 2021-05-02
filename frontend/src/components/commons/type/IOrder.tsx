import { ICart } from './ICart';
import { IAddress } from './IAddress';
import { IPayment } from './IPayment';
export interface IOrder {
  _id: string;
  cart: ICart;
  address: IAddress;
  payment: IPayment;
  orderStatus: string;
  usePromotion: IUsePromotion[];
  checkoutAt: Date;
  cancelAt: Date;
}

export interface IUsePromotion {
  product: string;
  promotion: string;
}
