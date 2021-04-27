import React, { FunctionComponent } from 'react';

interface SummaryProps {
  totalPrice: number;
  promotionDiscount: number;
  totalFinalPrice: number;
}

const SummaryWrapper: FunctionComponent<SummaryProps> = ({
  totalPrice,
  promotionDiscount,
  totalFinalPrice,
}: SummaryProps) => {
  return (
    <div className="px-20 pt-20">
      <div className="text-2xl">Summary</div>
      <div className="mt-4">
        <div className="grid grid-cols-2 mt-2">
          <div className="text-left">Total Price</div>
          <div className="text-right">{totalPrice}</div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div className="text-left">Promotion Discount</div>
          <div className="text-right border-b-2">{promotionDiscount}</div>
        </div>
        <div className="grid grid-cols-2 mt-2">
          <div className="text-left">Total Final Price</div>
          <div className="text-right border-double border-b-4">{totalFinalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryWrapper;
