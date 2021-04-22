import React, { FunctionComponent } from "react";
import { IProduct } from "../../commons/type/IProduct";
import ProductBox from "../../commons/ProductBox";

interface ProductProps {
  product: IProduct[];
}

const ProductWrapper: FunctionComponent<ProductProps> = ({ product }: ProductProps) => {
  return (
    <div className="px-20 py-10">
      <div className="text-1xl">ค้นพบน้ำหอมทั้งหมด {product.length} รายการ</div>
      <div className="flex">
        {product?.map((item: IProduct) => (
          <ProductBox item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductWrapper;
