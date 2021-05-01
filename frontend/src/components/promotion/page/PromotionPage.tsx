import { FC, lazy } from 'react';
import { useHistory } from 'react-router';
import { AVAILABLE_PROMOTION_QUERY } from '../../../graphql/availablePromotionQuery';
import { useQuery } from '@apollo/client';

import { TagIcon } from '@heroicons/react/outline';

const ContentWithSidebarLayout = lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = lazy(() => import('../../commons/loading/Loading'));
const Navigator = lazy(() => import('../../commons/Navigator'));
const PromotionCard = lazy(() => import('../components/PromotionCard'));

const PromotionPage: FC = () => {
  const history = useHistory();

  const { loading, error, data }: any = useQuery(AVAILABLE_PROMOTION_QUERY);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    history.replace({ pathname: 'error' });
    return <></>;
  }

  const { availablePromotion } = data;

  return (
    <ContentWithSidebarLayout>
      <Navigator listOfNode={['หน้าหลัก', '>>', 'โปรโมชั่น']} />
      <div className="flex flex-col lg:px-20 md:px-10 py-10">
        <p className="lg:text-2xl text-xl text-left mt-2 mb-4 block">
          <TagIcon className="h-6 w-6 inline-flex" /> โปรโมชั่น
        </p>
        {availablePromotion.length !== 0 && <PromotionCard promotions={availablePromotion} />}
        {availablePromotion.length === 0 && (
          <p className="mt-2">
            ไม่มีโปรโมชั่นที่สามารถใช้ได้ตอนนี้ โปรดติดตามใหม่อีกครั้งภายหลัง . . .
          </p>
        )}
      </div>
    </ContentWithSidebarLayout>
  );
};

export default PromotionPage;
