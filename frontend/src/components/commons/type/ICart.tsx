export interface ICart {
  items: IItem[];
  totalPrice: number;
  promotionDiscount: number;
  totalFinalPrice: number;
}

export interface IItem {
  _id: number;
  name: string;
  brand: string;
  price: number;
  amount: number;
  promotion?: IPromotion;
}

interface IPromotion {
  type: string;
  amount?: number;
  discount?: number;
}
