import React, { FC } from 'react';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const BannerWrapper = React.lazy(() => import('../components/BannerWrapper'));
const NowPromotionWrapper = React.lazy(() => import('../components/NowPromotionWrapper'));
const LatestProductWrapper = React.lazy(() => import('../components/LatestProductWrapper'));

const HomePage: FC = () => {
  return (
    <ContentWithSidebarLayout>
      <BannerWrapper />
      <NowPromotionWrapper />
      <LatestProductWrapper />
    </ContentWithSidebarLayout>
  );
};

export default HomePage;
