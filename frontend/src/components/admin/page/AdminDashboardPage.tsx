import React, { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const AdminDashboardPage: FC = () => {
  let { url } = useRouteMatch();

  return (
    <div>
      <h1 className="font-medium text-3xl">หน้าจัดการและดูแลระบบ</h1>
      <div className="flex my-3 gap-5">
        <Link to={`${url}`}>
          <button className="py-2 px-4 bg-blue-200 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75">
            แดชบอร์ด
          </button>
        </Link>
        <Link to={`${url}/product`}>
          <button className="py-2 px-4 bg-blue-200 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75">
            จัดการสินค้า
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
