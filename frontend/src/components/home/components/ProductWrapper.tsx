import React, { FC } from 'react';

import { IProduct } from '../../commons/type/IProduct';

interface ProductProps {
  products: IProduct[];
}

const ProductBox = React.lazy(() => import('../../commons/ProductBox'));

const ProductWrapper: FC<ProductProps> = ({ products }: ProductProps) => {
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
