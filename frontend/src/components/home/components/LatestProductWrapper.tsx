import { FC, lazy } from 'react';
import { NavLink } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { LATESTPRODUCT_PRODUCT_QUERY } from '../../../graphql/latestProductQuery';

import { CollectionIcon } from '@heroicons/react/outline';

import { IProduct } from '../../commons/type/IProduct';

const Loading = lazy(() => import('../../commons/layouts/ContentWithSidebarLayout'));
const ProductCard = lazy(() => import('../../commons/ProductCard'));

const LatestProductWrapper: FC = () => {
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
      <p className="lg:text-2xl text-xl">
        <CollectionIcon className="h-6 w-6 inline-flex" /> สินค้ามาใหม่
      </p>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-col-1">
        {latestProduct?.map((item: IProduct) => (
          <ProductCard product={item} key={item._id} />
        ))}
      </div>
      <NavLink to="/products" className="text-right hover:text-gold-100 w-full mt-5 block">
        ดูเพิ่มเติม
      </NavLink>
    </div>
  );
};

export default LatestProductWrapper;
