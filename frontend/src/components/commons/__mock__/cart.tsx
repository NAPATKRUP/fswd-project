import { ICart } from "../type/ICart";

const cart: ICart = {
  items: [
    {
      _id: 1,
      name: "BLEU DE CHANEL",
      brand: "CHANEL",
      price: 5000,
      amount: 2,
      promotion: {
        type: "ลดราคา",
        amount: undefined,
        discount: 200,
      },
    },
    {
      _id: 2,
      name: "น้ำหอม Fleur de Peau EDP ขนาด 75 มล.",
      brand: "DIPTYQUE",
      price: 7000,
      amount: 3,
      promotion: {
        type: "1 แถม 1",
        amount: 6,
        discount: undefined,
      },
    },
    {
      _id: 3,
      name: "น้ำหอมผู้หญิง J'adore Eau de Parfum ขนาด 150 มล.",
      brand: "DIOR",
      price: 8000,
      amount: 1,
      promotion: undefined,
    },
    {
      _id: 4,
      name: "น้ำหอม Millesime Imperial EDP 100 มล.",
      brand: "CREED",
      price: 10000,
      amount: 10,
      promotion: undefined,
    },
  ],
  totalPrice: 139000,
  promotionDiscount: 200,
  totalFinalPrice: 138800,
};

export default cart;
