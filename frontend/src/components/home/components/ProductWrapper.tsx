import React, { FunctionComponent } from "react";
import { IProduct } from "../../commons/type/IProduct";
import ProductBox from "../../commons/ProductBox";

interface ProductProps {
  products: IProduct[];
}

const ProductWrapper: FunctionComponent<ProductProps> = ({ products }: ProductProps) => {
  return (
    <div className="p-20">
      <div className="text-2xl">Latest Product</div>
      <div className="grid grid-cols-4">
        {products?.map((item: IProduct) => (
          <ProductBox product={item} key={item._id} />
        ))}
      </div>
      <p className="text-right w-full mt-4">See more</p>
    </div>
  );
};

export default ProductWrapper;
