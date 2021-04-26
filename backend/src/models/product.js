import mongoose from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';

const { Schema } = mongoose;

export const ProductSchema = new Schema({
  slug: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  image: {
    type: String,
    default:
      'https://backend.central.co.th/media/catalog/product/c/d/cds70224856-1.jpg?impolicy=resize&width=553',
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  stock: { type: Number, default: 0 },
  promotionId: { type: String, require: true, ref: 'Promotion' },
});

export const ProductModel = mongoose.model('Product', ProductSchema);

export const ProductTC = composeWithMongoose(ProductModel);

export default ProductModel;
