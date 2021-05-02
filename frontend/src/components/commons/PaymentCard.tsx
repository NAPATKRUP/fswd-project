import { FC } from 'react';

import { CreditCardIcon } from '@heroicons/react/outline';

import { IPayment } from './type/IPayment';

interface PaymentProps {
  payment: IPayment;
}

const PaymentCard: FC<PaymentProps> = ({ payment }: PaymentProps) => {
  return (
    <div className="lg:px-20 px-10">
      <p className="lg:text-xl md:text-lg font-semibold mt-8 inline-flex">
        ข้อมูลการชำระเงิน <CreditCardIcon className="h-6 w-6 mx-2 my-1" />
      </p>
      <div className="w-full border-2 border-dark-100 bg-dark-100 rounded-full mt-4 mb-8"></div>
      <p className="md:text-sm lg:text-base">
        ชื่อที่แสดง <span className="font-semibold mx-2">{payment?.name}</span>
      </p>
      <p className="md:text-sm lg:text-base mt-3">รายละเอียดบัตร</p>
      <p className="md:text-sm lg:text-base">
        ชื่อเต็ม <span className="font-semibold mx-2">{payment?.fullName}</span>
      </p>
      <p className="md:text-sm lg:text-base">
        เลขบัตร <span className="font-semibold mx-2">{payment?.cardNumber}</span>
      </p>
    </div>
  );
};

export default PaymentCard;
