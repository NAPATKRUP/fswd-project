import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductBox from "../../../commons/ProductBox";
import { IProduct } from "../../../commons/type/IProduct";
import product from "../../../commons/__mock__/product";

const ViewProductPage: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [productDetail, setProductDetail] = useState<IProduct>();

  useEffect(() => {
    const findProduct = (slug: string) => {
      return product.find((item: IProduct) => item._id === parseInt(slug));
    };

    const slugProduct = findProduct(slug);
    setProductDetail(slugProduct);
  }, [slug]);

  const renderProductDetail = () => {
    if (productDetail) {
      return <ProductBox item={productDetail} />;
    } else {
      return <h1>Sorry, Product that you are looking is not found</h1>;
    }
  };

  return (
    <div>
      <h2 className="text-2xl">View Product: {slug}</h2>
      <div>{renderProductDetail()}</div>
    </div>
  );
};

export default ViewProductPage;
