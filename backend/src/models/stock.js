import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const StockSchema = new Schema({
  slug: { type: String, required: true },
  remain: { type: Number, required: true },
  productId: { type: String, required: true, ref: "Product" },
});

export const StockModel = mongoose.model("Stock", StockSchema);

export const StockTC = composeWithMongoose(StockModel);

export default StockModel;
