import { FC, lazy } from 'react';

const ContentWithSidebarLayout = lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const BannerWrapper = lazy(() => import('../components/BannerWrapper'));
const NowPromotionWrapper = lazy(() => import('../components/NowPromotionWrapper'));
const LatestProductWrapper = lazy(() => import('../components/LatestProductWrapper'));

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
