import { FC, lazy, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CollectionIcon } from '@heroicons/react/outline';
import { PROMOTION_ALL_QUERY } from '../../../../graphql/promotionAllQuery';
import { useQuery } from '@apollo/client';
import { PromotionType } from '../../../commons/type/IPromotion';

const Loading = lazy(() => import('../../../commons/loading/Loading'));
const AdminPromotionBox = lazy(() => import('../components/AdminPromotionBox'));
const Navigator = lazy(() => import('../../../commons/Navigator'));

const ViewAllProductPage: FC = () => {
  const [promotions, setPromotions] = useState<PromotionType[]>([]);
  const history = useHistory();

  const { loading, error, data }: any = useQuery<{ promotionByMany: PromotionType[] }>(
    PROMOTION_ALL_QUERY
  );

  useEffect(() => {
    if (data?.promotionByMany) setPromotions(data?.promotionByMany);
  }, [data]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    // history.push({ pathname: '/error' });
    console.log(error);
    return <></>;
  }

  return (
    <div className="mt-8">
      <Navigator listOfNode={['จัดการ', '>>', 'จัดการโปรโมชั่น']} />
      <div className="lg:px-20 md:px-10 py-10">
        <h2 className="text-2xl mb-4">
          <CollectionIcon className="h-6 w-6 inline-flex" /> จัดการโปรโมชั่น
        </h2>
        <div className="flex flex-col items-center mt-2">
          {/* <FilterProductBar
            handleName={handleName}
            handleSearchType={handleSearchType}
            handleMaxPrice={handleMaxPrice}
            handleMinPrice={handleMinPrice}
          /> */}
          <div className="w-full border-2 border-dark-100 bg-dark-100 rounded-full mt-8 mb-8"></div>
          <div>
            <p>
              ค้นพบโปรโมชั่นทั้งหมด <span className="font-semibold">{promotions.length}</span>{' '}
              รายการ
            </p>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 mt-4">
              {promotions.map((item) => (
                <AdminPromotionBox item={item} key={item._id} />
              ))}
            </div>
          </div>
          {/* <ReactPagination
            currentPage={currentPage}
            totalSize={allProduct?.length}
            changeCurrentPage={paginate}
            sizePerPage={productPerPage}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ViewAllProductPage;
