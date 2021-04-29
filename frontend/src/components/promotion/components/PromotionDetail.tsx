import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/th';

import { IPromotion } from '../../commons/type/IPromotion';

interface PromotionProp {
  promotions: IPromotion[];
}

const PromotionCard: FC<PromotionProp> = ({ promotions }: PromotionProp) => {
  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
      {promotions?.map((data) => {
        const startDateLabel = moment(new Date(data.startDate)).format('LLL');
        const endDateLabel = moment(data.endDate).format('LLL');

        return (
          <div
            className="flex flex-col justify-between border-2 border-dashed border-dark-100 bg-white-100 rounded-xl p-4"
            key={data._id}
          >
            <p className="text-2xl font-semibold text-center">{data.name}</p>
            {data?.image && <img src={data.image} alt={data.name} />}
            {data?.description && (
              <div className="my-4">
                <p className="text-lg">รายละเอียด</p>
                <p className="text-sm">{data.description}</p>
              </div>
            )}
            {data?.products.length > 0 && (
              <div>
                <p className="text-lg">สินค้าที่ร่วมรายการ</p>
                {data?.products.map((product, index) => (
                  <p className="text-sm" key={product._id}>
                    <NavLink to={`/product/${product.slug}`}>
                      {index + 1}. {product.brand}| {product.name}
                    </NavLink>
                  </p>
                ))}
              </div>
            )}
            <div className="text-left">
              <p className="text-sm mt-4">เริ่มตั้งแต่วันที่ {startDateLabel}</p>
              <p className="text-sm">จนถึงวันที่ {endDateLabel}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PromotionCard;
