import { FC } from 'react';

import { IOrder, IUsePromotion } from '../commons/type/IOrder';
import { IItem } from '../commons/type/ICart';

interface OrderProps {
  data: IOrder;
}

const ConfirmOrderCard: FC<OrderProps> = ({ data }: OrderProps) => {
  return (
    <div className="lg:px-20 px-10 pt-12">
      <div className="lg:text-2xl md:text-xl font-semibold">ยืนยันคำสั่งซื้อ ID: #{data._id}</div>
      <div className="w-full border-2 border-dark-100 bg-dark-100 rounded-full mt-4 mb-8"></div>
      {data.cart.items?.map((item: IItem, index: number) => (
        <div key={item._id} className="grid lg:grid-cols-3 md:gridcols-2 gap-4 mt-4">
          <div className="lg:col-span-2">
            <p className="md:text-sm lg:text-base">
              {index + 1}. {item.product.brand}| {item.product.name}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className="md:text-sm lg:text-base">
              ราคาต่อชิ้น <span className="font-semibold">{item.product.price} บาท</span>
            </p>
            <p className="md:text-sm lg:text-base">
              จำนวนชิ้นที่ได้รับ <span className="font-semibold">{item.amount} ชิ้น</span>
            </p>
          </div>
        </div>
      ))}

      <div className="flex justify-end mt-4 p-1 px-2 bg-white-200 rounded-xl">
        <p className="md:text-sm lg:text-base ml-4">
          <span className="font-semibold mr-2">รวมการสั่งซื้อ</span>
          {data.cart.totalPrice} บาท
        </p>
        <p className="md:text-sm lg:text-base ml-4">
          <span className="font-semibold mr-2">ส่วนลดที่ได้รับ</span>
          {data.cart.promotionDiscount} บาท
        </p>
        <p className="md:text-sm lg:text-base ml-4">
          <span className="font-semibold mr-2">ยอดชำระเงินทั้งหมด</span>
          {data.cart.totalFinalPrice} บาท
        </p>
      </div>

      <p className="md:text-xs lg:text-sm text-dark-200 my-4">
        <span className="font-semibold underline">หมายเหตุ</span>{' '}
        จำนวนชิ้นสินค้าที่แสดงเป็นจำนวนที่ได้ทำการรวมกับโปรโมชั่น
        โดยสามารถตรวจสอบเงื่อนไขที่ได้รับได้ที่ช่อง{' '}
        <span className="font-semibold">โปรโมชั่นที่ได้รับด้านล่าง</span>
      </p>

      <p className="lg:text-xl md:text-lg font-semibold mt-8 mb-4">โปรโมชั่นที่ได้รับ</p>
      <div className="w-full border-2 border-gold-100 bg-gold-100 rounded-full mt-2 mb-6"></div>
      {data.usePromotion?.map((usePro: IUsePromotion, index: number) => (
        <div key={data._id + 'pro' + index} className="grid lg:grid-cols-2 mt-2">
          <p className="md:text-sm lg:text-base">{usePro.promotion}</p>
          <p className="md:text-sm lg:text-base">สินค้าที่ร่วมรายการ: {usePro.product}</p>
        </div>
      ))}
    </div>
  );
};

export default ConfirmOrderCard;
