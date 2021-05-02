import { FC } from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useSession } from '../../../context/SessionContext';
import ContentWithSidebarLayout from '../../commons/layouts/ContentWithSidebarLayout';
import CustomerDashboardPage from './CustomerDashboardPage';
import CustomerOrderPage from './CustomerOrderPage';
import CustomerOrderDetailPage from './CustomerOrderDetailPage';
import CustomerInfo from './CustomerInfoPage';

const Customer: FC = () => {
  const { user } = useSession();
  const { path } = useRouteMatch();
  const location = useLocation();

  return user?.role === 'customer' || user?.role === 'admin' ? (
    <ContentWithSidebarLayout>
      <Switch>
        <Route path={`${path}/orders`}>
          <CustomerOrderPage />
        </Route>
        <Route path={`${path}/order/:orderId`}>
          <CustomerOrderDetailPage />
        </Route>
        <Route exact path={path}>
          <CustomerDashboardPage />
          <CustomerInfo />
        </Route>
      </Switch>
    </ContentWithSidebarLayout>
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location.pathname },
      }}
    />
  );
};

export default Customer;
