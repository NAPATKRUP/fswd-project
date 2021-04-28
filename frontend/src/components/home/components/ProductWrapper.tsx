import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IProduct } from '../../commons/type/IProduct';

interface ProductProps {
  products: IProduct[];
}

const ProductBox = React.lazy(() => import('../../commons/ProductBox'));

const ProductWrapper: FC<ProductProps> = ({ products }: ProductProps) => {
  return (
    <div className="p-20">
      <p className="text-2xl">สินค้ามาใหม่</p>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-col-1">
        {products?.map((item: IProduct) => (
          <ProductBox product={item} key={item._id} />
        ))}
      </div>
      <NavLink to="/products" className="text-right hover:text-gold-100 w-full mt-5 block">
        ดูเพิ่มเติม
      </NavLink>
    </div>
  );
};

export default ProductWrapper;
