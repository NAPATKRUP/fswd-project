import React, { FunctionComponent } from "react";
import product from "../../commons/__mock__/product";
// import { useQuery } from '@apollo/client'
// import Loading from '../../commons/loading/Loading'
// import { PRODUCTPAGE_QUERY } from '../graphql/productpageQuery'

const Navbar = React.lazy(() => import("../../commons/Navbar"));
const PageContent = React.lazy(() => import("../../commons/PageContent"));

const FilterProductBar = React.lazy(() => import("../components/FilterProductBar"));
const ProductWrapper = React.lazy(() => import("../components/ProductWrapper"));

const ProductPage: FunctionComponent = () => {
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
    <div className="flex h-screen">
      <Navbar />
      <PageContent>
        <div className="flex flex-col justify-center items-center">
          <div className="px-20 pt-10 text-3xl">Products</div>
          <FilterProductBar />
          <hr className="h-1 w-4/5 color-gold mt-4"></hr>
          <ProductWrapper product={product} />
          <hr className="h-1 w-4/5 color-gold mt-4"></hr>
        </div>
      </PageContent>
    </div>
  );
};

export default ProductPage;
