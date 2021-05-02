import { FC, lazy, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { ORDER_BY_ID_QUERY } from '../../../graphql/orderByIdQuery';
import { ADDRESS_BY_USERCONTEXT_QUERY } from '../../../graphql/addressByUserContextQuery';
import { CONFIRM_ORDER_MUTATION } from '../../../graphql/confirmOrderMutaton';
import { CANCEL_ORDER_MUTATION } from '../../../graphql/cancelOrderMutation';

import useModal from '../../../hooks/useModal';

import { IAddress } from '../../commons/type/IAddress';

const ContentWithSidebarLayout = lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = lazy(() => import('../../commons/loading/Loading'));
const Navigator = lazy(() => import('../../commons/Navigator'));
const ConfirmOrderCard = lazy(() => import('../../commons/ConfirmOrderCard'));
const Modal = lazy(() => import('../../commons/Modal'));

interface LocationState {
  orderId: string;
}

const CheckoutPage: FC = () => {
  const location = useLocation<LocationState>();
  const { orderId } = location.state || '';

  const [addressId, setAddressId] = useState('');
  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

  const [isConfirm, setIsConfirm] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const history = useHistory();

  const { loading: orderLoading, error: orderError, data: orderData } = useQuery(
    ORDER_BY_ID_QUERY,
    { variables: { orderId } }
  );
  const { loading: addressLoading, error: addressError, data: addressData } = useQuery(
    ADDRESS_BY_USERCONTEXT_QUERY
  );
  const [confirmOrder] = useMutation(CONFIRM_ORDER_MUTATION);
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
      if (isConfirm)
        history.push({ pathname: '/payment', state: { orderId: orderId, addressId: addressId } });
      if (isCancel) history.push({ pathname: '/' });
    }
  };

  const handleSubmitAddress = useCallback(
    async (event) => {
      event.preventDefault();

      if (addressId === '')
        return handleStatusMessage(
          'ไม่พบที่อยู่ปลายทางในการจัดส่งสินค้า',
          'กรุณาเลือกที่อยู่ปลายทางในการจัดส่งสินค้าของท่านก่อนทำการชำระเงิน'
        );

      try {
        await confirmOrder({ variables: { orderId, addressId } });
        setIsConfirm(true);
        return handleStatusMessage(
          'ยืนยันการตรวจสอบเสร็จสิ้น',
          'คุณได้ทำการตรวจสอบสินค้าแล้ว โปรดเลือกช่องทางการชำระเงิน'
        );
      } catch ({ message }) {
        return handleStatusMessage('ทำรายการไม่สำเร็จ', message);
      }
    },
    [addressId, handleStatusMessage, confirmOrder, orderId]
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

  const handleAddressIdChange = useCallback(async (event) => {
    setAddressId(event.target.value);
  }, []);

  if (orderLoading || addressLoading) {
    return <Loading />;
  }
  if (orderError || addressError) {
    history.push({ pathname: '/error' });
    return <></>;
  }
  const { orderById } = orderData;
  const { addressByUserContext } = addressData;

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
      <Navigator listOfNode={['หน้าหลัก', '>>', 'ตะกร้า', '>>', 'ตรวจสอบสินค้า']} />
      <ConfirmOrderCard data={orderById} />

      <form onSubmit={handleSubmitAddress} className="lg:px-20 px-10 py-10 pb-4 mt-8 text-right">
        <label className="text-xl font-semibold">โปรดเลือกที่อยู่ในการจัดส่ง</label>
        <select
          name="address"
          className="border-2 rounded-full bg-dark-100 text-white-100 hover:bg-dark-200 mx-2 p-1"
          onChange={handleAddressIdChange}
        >
          <option value="" disabled>
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
      {(orderById.orderStatus === 'WAITING' || orderById.orderStatus === 'CONFIRM') && (
        <div className="flex justify-end lg:mr-20 mr-10">
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

export default CheckoutPage;
