import React, { FunctionComponent } from "react";
import { IProduct } from "../../commons/type/IProduct";
import ProductBox from "../../commons/ProductBox";

interface ProductProps {
    product: IProduct[],
}

const ProductWrapper: FunctionComponent<ProductProps> = ({ product }: ProductProps) => {
    return (
        <div className="p-20">
            <div className="text-2xl">Latest Product</div>
            <div className="flex">
                { product?.map((item: IProduct) => ( <ProductBox item={item} key={item._id} /> )) }
            </div>
            <p className="text-right w-full mt-4">See more</p>
        </div>
    );
}

export default ProductWrapper;
