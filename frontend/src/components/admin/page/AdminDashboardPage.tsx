import { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const AdminDashboardPage: FC = () => {
  let { url } = useRouteMatch();

  return (
    <div className="bg-dark-100 text-white p-4 rounded-xl">
      <h1 className="lg:text-3xl text-2xl font-medium">หน้าจัดการและดูแลระบบ</h1>
      <div className="flex my-3 gap-5">
        <Link to={`${url}`}>
          <button className="lg:text-base text-sm py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75">
            แดชบอร์ด
          </button>
        </Link>
        <Link to={`${url}/product`}>
          <button className="lg:text-base text-sm py-2 px-4 bg-gold-100 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75">
            จัดการสินค้า
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
