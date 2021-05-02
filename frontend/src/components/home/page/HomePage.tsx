import { FC, lazy } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';
import { NOW_PROMOTION_QUERY } from '../../../graphql/nowPromotionQuery';
import { LATESTPRODUCT_PRODUCT_QUERY } from '../../../graphql/latestProductQuery';

const ContentWithSidebarLayout = lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = lazy(() => import('../../commons/loading/Loading'));
const BannerWrapper = lazy(() => import('../components/BannerWrapper'));
const NowPromotionWrapper = lazy(() => import('../components/NowPromotionWrapper'));
const LatestProductWrapper = lazy(() => import('../components/LatestProductWrapper'));

const HomePage: FC = () => {
  const history = useHistory();

  const { loading: productLoading, error: productError, data: productData } = useQuery(
    LATESTPRODUCT_PRODUCT_QUERY,
    {
      variables: { productShow: 4 },
    }
  );
  const { loading: promotionLoading, error: promotionError, data: promotionData } = useQuery(
    NOW_PROMOTION_QUERY
  );
  if (promotionLoading || productLoading) {
    return <Loading />;
  }
  if (promotionError || productError) {
    history.push({ pathname: '/error' });
    return <></>;
  }
  const { nowPromotion } = promotionData;
  const { latestProduct } = productData;

  return (
    <ContentWithSidebarLayout>
      <BannerWrapper />
      <NowPromotionWrapper nowPromotion={nowPromotion} />
      <LatestProductWrapper latestProduct={latestProduct} />
    </ContentWithSidebarLayout>
  );
};

export default HomePage;
