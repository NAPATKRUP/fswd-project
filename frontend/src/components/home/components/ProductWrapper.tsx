import React, { FunctionComponent } from "react";
import { IProduct } from "../../commons/type/IProduct";
import ProductBox from "../../commons/ProductBox";
import product from '../../commons/__mock__/product';

const ProductWrapper: FunctionComponent = () => {
    return (
        <div className="p-20">
            <div className="text-2xl">Latest Product</div>
            <div className="flex">
                { product?.map((item: IProduct) => ( <ProductBox item={item} /> )) }
            </div>
            <p className="text-right w-full">See more</p>
        </div>
    );
}

export default ProductWrapper;
