import { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { useSession } from '../../../context/SessionContext';
import ContentWithSidebarLayout from '../../commons/layouts/ContentWithSidebarLayout';
import CustomerDashboardPage from './CustomerDashboardPage';
import CustomerOrderPage from './CustomerOrderPage';
import CustomerOrderDetailPage from './CustomerOrderDetailPage';
import CustomerInfo from './CustomerInfoPage';
import CustomerCreateAddressPage from './CustomerCreateAddressPage';
import CustomerAddress from './CustomerAddressPage';
import CustomerEditAddressPage from './CustomerEditAddressPage';
import NeedAuthenticationPage from '../../error/page/NeedAuthenticationPage';
import CustomerPaymentPage from './CustomerPaymentPage';
import CustomerCreatePaymentPage from './CustomerCreatePaymentPage';
import CustomerEditPaymentPage from './CustomerEditPaymentPage';

const Customer: FC = () => {
  const { user } = useSession();
  const { path } = useRouteMatch();

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
        <Route path={`${path}/payment/:paymentId`}>
          <CustomerEditPaymentPage />
        </Route>
        <Route path={`${path}/payment`}>
          <CustomerCreatePaymentPage />
        </Route>
        <Route exact path={path}>
          <CustomerDashboardPage />
          <div className="lg:px-20 md:px-10 px-4">
            <CustomerInfo />
            <CustomerAddress />
            <CustomerPaymentPage />
          </div>
        </Route>
      </Switch>
    </ContentWithSidebarLayout>
  ) : (
    <NeedAuthenticationPage />
  );
};

export default Customer;
