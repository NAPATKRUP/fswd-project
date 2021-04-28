import React, { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FILTER_PRODUCT_QUERY } from '../graphql/filterProductQuery';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = React.lazy(() => import('../../commons/loading/Loading'));
const FilterProductBar = React.lazy(() => import('../components/FilterProductBar'));
const ProductWrapper = React.lazy(() => import('../components/ProductWrapper'));

const ProductPage: FC = () => {
  const [searchType, setSearchType] = useState<string>('PRICE_ASC');
  const [name, setName] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);

  const { loading, error, data } = useQuery(FILTER_PRODUCT_QUERY, {
    variables: {
      typeFilter: searchType,
      name: name,
      minPrice: minPrice,
      maxPrice: maxPrice,
    },
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    alert('error');
  }
  const { filterProduct } = data;

  const handleCallBack = (searchType: string, name: string, minPrice: number, maxPrice: number) => {
    setSearchType(searchType);
    setName(name);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  return (
    <ContentWithSidebarLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="px-20 pt-10 text-3xl">สินค้า</div>
        <FilterProductBar callBackFunction={handleCallBack} />
        <hr className="h-1 w-4/5 color-gold mt-4"></hr>
        <ProductWrapper product={filterProduct} />
        <hr className="h-1 w-4/5 color-gold mt-4"></hr>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default ProductPage;
