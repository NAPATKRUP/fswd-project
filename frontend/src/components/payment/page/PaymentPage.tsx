import { FC, lazy, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { ADDRESS_BY_ORDERID_QUERY } from '../../../graphql/addressByOrderIdQuery';
import { PAYMENT_BY_USERCONTEXT_QUERY } from '../../../graphql/paymentByUserContextQuery';
import { PAYMENT_ORDER_MUTATION } from '../../../graphql/paymentOrderMutation';
import { CANCEL_ORDER_MUTATION } from '../../../graphql/cancelOrderMutation';

import { RefreshIcon } from '@heroicons/react/outline';

import useModal from '../../../hooks/useModal';

import { IPayment } from '../../commons/type/IPayment';

const ContentWithSidebarLayout = lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = lazy(() => import('../../commons/loading/Loading'));
const Navigator = lazy(() => import('../../commons/Navigator'));
const AddressCard = lazy(() => import('../../commons/AddressCard'));
const Modal = lazy(() => import('../../commons/Modal'));

interface LocationState {
  orderId: string;
  addressId: string;
}

const PaymentPage: FC = () => {
  const location = useLocation<LocationState>();
  const { orderId } = location.state || '';

  const [paymentId, setPaymentId] = useState('');
  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

  const [isPayment, setIsPayment] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const history = useHistory();

  const {
    loading: orderLoading,
    error: orderError,
    data: orderData,
    refetch: addressRefetch,
  } = useQuery(ADDRESS_BY_ORDERID_QUERY, { variables: { orderId } });
  const { loading: paymentLoading, error: paymentError, data: paymentData } = useQuery(
    PAYMENT_BY_USERCONTEXT_QUERY
  );
  const [paymentOrder] = useMutation(PAYMENT_ORDER_MUTATION);
  const [cancelOrder] = useMutation(CANCEL_ORDER_MUTATION);

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
      if (isPayment) history.push({ pathname: '/customer/order/' + orderId });
      if (isCancel) history.push({ pathname: '/' });
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
        setIsPayment(true);
        return handleStatusMessage(
          'ยืนยันการชำระเงินเสร็จสิ้น',
          'คุณได้ทำการชำระเงินสินค้าแล้ว โดยท่านสามารถติดตามสถานะได้ที่ออเดอร์ของฉัน'
        );
      } catch ({ message }) {
        return handleStatusMessage('ทำรายการไม่สำเร็จ', message);
      }
    },
    [paymentId, handleStatusMessage, paymentOrder, orderId]
  );

  const handleSubmitCancel = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await cancelOrder({ variables: { orderId } });
        setIsCancel(true);
        return handleStatusMessage('ยกเลิกการสั่งซื้อเสร็จสิ้น', 'คุณได้ทำยกเลิกการสั่งซื้อแล้ว');
      } catch ({ message }) {
        return handleStatusMessage('ทำรายการไม่สำเร็จ', message);
      }
    },
    [handleStatusMessage, cancelOrder, orderId]
  );

  const handlePaymentIdChange = useCallback(async (event) => {
    setPaymentId(event.target.value);
  }, []);

  if (orderLoading || paymentLoading) {
    return <Loading />;
  }
  if (orderError || paymentError) {
    history.push({ pathname: '/error' });
    return <></>;
  }
  const { orderById } = orderData;
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
      <div className="flex">
        <Navigator
          listOfNode={['หน้าหลัก', '>>', 'ตะกร้า', '>>', 'ตรวจสอบสินค้า', '>>', 'ชำระเงิน']}
        />
        <button className="mx-3 my-5" onClick={() => addressRefetch()}>
          <RefreshIcon className="h-5 w-5" />
        </button>
      </div>
      <AddressCard address={orderById.address} />
      <form onSubmit={handleSubmitPayment} className="lg:px-20 px-10 pt-10 pb-4 mt-8 text-right">
        <label className="text-xl font-semibold lg:w-5/12 w-full px-4">
          โปรดเลือกช่องทางในการชำระเงิน
        </label>
        <select
          name="payment"
          className="border-2 rounded-full lg:w-3/12 w-8/12 bg-dark-100 text-white-100 hover:bg-dark-200 p-1"
          onChange={handlePaymentIdChange}
        >
          <option value="" disabled>
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
      {(orderById.orderStatus === 'WAITING' || orderById.orderStatus === 'CONFIRM') && (
        <div className="flex justify-end lg:mr-20 mr-10">
          <button
            onClick={() => {
              history.push({ pathname: '/checkout', state: { orderId: orderId } });
            }}
            className="font-semibold border-2 rounded-xl bg-dark-100 text-white-100 hover:bg-dark-200 ml-2 px-2 py-1"
          >
            เปลี่ยนที่อยู่ปลายทาง
          </button>
          <button
            onClick={handleSubmitCancel}
            className="font-semibold border-2 rounded-xl bg-white-100 text-dark-100 hover:bg-white-200 ml-2 px-2 py-1"
          >
            ยกเลิกการสั่งซื้อ
          </button>
        </div>
      )}
    </ContentWithSidebarLayout>
  );
};

export default PaymentPage;
