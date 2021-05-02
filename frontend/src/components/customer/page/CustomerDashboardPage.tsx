import { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
// import { useSession } from '../../../context/SessionContext';

const CustomerDashboardPage: FC = () => {
  let { url } = useRouteMatch();
  // const { loading, user } = useSession();

  return (
    <div className="bg-dark-100 text-white p-4 rounded-xl">
      <h1 className="font-medium text-3xl">บัญชีของฉัน</h1>
      <div className="flex my-3 gap-5">
        <Link to={`${url}`}>
          <button className="lg:text-base text-sm py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75">
            ข้อมูลบัญชี
          </button>
        </Link>
        <Link to={`${url}/orders`}>
          <button className="lg:text-base text-sm py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75">
            คำสั่งซื้อ
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
