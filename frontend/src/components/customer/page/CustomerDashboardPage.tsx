import React, { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
// import { useSession } from '../../../context/SessionContext';

const CustomerDashboardPage: FC = () => {
  let { url } = useRouteMatch();
  // const { loading, user } = useSession();

  return (
    <div>
      <h1 className="font-medium text-3xl">Customer Dashboard</h1>
      <div className="flex my-3 gap-5">
        <Link to={`${url}`}>
          <button className="py-2 px-4 bg-blue-200 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75">
            Info
          </button>
        </Link>
        <Link to={`${url}/orders`}>
          <button className="py-2 px-4 bg-blue-200 text-white font-semibold rounded-lg shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75">
            Orders
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
