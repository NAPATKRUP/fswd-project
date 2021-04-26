import React from "react";
import { useRouteMatch, useLocation } from "react-router-dom";
import { PRODUCT_BY_SLUG_QUERY } from "../graphql/productBySlug";
import { useQuery } from "@apollo/client";
import Loading from "../../commons/loading/Loading";

const ContentWithSidebarLayout = React.lazy(
  () => import("../../commons/layouts/ContentWithSidebarLayout")
);

const AboutProductPage = () => {
  const match = useRouteMatch<any>("/product/:slug");
  const slug = match?.params.slug;
  const location = useLocation();
  console.log(location);
  console.log(typeof slug);

  const { loading, error, data } = useQuery(PRODUCT_BY_SLUG_QUERY, {
    variables: {
      slug: slug,
    },
  });

  if (loading) {
    return <Loading />;
  }

  const { productBySlug } = data;
  console.log(productBySlug);

  return (
    <ContentWithSidebarLayout>
      <div className="grid grid-cols-2">
        <div>
          <img src={productBySlug.image} />
        </div>

        <div>
          <h1>{productBySlug.name}</h1>
          <h1>แบรนด์ : {productBySlug.brand}</h1>
          <p> ราคา : {productBySlug.price}</p>
          <p>จำนวน : {productBySlug.stock}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            เพิ่มไปยังตะกร้าสินค้า
          </button>
        </div>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default AboutProductPage;
