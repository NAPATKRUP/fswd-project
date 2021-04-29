import React, { FC } from 'react';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const BannerWrapper = React.lazy(() => import('../components/BannerWrapper'));
const PromotionWrapper = React.lazy(() => import('../components/PromotionWrapper'));
const ProductWrapper = React.lazy(() => import('../components/ProductWrapper'));

const HomePage: FC = () => {
  return (
    <ContentWithSidebarLayout>
      <BannerWrapper />
      <PromotionWrapper />
      <ProductWrapper />
    </ContentWithSidebarLayout>
  );
};

export default HomePage;
