import React, { FC } from "react";
import product from "../../commons/__mock__/product";

const ContentWithSidebarLayout = React.lazy(
  () => import("../../commons/layouts/ContentWithSidebarLayout")
);

const FilterProductBar = React.lazy(() => import("../components/FilterProductBar"));
const ProductWrapper = React.lazy(() => import("../components/ProductWrapper"));

const ProductPage: FC = () => {
  // const { loading, error, data }: any = useQuery(PRODUCTPAGE_QUERY, { fetchPolicy: 'network-only' })
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
      <div className="flex flex-col justify-center items-center">
        <div className="px-20 pt-10 text-3xl">Products</div>
        <FilterProductBar />
        <hr className="h-1 w-4/5 color-gold mt-4"></hr>
        <ProductWrapper product={product} />
        <hr className="h-1 w-4/5 color-gold mt-4"></hr>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default ProductPage;
