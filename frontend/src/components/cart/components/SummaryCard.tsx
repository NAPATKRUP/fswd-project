import { FC } from 'react';

interface SummaryProps {
  totalPrice: number;
  promotionDiscount: number;
  totalFinalPrice: number;
}

const SummaryCard: FC<SummaryProps> = ({
  totalPrice,
  promotionDiscount,
  totalFinalPrice,
}: SummaryProps) => {
  return (
    <div className="lg:px-20 md:px-10 px-4 pt-12">
      <div className="lg:text-2xl text-xl">สรุปรายการ</div>
      <div className="mt-4">
        <div className="grid grid-cols-2 mt-2">
          <div className="lg:text-base text-sm text-left">รวมการสั่งซื้อ</div>
          <div className="lg:text-base text-sm text-right">{totalPrice}</div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div className="lg:text-base text-sm text-left">ส่วนลดที่ได้รับ</div>
          <div className="lg:text-base text-sm text-right border-b-2">{promotionDiscount}</div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div className="lg:text-base text-sm text-left">ยอดชำระเงินทั้งหมด</div>
          <div className="lg:text-base text-sm text-right border-double border-b-4">
            {totalFinalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
