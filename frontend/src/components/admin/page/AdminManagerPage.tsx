import { FC } from 'react';
import { Switch, Route, useRouteMatch, useLocation, Redirect } from 'react-router-dom';
import { useSession } from '../../../context/SessionContext';
import ContentWithSidebarLayout from '../../commons/layouts/ContentWithSidebarLayout';
import ProductManagerPage from '../manageProduct/page/ProductManagerPage';
import OrderManagerPage from '../manageOrder/page/OrderManagerPage';
import AdminDashboardPage from './AdminDashboardPage';

const AdminManagerPage: FC = () => {
  const { user } = useSession();
  const { path } = useRouteMatch();
  const location = useLocation();

  return user?.role === 'admin' ? (
    <ContentWithSidebarLayout>
      <Switch>
        <Route path={`${path}/product`}>
          <ProductManagerPage />
        </Route>
        <Route path={`${path}/orders`}>
          <OrderManagerPage />
        </Route>
        <Route exact path={path}>
          <AdminDashboardPage />
        </Route>
      </Switch>
    </ContentWithSidebarLayout>
  ) : (
    <Redirect
      to={{
        pathname: '/no-permission',
        state: { from: location.pathname },
      }}
    />
  );
};

export default AdminManagerPage;
