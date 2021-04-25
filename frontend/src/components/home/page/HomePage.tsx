import React, { FC } from "react";
import ContentWithSidebarLayout from "../../commons/layouts/ContentWithSidebarLayout";
import { useQuery } from "@apollo/client";
import Loading from "../../commons/loading/Loading";
import { HOMEPAGE_QUERY } from "../graphql/homepageQuery";

const BannerWrapper = React.lazy(() => import("../components/BannerWrapper"));
const PromotionWrapper = React.lazy(() => import("../components/PromotionWrapper"));
const ProductWrapper = React.lazy(() => import("../components/ProductWrapper"));

const HomePage: any = () => {
  const { loading, error, data } = useQuery(HOMEPAGE_QUERY, { variables: { productShow: 4 } });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return "Error !!";
  }
  const { latestProductResolver } = data;

  return (
    <ContentWithSidebarLayout>
      <BannerWrapper />
      <PromotionWrapper />
      <ProductWrapper products={latestProductResolver} />
    </ContentWithSidebarLayout>
  );
};

export default HomePage;
