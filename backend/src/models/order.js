import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const enumOrderType = {
  WAITING: "Waiting",
  SUCCESS: "Success",
  CANCEL: "Cancel",
};

const OrderSchema = new Schema({
  slug: { type: String, required: true },
  checkoutAt: { type: Date, default: Date.now },
  orderStatus: {
    type: String,
    require: true,
    enum: Object.keys(enumOrderType),
    index: true,
  },
  userId: { type: String, required: true, ref: "User" },
  cartId: { type: String, required: true, ref: "Cart" },
  paymentId: { type: String, required: false, ref: "Payment" },
  addressId: { type: String, required: false, ref: "Address" },
});

export const OrderModel = mongoose.model("Order", OrderSchema);

export const OrderTC = composeWithMongoose(OrderModel);

export default OrderModel;
