import React, { FC } from 'react';
import { AVAILABLE_PROMOTION_QUERY } from '../graphql/availablePromotionQuery';
import { useQuery } from '@apollo/client';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = React.lazy(() => import('../../commons/loading/Loading'));
const Navigator = React.lazy(() => import('../../commons/Navigator'));
const PromotionDetail = React.lazy(() => import('../components/PromotionDetail'));

const PromotionPage: FC = () => {
  const { loading, error, data }: any = useQuery(AVAILABLE_PROMOTION_QUERY);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    alert('error');
  }

  const { availablePromotion } = data;

  return (
    <ContentWithSidebarLayout>
      <Navigator listOfNode={['หน้าหลัก', '>>', 'โปรโมชั่น']} />
      <div className="flex flex-col items-center lg:px-20 md:px-10 py-10">
        <p className="text-4xl text-center mt-8 my-4 block">โปรโมชั่น</p>
        <div className="w-full border-b-4 border-dark-100 rounded-full my-8"></div>
        {availablePromotion.length !== 0 && <PromotionDetail promotions={availablePromotion} />}
        {availablePromotion.length === 0 && (
          <p>ไม่มีโปรโมชั่นที่สามารถใช้ได้ตอนนี้ โปรดติดตามใหม่อีกครั้งภายหลัง . . .</p>
        )}
        <div className="w-full border-b-4 border-dark-200 rounded-full my-8"></div>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default PromotionPage;
