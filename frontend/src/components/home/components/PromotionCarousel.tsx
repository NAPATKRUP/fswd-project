import { FC, lazy } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useQuery } from '@apollo/client';
import { NOW_PROMOTION_QUERY } from '../../../graphql/nowPromotionQuery';
import moment from 'moment';
import 'moment/locale/th';

import { IPromotion } from '../../commons/type/IPromotion';

const Loading = lazy(() => import('../../commons/loading/Loading'));

const PromotionCarousel: FC = () => {
  const { loading, error, data } = useQuery(NOW_PROMOTION_QUERY);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    alert('error');
  }
  const { nowPromotion } = data;

  const caroulselResponvie = {
    480: {
      items: 1,
    },
    768: {
      items: 2,
    },
    992: {
      items: 3,
    },
  };

  return (
    <OwlCarousel
      className="owl-theme"
      margin={10}
      touchDrag={true}
      rewind={true}
      autoplay={true}
      autoplayHoverPause={true}
      smartSpeed={1000}
      lazyContent={true}
      responsive={caroulselResponvie}
    >
      {nowPromotion.map((item: IPromotion) => {
        const todayDate = moment(new Date());
        const endDate = moment(item.endDate);
        const timeLeftLabel = endDate.from(todayDate);
        const endDateLabel = moment(item.endDate).format('LLL');

        return (
          <div
            className="item bg-gold-100 text-dark-100 py-4 px-8 mt-4 rounded-xl border-2 border-dashed border-dark-100"
            key={item._id}
          >
            <p className="lg:text-xl md:text-lg font-semibold uppercase my-2">{item.name}</p>
            <p className="lg:text-lg md:text-xs text-right">
              เหลือเวลา <span className="font-semibold">{timeLeftLabel}</span>
            </p>
            <p className="lg:text-sm text-right lg:block sm:hidden">( ใช้ได้ถึง {endDateLabel} )</p>
          </div>
        );
      })}
    </OwlCarousel>
  );
};

export default PromotionCarousel;
