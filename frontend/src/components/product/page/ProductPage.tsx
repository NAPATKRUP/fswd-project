import { FC, lazy, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { FILTER_PRODUCT_QUERY } from '../../../graphql/filterProductQuery';

import { CollectionIcon } from '@heroicons/react/outline';

import { IProduct } from '../../commons/type/IProduct';

const ContentWithSidebarLayout = lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = lazy(() => import('../../commons/loading/Loading'));
const Navigator = lazy(() => import('../../commons/Navigator'));
const FilterProductBar = lazy(() => import('../components/FilterProductBar'));
const ProductWrapper = lazy(() => import('../components/ProductWrapper'));
const ReactPagination = lazy(() => import('../components/ReactPagination'));

const ProductPage: FC = () => {
  const history = useHistory();

  const [searchType, setSearchType] = useState<any>(undefined);
  const [nameInput, setNameInput] = useState<any>(undefined);
  const [minPrice, setMinPrice] = useState<any>(undefined);
  const [maxPrice, setMaxPrice] = useState<any>(undefined);

  const [allProduct, setAllProduct] = useState<IProduct[]>([]);
  const [showProduct, setShowProduct] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 8;

  const [queryProduct, { loading, error, data }] = useLazyQuery<any>(FILTER_PRODUCT_QUERY, {
    variables: {
      typeFilter: 'PRICE_ASC',
      minPrice: 1,
      maxPrice: 100000,
      name: '',
    },
  });

  // inDebounce function
  // Set inDebounce for use in queryProduct
  let inDebounce: any;
  // Set time out for make delay between queryProduct
  const setTimeOutQuery = (func: any, delay: any) => {
    inDebounce = setTimeout(func, delay);
  };
  // Clear all time out
  const clearTimeOutQuery = () => {
    clearTimeout(inDebounce);
  };

  // Update filter when have event with search
  useEffect(() => {
    //Check NaN with delete minPrice and maxPrice
    if (isNaN(minPrice)) setMinPrice(0);
    if (isNaN(maxPrice)) setMaxPrice(100000);
    if (!nameInput && !maxPrice && !minPrice && !searchType) {
      setSearchType('PRICE_ASC');
      queryProduct();
    } else {
      clearTimeOutQuery();
      setTimeOutQuery(
        queryProduct({
          variables: {
            typeFilter: searchType,
            name: nameInput,
            minPrice: minPrice,
            maxPrice: maxPrice,
          },
        }),
        300
      );
    }
    setCurrentPage(1);
  }, [searchType, nameInput, minPrice, maxPrice]);

  // Update all product when data change by new query
  useEffect(() => {
    if (data?.filterProduct) setAllProduct(data?.filterProduct);
  }, [data]);

  // Update show product in each page when change page or new query product
  useEffect(() => {
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProduct = allProduct.slice(indexOfFirstProduct, indexOfLastProduct);
    setShowProduct(currentProduct);
  }, [currentPage, allProduct]);

  const handleSearchType = useCallback((e) => setSearchType(e.target.value), []);
  const handleName = useCallback((e) => setNameInput(e.target.value), []);
  const handleMaxPrice = useCallback((e) => setMaxPrice(parseInt(e.target.value)), []);
  const handleMinPrice = useCallback((e) => setMinPrice(parseInt(e.target.value)), []);

  const paginate = useCallback((pageNumber: any) => setCurrentPage(pageNumber), []);

  if (loading && !nameInput && !minPrice && !maxPrice && !searchType) {
    return <Loading />;
  }
  if (error) {
    history.push({ pathname: '/error' });
    return <></>;
  }

  return (
    <ContentWithSidebarLayout>
      <Navigator listOfNode={['หน้าหลัก', '>>', 'สินค้า']} />
      <div className="flex flex-col lg:px-20 md:px-10 py-10">
        <p className="lg:text-2xl text-xl text-left mt-2 mb-4 block">
          <CollectionIcon className="h-6 w-6 inline-flex" /> สินค้า
        </p>
        <div className="flex flex-col items-center mt-2">
          <FilterProductBar
            handleName={handleName}
            handleSearchType={handleSearchType}
            handleMaxPrice={handleMaxPrice}
            handleMinPrice={handleMinPrice}
          />
          <div className="w-full border-2 border-dark-100 bg-dark-100 rounded-full mt-8 mb-8"></div>
          <ProductWrapper product={showProduct} />
          <ReactPagination
            currentPage={currentPage}
            totalSize={allProduct?.length}
            changeCurrentPage={paginate}
            sizePerPage={productPerPage}
          />
          <div className="w-full border-2 border-dark-100 bg-dark-100 rounded-full mt-8 mb-8"></div>
        </div>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default ProductPage;
