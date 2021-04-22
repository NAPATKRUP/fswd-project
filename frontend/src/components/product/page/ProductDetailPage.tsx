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
        <div>
          <a href="../products">Products</a>/<a href="#">{product[0].brand}</a>/
          <a href="#">{product[0].name}</a>
        </div>
        <img src={product[0].image} className="w-1/5" />
        <div>{product[0].name}</div>
        <div>{product[0].brand}</div>
        <div>{product[0].description}</div>
      </PageContent>
    </div>
  );
};

export default ProductPage;
