import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

import { ProductSchema } from "./product";

const { Schema } = mongoose;

const enumCartType = {
  WAITING: "Waiting",
  CHECKOUT: "Checkout",
};

const CartItemsSchema = new Schema({
  product: { type: ProductSchema, required: true },
  amount: { type: Number, required: true },
});

const CartSchema = new Schema({
  status: {
    type: String,
    require: true,
    enum: Object.keys(enumCartType),
    index: true,
  },
  items: { type: [CartItemsSchema], required: false },
  totalPrice: { type: Number, default: 0 },
  promotionDiscount: { type: Number, default: 0 },
  totalFinalPrice: { type: Number, default: 0 },
  userId: { type: String, required: true, ref: "User" },
});

export const CartModel = mongoose.model("Cart", CartSchema);

export const CartTC = composeWithMongoose(CartModel);

export default CartModel;
