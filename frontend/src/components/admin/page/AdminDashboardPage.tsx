import { FC, lazy } from 'react';
import { useHistory } from 'react-router';
import { Link, useRouteMatch } from 'react-router-dom';
import { DASHBOARD_QUERY } from '../../../graphql/dashboardQuery';
import { useQuery } from '@apollo/client';
import { IProduct } from '../../commons/type/IProduct';

const Loading = lazy(() => import('../../commons/loading/Loading'));
const GraphforDashboard = lazy(() => import('../dashboard/components/GraphForDashboard'));

const AdminDashboardPage: FC = () => {
  let { url } = useRouteMatch();
  const history = useHistory();

  const { loading, error, data }: any = useQuery(DASHBOARD_QUERY);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    history.push({ pathname: '/error' });
    return <></>;
  }

  const { orderSummary, orderStatusSummary, productByMany: noStock } = data;

  return (
    <>
      <div className="bg-dark-100 text-white p-4 rounded-xl">
        <h1 className="lg:text-3xl text-2xl font-medium">หน้าจัดการและดูแลระบบ</h1>
        <div className="flex my-3 gap-5">
          <Link to={`${url}`}>
            <button className="lg:text-base text-sm py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75">
              แดชบอร์ด
            </button>
          </Link>
          <Link to={`${url}/products`}>
            <button className="lg:text-base text-sm py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75">
              จัดการสินค้า
            </button>
          </Link>
          <Link to={`${url}/promotions`}>
            <button className="lg:text-base text-sm py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75">
              จัดการโปรโมชั่น
            </button>
          </Link>
          <Link to={`${url}/orders`}>
            <button className="lg:text-base text-sm py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75">
              จัดการออเดอร์
            </button>
          </Link>
        </div>
      </div>
      <div>
        <div className="h-60 p-4">
          <GraphforDashboard data={orderSummary} />
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 bg-dark-100 p-4 rounded-b-3xl">
          <div className="col-span-1 lg:text-4xl text-3xl flex flex-col justify-center items-center bg-dark-200 text-white-100 lg:w-60 w-40 lg:h-60 h-40 rounded-full">
            <p className="font-bold">{orderStatusSummary.successTotal}</p>
            <p className="lg:text-2xl text-xl mt-4">(จ่ายเงินแล้ว)</p>
          </div>
          <div className="col-span-1 lg:text-4xl text-3xl flex flex-col justify-center items-center bg-gold-100 text-dark-100 lg:w-60 w-40 lg:h-60 h-40 rounded-full">
            <p className="font-bold">{orderStatusSummary.shippingTotal}</p>
            <p className="lg:text-2xl text-xl mt-4">(กำลังขนส่ง)</p>
          </div>
          <div className="col-span-2">
            <p className="lg:text-2xl text-xl text-white-100 my-4 text-right">รายการสินค้าหมด</p>
            <div className="bg-white-100 p-6 py-4 overflow-y-auto h-40">
              {noStock.map((product: IProduct, index: number) => (
                <div
                  key={product._id}
                  role="button"
                  onClick={() => {
                    history.push({ pathname: `${url}/product/` + product._id });
                  }}
                  className="text-dark-100 hover:text-dark-200 my-1"
                >
                  {index + 1}. {product.brand}| {product.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
