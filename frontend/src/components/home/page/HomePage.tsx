import React, { FunctionComponent } from "react";
import ContentWithSidebarLayout from "../../commons/layouts/ContentWithSidebarLayout";
import product from "../../commons/__mock__/product";
// import { useQuery } from '@apollo/client'
// import Loading from '../../commons/loading/Loading'
// import { HOMEPAGE_QUERY } from '../graphql/homepageQuery'

const BannerWrapper = React.lazy(() => import("../components/BannerWrapper"));
const PromotionWrapper = React.lazy(() => import("../components/PromotionWrapper"));
const ProductWrapper = React.lazy(() => import("../components/ProductWrapper"));

const HomePage: FunctionComponent = () => {
  // const { loading, error, data }: any = useQuery(HOMEPAGE_QUERY, { fetchPolicy: 'network-only' })
  // if (loading) {
  //     return (
  //     <Loading />
  //     )
  // }
  // if (error) {
  //     return 'Error !!'
  // }
  // const { myData } = data

  return (
    <ContentWithSidebarLayout>
      <BannerWrapper />
      <PromotionWrapper />
      <ProductWrapper product={product} />
    </ContentWithSidebarLayout>
  );
};

export default HomePage;
