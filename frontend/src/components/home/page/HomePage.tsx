import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { HOMEPAGE_QUERY } from '../graphql/homepageQuery';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = React.lazy(() => import('../../commons/layouts/ContentWithSidebarLayout'));
const BannerWrapper = React.lazy(() => import('../components/BannerWrapper'));
const PromotionWrapper = React.lazy(() => import('../components/PromotionWrapper'));
const ProductWrapper = React.lazy(() => import('../components/ProductWrapper'));

const HomePage: FC = () => {
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, { variables: { productShow: 4 } });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    alert('error');
  }
  const { latestProduct } = data;

  return (
    <ContentWithSidebarLayout>
      <BannerWrapper />
      <PromotionWrapper />
      <ProductWrapper products={latestProduct} />
    </ContentWithSidebarLayout>
  );
};

export default HomePage;
