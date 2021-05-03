import { FC, lazy } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ORDER_BY_ID_CUSTOMER_QUERY } from '../../../graphql/orderByIdCustomerQuery';
import ConfirmOrderCard from '../../commons/ConfirmOrderCard';
import AddressCard from '../../commons/AddressCard';
import PaymentCard from '../../commons/PaymentCard';

import { RefreshIcon } from '@heroicons/react/outline';

interface RouteParams {
  orderId: string;
}

const Loading = lazy(() => import('../../commons/loading/Loading'));
const Navigator = lazy(() => import('../../commons/Navigator'));

const CustomerOrderDetailPage: FC = () => {
  const { orderId } = useParams<RouteParams>();
  const history = useHistory();

  const {
    loading: orderLoading,
    error: orderError,
    data: orderData,
    refetch: orderRefetch,
  } = useQuery(ORDER_BY_ID_CUSTOMER_QUERY, { variables: { orderId: orderId } });

  if (orderLoading) {
    return <Loading />;
  }
  if (orderError) {
    history.push({ pathname: '/error' });
    return <></>;
  }
  const { orderById } = orderData;

  return (
    <div className="mt-8">
      <Navigator listOfNode={['บัญชีของฉัน', '>>', 'คำสั่งซื้อ', '>>', orderById._id]} />
      <div className="lg:text-2xl text-xl text-right text-dark-100 lg:mx-20 mx-10 mt-8">
        <button onClick={() => orderRefetch()}>
          <RefreshIcon className="h-5 w-5" />
        </button>{' '}
        #{orderById.orderStatus}
      </div>
      <ConfirmOrderCard data={orderById} />
      <div className="grid lg:grid-cols-2 grid-cols-1 bg-gold-100 rounded-xl mt-8 lg:mx-20 mx-10 p-4">
        <AddressCard address={orderById.address} />
        <PaymentCard payment={orderById.payment} />
      </div>
    </div>
  );
};

export default CustomerOrderDetailPage;
