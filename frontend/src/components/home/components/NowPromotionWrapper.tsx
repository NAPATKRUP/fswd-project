import { FC, lazy } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router';
import { NOW_PROMOTION_QUERY } from '../../../graphql/nowPromotionQuery';

import { TagIcon } from '@heroicons/react/outline';

const Loading = lazy(() => import('../../commons/loading/Loading'));
const PromotionCarousel = lazy(() => import('./PromotionCarousel'));

const NowPromotionWrapper: FC = () => {
  const history = useHistory();

  const { loading, error, data } = useQuery(NOW_PROMOTION_QUERY);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    history.replace({ pathname: 'error' });
    return <></>;
  }
  const { nowPromotion } = data;

  return (
    <div className="flex flex-col items-center px-20 py-16">
      <div className="lg:text-2xl text-xl">
        <TagIcon className="h-6 w-6 inline-flex" /> โปรโมชั่น
      </div>
      <div className="w-64 border-2 border-gold-100 bg-gold-100 rounded-full mt-4"></div>
      <div className="w-48 border-2 border-gold-100 bg-gold-100 rounded-full my-2"></div>
      <PromotionCarousel nowPromotion={nowPromotion} />
      <NavLink to="/promotions" className="text-right hover:text-gold-100 w-full mt-5 block">
        ดูเพิ่มเติม
      </NavLink>
    </div>
  );
};

export default NowPromotionWrapper;
