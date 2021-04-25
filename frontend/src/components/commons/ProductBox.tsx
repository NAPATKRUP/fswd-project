import React, { FunctionComponent } from "react";
import { IProduct } from "./type/IProduct";

interface ProductBoxProps {
  product: IProduct;
}

const ProductBox: FunctionComponent<ProductBoxProps> = ({ product }: ProductBoxProps) => {
  return (
    <div className="p-4 hover:bg-gray-100">
      <div>
        <img src={product?.image} className="w-full object-cover bg-center" alt={product?.slug} />
        <div className="p-4 h-36">
          <h5 className="text-md font-bold mb-2 uppercase">{product?.brand}</h5>
          <p>{product?.name}</p>
          <p className="mt-4 text-right -bottom-0">{product?.price} บาท</p>
        </div>
        {product?.promotion && <div className="text-center text-md">{product.promotion.name}</div>}
        {product?.stock !== 0 && (
          <div>
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
        )}
        {product?.stock === 0 && <div className="text-center text-md">out of stock</div>}
      </div>
    </div>
  );
};

export default ProductBox;
