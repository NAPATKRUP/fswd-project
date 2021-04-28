import React, { FC } from 'react';
import { AVAILABLE_PROMOTION_QUERY } from '../graphql/availablePromotionQuery';
import { useQuery } from '@apollo/client';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = React.lazy(() => import('../../commons/loading/Loading'));
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
      <div className="text-4xl">PromotionPage</div>
      <PromotionDetail promotions={availablePromotion} />
    </ContentWithSidebarLayout>
  );
};

export default PromotionPage;
