import { FC } from 'react';

interface SummaryProps {
  totalPrice: number;
  promotionDiscount: number;
  totalFinalPrice: number;
}

const SummaryWrapper: FC<SummaryProps> = ({
  totalPrice,
  promotionDiscount,
  totalFinalPrice,
}: SummaryProps) => {
  return (
    <div className="px-20 pt-20">
      <div className="text-2xl">สรุปรายการ</div>
      <div className="mt-4">
        <div className="grid grid-cols-2 mt-2">
          <div className="text-left">รวมการสั่งซื้อ</div>
          <div className="text-right">{totalPrice}</div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div className="text-left">ส่วนลดที่ได้รับ</div>
          <div className="text-right border-b-2">{promotionDiscount}</div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div className="text-left">ยอดชำระเงินทั้งหมด</div>
          <div className="text-right border-double border-b-4">{totalFinalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryWrapper;
