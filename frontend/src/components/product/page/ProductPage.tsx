import { FC, lazy, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FILTER_PRODUCT_QUERY } from '../../../graphql/filterProductQuery';

const ContentWithSidebarLayout = lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = lazy(() => import('../../commons/loading/Loading'));
const Navigator = lazy(() => import('../../commons/Navigator'));
const FilterProductBar = lazy(() => import('../components/FilterProductBar'));
const ProductWrapper = lazy(() => import('../components/ProductWrapper'));

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
    console.log(error);
  }
  //const { filterProduct } = data;

  const handleCallBack = (searchType: string, name: string, minPrice: number, maxPrice: number) => {
    setSearchType(searchType);
    setName(name);
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
  };

  return (
    <ContentWithSidebarLayout>
      <Navigator listOfNode={['หน้าหลัก', '>>', 'สินค้า']} />
      <div className="flex flex-col items-center lg:px-20 md:px-10 py-10">
        <FilterProductBar callBackFunction={handleCallBack} />
        <div className="w-full border-b-4 border-gold-200 rounded-full my-8"></div>
        <ProductWrapper product={data?.filterProduct} />
        <div className="w-full border-b-4 border-gold-200 rounded-full my-8"></div>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default ProductPage;
