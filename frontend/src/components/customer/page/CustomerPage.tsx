import React, { FC, useEffect, useMemo } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import { useSession } from '../../../context/SessionContext';
import ContentWithSidebarLayout from '../../commons/layouts/ContentWithSidebarLayout';
import Loading from '../../commons/loading/Loading';
import CustomerDashboardPage from './CustomerDashboardPage';
import CustomerOrderPage from './CustomerOrderPage';
import CustomerOrderDetailPage from './CustomerOrderDetailPage';

const Customer: FC = () => {
  const { loading, user } = useSession();
  const { path } = useRouteMatch();
  const location = useLocation();

  const renderLocationHistory = () => {
    const splitPath = location.pathname.split('/');

    return splitPath.slice(1).map((path, index) => {
      const toPath = splitPath.reduce((prev, current, currentIndex) => {
        if (currentIndex - 1 <= index) {
          return prev + '/' + current;
        } else {
          return prev;
        }
      });

      return (
        <div className="font-semibold inline-block mr-1" key={toPath}>
          <Link
            className={index !== splitPath.slice(1).length - 1 ? '' : 'text-gold-100'}
            to={`${toPath}`}
          >{`${path}`}</Link>
          {index !== splitPath.slice(1).length - 1 ? <span>{` >>`}</span> : <></>}
        </div>
      );
    });
  };

  return (
    <ContentWithSidebarLayout>
      <div className="flex">{renderLocationHistory()}</div>

      <Switch>
        <Route path={`${path}/orders`}>
          <CustomerOrderPage />
        </Route>
        <Route path={`${path}/order/:orderId`}>
          <CustomerOrderDetailPage />
        </Route>
        <Route exact path={path}>
          <CustomerDashboardPage />
        </Route>
      </Switch>
    </ContentWithSidebarLayout>
  );
};

export default Customer;
