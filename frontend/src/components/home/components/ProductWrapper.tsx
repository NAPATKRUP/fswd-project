import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LATESTPRODUCT_PRODUCT_QUERY } from '../graphql/latestProductQuery';

import { IProduct } from '../../commons/type/IProduct';

const Loading = React.lazy(() => import('../../commons/layouts/ContentWithSidebarLayout'));
const ProductBox = React.lazy(() => import('../../commons/ProductBox'));

const ProductWrapper: FC = () => {
  const { loading, error, data } = useQuery(LATESTPRODUCT_PRODUCT_QUERY, {
    variables: { productShow: 4 },
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    alert('error');
  }
  const { latestProduct } = data;

  return (
    <div className="px-20 py-8">
      <p className="text-2xl mb-8">สินค้ามาใหม่</p>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-col-1">
        {latestProduct?.map((item: IProduct) => (
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
