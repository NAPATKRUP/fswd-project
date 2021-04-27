import { schemaComposer } from 'graphql-compose';

import { CartModel, CartTC } from '../../models/cart';
import { PromotionModel } from '../../models/promotion';

export const waitingCart = schemaComposer.createResolver({
  name: 'waitingCart',
  kind: 'query',
  type: CartTC.getType(),
  resolve: async ({ context }) => {
    const { _id: userId } = context.user;
    // const userId = '6086470c1a67f5279c406ab0';
    const cart = await CartModel.findOne({ userId, status: 'WAITING' });

    let totalPrice = 0;
    let promotionDiscount = 0;
    for (const item of cart.items) {
      const promotionProduct = item.product?.promotionId;
      const priceOfItem = item.product.price * item.amount;
      if (promotionProduct) {
        const infoPromotion = await PromotionModel.findById(promotionProduct);
        const promotionType = infoPromotion.type;
        const promotionCondition = infoPromotion?.condition || 0;
        const isSalePromotion = promotionType === 'SaleFlat' || promotionType === 'SalePercent';
        const isActive =
          infoPromotion.startDate <= Date.now() && infoPromotion.endDate >= Date.now();
        const isPassPromotionCondition =
          priceOfItem >= promotionCondition && isSalePromotion && isActive;
        if (isPassPromotionCondition && promotionType === 'SaleFlat') {
          promotionDiscount += infoPromotion.discount;
        } else if (isPassPromotionCondition && promotionType === 'SalePercent') {
          promotionDiscount += (priceOfItem * infoPromotion.discount) / 100;
        }
      }
      totalPrice += priceOfItem;
    }
    const totalFinalPrice = totalPrice - promotionDiscount;

    await CartModel.findOneAndUpdate(
      { userId, status: 'WAITING' },
      {
        $set: {
          totalPrice,
          promotionDiscount,
          totalFinalPrice,
        },
      }
    );

    const resultCart = await CartModel.findOne({ userId, status: 'WAITING' });

    return resultCart;
  },
});
