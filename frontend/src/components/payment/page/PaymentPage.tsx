import React, { FC, useState, useCallback } from 'react';
import { useLocation } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { ADDRESS_BY_ID_QUERY } from '../../../graphql/addressQuery';
import { PAYMENT_BY_USERCONTEXT_QUERY } from '../../../graphql/paymentByUserContextQuery';
import { PAYMENT_ORDER_MUTATION } from '../../../graphql/paymentOrderMutation';

import useModal from '../../../hooks/useModal';

import { IPayment } from '../../commons/type/IPayment';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = React.lazy(() => import('../../commons/loading/Loading'));
const Navigator = React.lazy(() => import('../../commons/Navigator'));
const AddressCard = React.lazy(() => import('../../commons/AddressCard'));
const Modal = React.lazy(() => import('../../commons/Modal'));

interface LocationState {
  orderId: string;
  addressId: string;
}

const PaymentPage: FC = () => {
  const location = useLocation<LocationState>();
  const { orderId, addressId } = location.state;

  const [paymentId, setPaymentId] = useState('');
  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

  const { loading: addressLoading, error: addressError, data: addressData } = useQuery(
    ADDRESS_BY_ID_QUERY,
    {
      variables: { addressId: addressId },
    }
  );
  const { loading: paymentLoading, error: paymentError, data: paymentData } = useQuery(
    PAYMENT_BY_USERCONTEXT_QUERY
  );
  const [paymentOrder] = useMutation(PAYMENT_ORDER_MUTATION);

  const handleStatusMessage = useCallback(
    (title: string, bodyMessage: string) => {
      setTitle(title);
      setBodyMessage(bodyMessage);
      toggle();
    },
    [toggle]
  );
  const handleCallBack = (stats: boolean) => {
    if (!stats) {
      toggle();
    }
  };

  const handleSubmitPayment = useCallback(
    async (event) => {
      event.preventDefault();

      if (paymentId === '')
        return handleStatusMessage(
          'ไม่พบช่องทางการชำระเงิน',
          'กรุณาเลือกช่องทางการชำระเงินของท่าน ก่อนทำการสั่งซื้อสินค้า'
        );

      try {
        await paymentOrder({ variables: { orderId, paymentId } });
        return handleStatusMessage(
          'ยืนยันการชำระเงินเสร็จสิ้น',
          'คุณได้ทำการชำระเงินสินค้าแล้ว โดยท่านสามารถติดตามสถานะได้ที่ออร์เดอร์ของฉัน'
        );
      } catch ({ message }) {
        return handleStatusMessage('ทำรายการไม่สำเร็จ', message);
      }
    },
    [paymentId, handleStatusMessage, paymentOrder, orderId]
  );

  const handlePaymentIdChange = useCallback(async (event) => {
    setPaymentId(event.target.value);
  }, []);

  if (addressLoading || paymentLoading) {
    return <Loading />;
  }
  if (addressError || paymentError) {
    alert('error');
  }
  const { addressById } = addressData;
  const { paymentByUserContext } = paymentData;

  return (
    <ContentWithSidebarLayout>
      <Modal
        isOpen={isShowing}
        isHasAccept={false}
        isHasDecline={false}
        title={title}
        bodyMessage={bodyMessage}
        callBackFunction={handleCallBack}
      />
      <Navigator
        listOfNode={['หน้าหลัก', '>>', 'ตะกร้า', '>>', 'ตรวจสอบสินค้า', '>>', 'ชำระเงิน']}
      />
      <AddressCard address={addressById} />

      <form onSubmit={handleSubmitPayment} className="lg:px-20 px-10 py-10 mt-8 text-right">
        <label className="text-xl font-semibold lg:w-5/12 w-full px-4">
          โปรดเลือกช่องทางในการชำระเงิน
        </label>
        <select
          name="payment"
          className="border-2 rounded-full lg:w-3/12 w-8/12 bg-dark-100 text-white-100 hover:bg-dark-200 p-1"
          onChange={handlePaymentIdChange}
        >
          <option value="" selected>
            โปรดเลือกช่องทางในการชำระเงิน
          </option>
          {paymentByUserContext.map((payment: IPayment) => (
            <option key={payment._id} value={payment._id}>
              {payment.name}
            </option>
          ))}
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
