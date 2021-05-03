import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSession } from '../../../context/SessionContext';
import ContentWithSidebarLayout from '../../commons/layouts/ContentWithSidebarLayout';
import ProductManagerPage from '../manageProduct/page/ProductManagerPage';
import OrderManagerPage from '../manageOrder/page/OrderManagerPage';
import AdminDashboardPage from './AdminDashboardPage';
import NotPermissionPage from '../../error/page/NotPermissionPage';
import Loading from '../../commons/loading/Loading';
import NeedAuthenticationPage from '../../error/page/NeedAuthenticationPage';
import CreateProductPage from '../manageProduct/page/CreateProductPage';
import EditProductPage from '../manageProduct/page/EditProductPage';
import UpdateOrderStatusPage from '../manageOrder/page/UpdateOrderStatusPage';

const AdminManagerPage: FC = () => {
  const { user, loading } = useSession();
  const { path } = useRouteMatch();

  if (loading) return <Loading />;

  return user?.role === 'admin' ? (
    <ContentWithSidebarLayout>
      <Switch>
        <Route path={`${path}/products`}>
          <ProductManagerPage />
        </Route>
        <Route exact path={`${path}/product/create`}>
          <CreateProductPage />
        </Route>
        <Route path={`${path}/product/:productId`}>
          <EditProductPage />
        </Route>
        <Route path={`${path}/order/:orderId`}>
          <UpdateOrderStatusPage />
        </Route>
        <Route path={`${path}/orders`}>
          <OrderManagerPage />
        </Route>
        <Route path={`${path}/order/:orderId`}>
          <UpdateOrderStatusPage />
        </Route>
        <Route exact path={path}>
          <AdminDashboardPage />
        </Route>
      </Switch>
    </ContentWithSidebarLayout>
  ) : user?.role === 'customer' ? (
    <NotPermissionPage />
  ) : (
    <NeedAuthenticationPage />
  );
};

export default AdminManagerPage;
