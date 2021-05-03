import { FC, useEffect, useMemo, useState } from 'react';
import { Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router';
import { Redirect } from 'react-router-dom';
import { useSession } from '../../../context/SessionContext';
import ContentWithSidebarLayout from '../../commons/layouts/ContentWithSidebarLayout';
import CustomerDashboardPage from './CustomerDashboardPage';
import CustomerOrderPage from './CustomerOrderPage';
import CustomerOrderDetailPage from './CustomerOrderDetailPage';
import CustomerInfo from './CustomerInfoPage';
import CustomerCreateAddressPage from './CustomerCreateAddressPage';
import CustomerAddress from './CustomerAddressPage';
import CustomerEditAddressPage from './CustomerEditAddressPage';
import Loading from '../../commons/loading/Loading';
import NeedAuthenticationPage from '../../error/page/NeedAuthenticationPage';

const Customer: FC = () => {
  const { user, loading } = useSession();
  const { path } = useRouteMatch();

  // if (loading) return <Loading />;

  return user ? (
    <ContentWithSidebarLayout>
      <Switch>
        <Route path={`${path}/orders`}>
          <CustomerOrderPage />
        </Route>
        <Route path={`${path}/order/:orderId`}>
          <CustomerOrderDetailPage />
        </Route>
        <Route path={`${path}/address/:addressId`}>
          <CustomerEditAddressPage />
        </Route>
        <Route path={`${path}/address`}>
          <CustomerCreateAddressPage />
        </Route>
        <Route exact path={path}>
          <CustomerDashboardPage />
          <div className="lg:px-20 md:px-10 px-4">
            <CustomerInfo />
            <CustomerAddress />
          </div>
        </Route>
      </Switch>
    </ContentWithSidebarLayout>
  ) : (
    <NeedAuthenticationPage />
  );
};

export default Customer;
