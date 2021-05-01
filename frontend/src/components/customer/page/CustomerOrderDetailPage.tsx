import { FC, lazy } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ORDER_BY_ID_OF_USER_CONTEXT_QUERY } from '../../../graphql/orderByIdOfUserContextQuery';
import ConfirmOrderCard from '../../commons/ConfirmOrderCard';
import AddressCard from '../../commons/AddressCard';
import PaymentCard from '../../commons/PaymentCard';

interface RouteParams {
  orderId: string;
}

const Loading = lazy(() => import('../../commons/loading/Loading'));

const CustomerOrderDetailPage: FC = () => {
  const { orderId } = useParams<RouteParams>();
  const history = useHistory();

  const {
    loading: orderLoading,
    error: orderError,
    data: orderData,
  } = useQuery(ORDER_BY_ID_OF_USER_CONTEXT_QUERY, { variables: { orderId: orderId } });

  if (orderLoading) {
    return <Loading />;
  }
  if (orderError) {
    history.push({ pathname: '/error' });
    return <></>;
  }
  const { orderById } = orderData;
  console.log(orderById);

  return (
    <>
      <div className="lg:text-4xl text-3xl text-right text-dark-100 lg:mx-20 mx-10 mt-8">
        #{orderById.orderStatus}
      </div>
      <ConfirmOrderCard data={orderById} />
      <div className="grid lg:grid-cols-2 grid-cols-1 bg-gold-100 rounded-xl mt-8 lg:mx-20 mx-10 p-4">
        <AddressCard address={orderById.address} />
        <PaymentCard payment={orderById.payment} />
      </div>
    </>
  );
};

export default CustomerOrderDetailPage;
