import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ORDER_BY_ID_QUERY } from '../graphql/orderQuery';
import { ADDRESS_BY_USER_QUERY } from '../graphql/addressByUserQuery';

import { IAddress } from '../../commons/type/IAddress';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = React.lazy(() => import('../../commons/loading/Loading'));
const Navigator = React.lazy(() => import('../../commons/Navigator'));
const ConfirmOrderCard = React.lazy(() => import('../../commons/ConfirmOrderCard'));

interface RouteParams {
  orderId: string;
}

const CheckoutPage: FC = () => {
  const { orderId } = useParams<RouteParams>();

  const { loading: orderLoading, error: orderError, data: orderData } = useQuery(
    ORDER_BY_ID_QUERY,
    { variables: { orderId } }
  );
  const { loading: addressLoading, error: addressError, data: addressData } = useQuery(
    ADDRESS_BY_USER_QUERY
  );

  if (orderLoading || addressLoading) {
    return <Loading />;
  }
  if (orderError || addressError) {
    alert('error');
  }
  const { orderById } = orderData;
  const { addressByUserContext } = addressData;

  return (
    <ContentWithSidebarLayout>
      <Navigator listOfNode={['หน้าหลัก', '>>', 'ตะกร้า', '>>', 'ตรวจสอบสินค้า']} />
      <ConfirmOrderCard data={orderById} />

      <form className="lg:px-20 px-10 py-10 mt-8 text-right">
        <label className="text-xl font-semibold">โปรดเลือกที่อยู่ในการจัดส่ง</label>
        <select
          name="address"
          className="border-2 rounded-full bg-dark-100 text-white-100 hover:bg-dark-200 mx-2 p-1"
        >
          <option value="" selected>
            โปรดเลือกที่อยู่ที่ใช้ในการจัดส่ง
          </option>
          {addressByUserContext.map((address: IAddress) => (
            <option key={address._id} value={address._id}>
              {address.name}
            </option>
          ))}
        </select>
        <input
          type="submit"
          value="ยืนยันการตรวจสอบ"
          className="font-semibold border-2 rounded-xl bg-gold-100 text-dark-100 hover:bg-gold-200 px-2 py-1"
        />
      </form>
    </ContentWithSidebarLayout>
  );
};

export default CheckoutPage;
