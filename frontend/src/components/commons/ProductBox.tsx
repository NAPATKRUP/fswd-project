import React, { FunctionComponent } from "react";
import { IProduct } from "./type/IProduct";

interface ProductBoxProps {
  item: IProduct;
}

const ProductBox: FunctionComponent<ProductBoxProps> = ({ item }: ProductBoxProps) => {
  return (
    <div className="p-4 hover:bg-gray-100">
      <div>
        <img src={item?.image} className="w-full object-cover bg-center" alt={item?.name} />
        <div className="p-4 h-36">
          <h5 className="text-md font-bold mb-2 uppercase">{item?.brand}</h5>
          <p>{item?.name}</p>
          <p className="mt-4 text-right -bottom-0">{item?.price} บาท</p>
        </div>
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
  );
};

export default ProductBox;
