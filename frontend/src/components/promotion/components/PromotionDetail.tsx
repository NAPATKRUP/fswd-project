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
    <div className="grid grid-cols-2 gap-4 mt-4">
      {promotions?.map((data) => {
        const startDateLabel = moment(new Date(data.startDate)).format('LL');
        const endDateLabel = moment(data.endDate).format('LL');

        return (
          <div className="border-2 border-black rounded p-4" key={data._id}>
            <p className="text-2xl text-center">{data.name}</p>
            {data?.image && <img src={data.image} alt={data.name} />}
            {data?.description && (
              <div className="my-4">
                <p className="text-lg">รายละเอียด</p>
                <p className="text-sm">{data.description}</p>
                <p className="text-sm my-2">
                  เริ่มตั้งแต่วันที่ {startDateLabel} จนถึง {endDateLabel} นี้ ด่วนเลย
                </p>
              </div>
            )}
            {data?.products.length > 0 && (
              <div>
                <p className="text-lg">สินค้าที่ร่วมรายการ</p>
                {data?.products.map((product) => (
                  <p className="text-sm" key={product._id}>
                    <NavLink to={`/product/${product.slug}`}>
                      {product.brand}| {product.name}
                    </NavLink>
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PromotionCard;
