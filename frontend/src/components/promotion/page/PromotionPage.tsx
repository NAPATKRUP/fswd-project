import React, { FC } from "react";
import ContentWithSidebarLayout from "../../commons/layouts/ContentWithSidebarLayout";
import { PromotionQuery } from "../graphql/queryManyProduct";
import { useQuery } from "@apollo/client";
import Loading from "../../commons/loading/Loading";
import PromotionDetail from "../components/PromotionDetail";

const PromotionPage: FC = () => {
  const { loading, error, data }: any = useQuery(PromotionQuery);

  if (loading) {
    return <Loading />;
  }

  const { promotionByMany } = data;

  return (
    <ContentWithSidebarLayout>
      <h1>PromotionPage</h1>
      <PromotionDetail promotions={promotionByMany} />
    </ContentWithSidebarLayout>
  );
};

export default PromotionPage;
