import React, { FunctionComponent } from "react";
import { IProduct } from "./type/IProduct";

interface ProductBoxProps {
    item: IProduct,
}

const ProductBox: FunctionComponent<ProductBoxProps> = ({ item }: ProductBoxProps) => {
    return (
        <div className="h-96 w-1/3 p-2">
            <div className="bg-blue-400 w-full h-full">{item.name}</div>
        </div>
    );
}

export default ProductBox;
