import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ORDER_BY_ID_QUERY } from '../graphql/orderQuery';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = React.lazy(() => import('../../commons/loading/Loading'));
const Navigator = React.lazy(() => import('../../commons/Navigator'));
const ConfirmOrderCard = React.lazy(() => import('../../commons/ConfirmOrderCard'));
const AddressCard = React.lazy(() => import('../../commons/AddressCard'));

interface RouteParams {
  orderId: string;
}

const PaymentPage: FC = () => {
  const { orderId } = useParams<RouteParams>();
  const addressId = '6087f08b162e574734d91836';

  const { loading, error, data } = useQuery(ORDER_BY_ID_QUERY, {
    variables: { orderId, addressId: addressId },
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    alert('error');
  }
  const { orderById, addressById } = data;

  return (
    <ContentWithSidebarLayout>
      <Navigator
        listOfNode={['หน้าหลัก', '>>', 'ตะกร้า', '>>', 'ตรวจสอบสินค้า', '>>', 'ชำระเงิน']}
      />
      <AddressCard address={addressById} />
      <form className="lg:px-20 px-10 py-10 mt-8 text-right">
        <label className="text-xl font-semibold lg:w-5/12 w-full px-4">
          โปรดเลือกช่องทางในการชำระเงิน
        </label>
        <select
          name="payment"
          className="border-2 rounded-full lg:w-3/12 w-8/12 bg-dark-100 text-white-100 hover:bg-dark-200 p-1"
        >
          <option value="" selected>
            โปรดเลือกช่องทางในการชำระเงิน
          </option>
        </select>
        <input
          type="submit"
          value="ชำระเงิน"
          className="font-semibold border-2 rounded-xl lg:w-1/12 md:w-2/12 sm:w-1/3 bg-gold-100 text-dark-100 hover:bg-gold-200 ml-2 mt-2 px-2 py-1"
        />
      </form>
    </ContentWithSidebarLayout>
  );
};

export default PaymentPage;
