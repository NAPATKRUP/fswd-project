import React, { FC } from "react";
import AdminProductBox from "../components/AdminProductBox";
import product from "../../../commons/__mock__/product";

const ViewAllProductPage: FC = () => {
  const renderProductItems: () => JSX.Element[] = () => {
    return product.map((item) => {
      return <AdminProductBox item={item} key={item._id} />;
    });
  };

  return (
    <div className="w-100">
      <h2 className="text-2xl">All Products</h2>
      <div className="flex flex-wrap">{renderProductItems()}</div>
    </div>
  );
};

export default ViewAllProductPage;
