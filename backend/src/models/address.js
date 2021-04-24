import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const AddressSchema = new Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  addressDetail: { type: String, required: true },
  userId: { type: String, required: true, ref: "User" },
});

export const AddressModel = mongoose.model("Address", AddressSchema);

export const AddressTC = composeWithMongoose(AddressModel);

export default AddressModel;
