import { FC } from 'react';
import moment from 'moment';

import { IPromotion } from './type/IPromotion';

interface PromotionAvailableCardProp {
  promotion: IPromotion;
}

const PromotionAvailableCard: FC<PromotionAvailableCardProp> = ({
  promotion,
}: PromotionAvailableCardProp) => {
  const startDateLabel = moment(new Date(promotion?.startDate)).format('LL');
  const endDateLabel = moment(promotion?.endDate).format('LL');

  return (
    <div className="text-left w-full mx-1 mt-4 px-4 py-2 text-sm bg-gold-300 rounded-full">
      {promotion?.type === 'Giveaway' && (
        <p>
          {promotion?.type} | สินค้านี้มีโปรโมชั่นเมื่อซื้อครบ {promotion?.condition} ชิ้น แถมอีก{' '}
          {promotion?.amount} ชิ้นฟรี
        </p>
      )}
      {promotion?.type === 'SaleFlat' && (
        <p>
          {promotion?.type} | สินค้านี้มีโปรโมชั่นเมื่อซื้อครบ {promotion?.condition} บาท
          จะได้รับส่วนลด {promotion?.discount} บาท
        </p>
      )}
      {promotion?.type === 'SalePercent' && (
        <p>
          {promotion?.type} | สินค้านี้มีโปรโมชั่นเมื่อซื้อครบ {promotion?.condition} บาท
          จะได้รับส่วนลด {promotion?.discount} %
        </p>
      )}
      <p className="text-right">
        เริ่มวันที่ <b>{startDateLabel}</b> จนถึง <b>{endDateLabel}</b>
      </p>
    </div>
  );
};

export default PromotionAvailableCard;
