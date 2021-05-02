import { FC, lazy, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { PRODUCT_ALL_QUERY } from '../../../../graphql/productAllQuery';

import { CollectionIcon } from '@heroicons/react/outline';

import { IProduct } from '../../../commons/type/IProduct';

const Loading = lazy(() => import('../../../commons/loading/Loading'));
const Navigator = lazy(() => import('../../../commons/Navigator'));
const FilterProductBar = lazy(() => import('../../../product/components/FilterProductBar'));
const AdminProductBox = lazy(() => import('../components/AdminProductBox'));
const ReactPagination = lazy(() => import('../../../product/components/ReactPagination'));

const ViewAllProductPage: FC = () => {
  const history = useHistory();

  const [searchType, setSearchType] = useState<any>(undefined);
  const [nameInput, setNameInput] = useState<any>(undefined);
  const [minPrice, setMinPrice] = useState<any>(undefined);
  const [maxPrice, setMaxPrice] = useState<any>(undefined);

  const [allProduct, setAllProduct] = useState<IProduct[]>([]);
  const [showProduct, setShowProduct] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 8;

  const [queryProduct, { loading, error, data }] = useLazyQuery<any>(PRODUCT_ALL_QUERY, {
    variables: {
      typeFilter: 'PRICE_ASC',
      minPrice: 1,
      maxPrice: 100000,
      name: '',
    },
  });

  let inDebounce: any;
  const setTimeOutQuery = (func: any, delay: any) => {
    inDebounce = setTimeout(func, delay);
  };
  const clearTimeOutQuery = () => {
    clearTimeout(inDebounce);
  };

  useEffect(() => {
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

  useEffect(() => {
    if (data?.filterProduct) setAllProduct(data?.filterProduct);
  }, [data]);

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
    <div className="mt-8">
      <Navigator listOfNode={['จัดการ', '>>', 'จัดการสินค้า']} />
      <div className="lg:px-20 md:px-10 py-10">
        <h2 className="text-2xl mb-4">
          <CollectionIcon className="h-6 w-6 inline-flex" /> จัดการสินค้า
        </h2>
        <div className="flex flex-col items-center mt-2">
          <FilterProductBar
            handleName={handleName}
            handleSearchType={handleSearchType}
            handleMaxPrice={handleMaxPrice}
            handleMinPrice={handleMinPrice}
          />
          <div className="w-full border-2 border-dark-100 bg-dark-100 rounded-full mt-8 mb-8"></div>
          <div>
            <p>
              ค้นพบน้ำหอมทั้งหมด <span className="font-semibold">{showProduct?.length}</span> รายการ
            </p>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mt-4">
              {showProduct.map((item) => (
                <AdminProductBox item={item} key={item._id} />
              ))}
            </div>
          </div>
          <ReactPagination
            currentPage={currentPage}
            totalSize={allProduct?.length}
            changeCurrentPage={paginate}
            sizePerPage={productPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewAllProductPage;
