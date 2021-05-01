import { FC, lazy, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { FILTER_PRODUCT_QUERY } from '../../../graphql/filterProductQuery';
import ReactPagination from '../components/ReactPagination';

const ContentWithSidebarLayout = lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = lazy(() => import('../../commons/loading/Loading'));
const Navigator = lazy(() => import('../../commons/Navigator'));
const FilterProductBar = lazy(() => import('../components/FilterProductBar'));
const ProductWrapper = lazy(() => import('../components/ProductWrapper'));

const ProductPage: FC = () => {
  const history = useHistory();

  const [searchType, setSearchType] = useState<any>(undefined);
  const [nameInput, setNameInput] = useState<any>(undefined);
  const [minPrice, setMinPrice] = useState<any>(undefined);
  const [maxPrice, setMaxPrice] = useState<any>(undefined);

  const [allProduct, setAllProduct] = useState<any>([]);
  const [showProduct, setShowProduct] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 1;

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
    if (data?.filterProduct) {
      setAllProduct(data?.filterProduct);
    }
  }, [data]);

  // Update show product in each page when change page or new query product
  useEffect(() => {
    const indexOfLastProduct = currentPage * productPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productPerPage;
    const currentProduct = allProduct.slice(indexOfFirstProduct, indexOfLastProduct);
    setShowProduct(currentProduct);
  }, [currentPage, allProduct]);

  const handleSearchType = useCallback((e) => {
    setSearchType(e.target.value);
  }, []);

  const handleName = useCallback((e) => {
    setNameInput(e.target.value);
  }, []);

  const handleMaxPrice = useCallback((e) => {
    setMaxPrice(parseInt(e.target.value));
  }, []);

  const handleMinPrice = useCallback((e) => {
    setMinPrice(parseInt(e.target.value));
  }, []);

  const paginate = useCallback((pageNumber: any) => setCurrentPage(pageNumber), []);

  if (
    loading &&
    nameInput === undefined &&
    minPrice === undefined &&
    maxPrice === undefined &&
    searchType === undefined
  ) {
    return <Loading />;
  }

  if (error) {
    history.push({ pathname: '/error' });
    return <></>;
  }

  return (
    <ContentWithSidebarLayout>
      <div className="flex flex-col justify-center items-center">
        <div className="px-20 pt-10 text-3xl">Products</div>
        <FilterProductBar
          handleName={handleName}
          handleSearchType={handleSearchType}
          handleMaxPrice={handleMaxPrice}
          handleMinPrice={handleMinPrice}
          nameInput={nameInput}
          searchType={searchType}
          maxPrice={maxPrice}
          minPrice={minPrice}
        />
        <hr className="h-1 w-4/5 color-gold mt-4"></hr>
        <ProductWrapper product={showProduct} />

        {/* Reference  : https://github.com/isaurssaurav/react-pagination-js */}
        <ReactPagination
          currentPage={currentPage}
          totalSize={allProduct?.length}
          changeCurrentPage={paginate}
          sizePerPage={productPerPage}
        />
        <hr className="h-1 w-4/5 color-gold mt-4"></hr>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default ProductPage;
