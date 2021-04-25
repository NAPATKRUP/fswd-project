import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const PaymentSchema = new Schema({
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  userId: { type: String, required: true, ref: "User" },
});

export const PaymentModel = mongoose.model("Payment", PaymentSchema);

export const PaymentTC = composeWithMongoose(PaymentModel);

export default PaymentModel;
