import React, { FC } from 'react';
import ContentWithSidebarLayout from '../../commons/layouts/ContentWithSidebarLayout';
import { AVAILABLE_PROMOTION_QUERY } from '../graphql/availablePromotionQuery';
import { useQuery } from '@apollo/client';
import Loading from '../../commons/loading/Loading';
import PromotionDetail from '../components/PromotionDetail';

const PromotionPage: any = () => {
  const { loading, error, data }: any = useQuery(AVAILABLE_PROMOTION_QUERY);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return 'Error !!';
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
