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
      'https://e7n2g8x7.rocketcdn.me/wp-content/themes/labomba/images/wc-placeholder-cart.gif',
  },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  stock: { type: Number, default: 0 },
  promotionId: { type: String, require: true, ref: 'Promotion' },
});

export const ProductModel = mongoose.model('Product', ProductSchema);

export const ProductTC = composeWithMongoose(ProductModel);

export default ProductModel;
