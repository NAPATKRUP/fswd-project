import mongoose from "mongoose";
import { composeWithMongooseDiscriminators } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const DKey = "type";
const enumPromotionType = {
  GIVEAWAY: "Giveaway",
  SALEFLAT: "SaleFlat",
  SALEPERCENT: "SalePercent",
};
const PromotionSchema = new Schema({
  slug: { type: String, require: true },
  type: {
    type: String,
    require: true,
    enum: Object.keys(enumPromotionType),
    index: true,
  },
  name: { type: String, require: true },
  image: { type: String, require: false },
  description: { type: String, require: false },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, default: Date.now },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
});
const GiveawayPromotionSchema = new Schema({
  condition: { type: Number, require: true },
  amount: { type: Number, require: true },
});
const SaleFlatPromotionSchema = new Schema({
  condition: { type: Number, require: false },
  discount: { type: Number, require: true },
});
const SalePercentPromotionSchema = new Schema({
  condition: { type: Number, require: false },
  discount: { type: Number, require: true },
});
PromotionSchema.set("discriminatorKey", DKey);

// TO DO: Recheck
const discriminatorOptions = {
  inputType: {
    removeFields: ["createAt", "updateAt"],
  },
};

export const PromotionModel = mongoose.model("Promotion", PromotionSchema);
export const GiveawayPromotionModel = PromotionModel.discriminator(
  enumPromotionType.GIVEAWAY,
  GiveawayPromotionSchema
);
export const SaleFlatPromotionModel = PromotionModel.discriminator(
  enumPromotionType.SALEFLAT,
  SaleFlatPromotionSchema
);
export const SalePercentPromotionModel = PromotionModel.discriminator(
  enumPromotionType.SALEPERCENT,
  SalePercentPromotionSchema
);

export const PromotionTC = composeWithMongooseDiscriminators(PromotionModel);
export const GiveawayPromotionTC = PromotionTC.discriminator(GiveawayPromotionModel, {
  name: enumPromotionType.GIVEAWAY,
  ...discriminatorOptions,
});
export const SaleFlatPromotionTC = PromotionTC.discriminator(SaleFlatPromotionModel, {
  name: enumPromotionType.SALEFLAT,
  ...discriminatorOptions,
});
export const SalePercentPromotionTC = PromotionTC.discriminator(SalePercentPromotionModel, {
  name: enumPromotionType.SALEPERCENT,
  ...discriminatorOptions,
});

export default PromotionModel;
