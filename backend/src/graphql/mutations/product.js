import { ValidationError } from 'apollo-server-express';
import { schemaComposer } from 'graphql-compose';

import { ProductModel, ProductTC } from '../../models/product';
import { requiredAuth } from '../middlewares';

export const createProduct = ProductTC.getResolver('createOne');
export const updateProductById = ProductTC.getResolver('updateById');
export const removeProductById = ProductTC.getResolver('removeById');

export const choosePromotionByAdmin = schemaComposer
  .createResolver({
    name: 'choosePromotionByAdmin',
    kind: 'mutation',
    type: ProductTC.getType(),
    args: {
      productId: 'MongoID!',
      promotionId: 'MongoID!',
    },
    resolve: async ({ args, context }) => {
      const { productId, promotionId } = args;
      const { role } = context.user;
      if (role !== 'admin') {
        throw new ValidationError('โปรดใช้บัญชีแอดมินในการเข้าใช้งาน');
      }

      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new ValidationError('ไม่พบสินค้า');
      }

      await ProductModel.findByIdAndUpdate(productId, { promotionId });

      const updatePromotion = await ProductModel.findById(productId);
      return updatePromotion;
    },
  })
  .wrapResolve(requiredAuth);
