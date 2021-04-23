import React, { FunctionComponent } from "react";
import product from "../../commons/__mock__/product";
// import { useQuery } from '@apollo/client'
// import Loading from '../../commons/loading/Loading'
// import { PRODUCTPAGE_QUERY } from '../graphql/productpageQuery'

const ContentWithSidebarLayout = React.lazy(
  () => import("../../commons/layouts/ContentWithSidebarLayout")
);

const ProductDetailPage: FunctionComponent = () => {
  // const { loading, error, data }: any = useQuery(Detail_QUERY, { fetchPolicy: 'network-only' })
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
      <div className="flex flex-col justify-center p-20">
        <div className="inline-flex">
          <a href="../products" className="hover:underline">
            Products
          </a>
          <p className="mx-1">/</p>
          <a href="#" className="hover:underline">
            {product[0].brand}
          </a>
          <p className="mx-1">/</p>
          <a href="#" className="hover:underline">
            {product[0].name}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <img
              src={product[0].image}
              className="w-full object-cover bg-center"
              alt={product[0].name}
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-4xl">{product[0].name}</div>
            <div className="text-2xl">{product[0].brand}</div>
            <div className="text-1md">{product[0].description}</div>
            <div className="text-right">{product[0].price} บาท</div>
            <div className="flex flex-row">
              <a
                href="#"
                className="border-2 border-black hover:bg-gray-300 px-3 py-2 mt-2 rounded-full font-bold mx-2"
              >
                *
              </a>
              <a
                href="#"
                className="border-2 border-black hover:bg-gray-300 px-3 py-2 mt-2 rounded-full font-bold mx-2"
              >
                +
              </a>
            </div>
          </div>
        </div>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default ProductDetailPage;
