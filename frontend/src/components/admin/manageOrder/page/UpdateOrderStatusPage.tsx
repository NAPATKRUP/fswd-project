import { FC, lazy, useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { ORDER_BY_ID_ADMIN_QUERY } from '../../../../graphql/orderByIdAdminQuery';
import { CHANGE_STATUS_BY_ADMIN_MUTATION } from '../../../../graphql/changeStatusByAdminMutation';
import { CANCEL_ORDER_MUTATION } from '../../../../graphql/cancelOrderMutation';
import ConfirmOrderCard from '../../../commons/ConfirmOrderCard';
import AddressCard from '../../../commons/AddressCard';
import PaymentCard from '../../../commons/PaymentCard';

import useModal from '../../../../hooks/useModal';

import { RefreshIcon, UserIcon } from '@heroicons/react/outline';

interface RouteParams {
  orderId: string;
}

const Loading = lazy(() => import('../../../commons/loading/Loading'));
const Navigator = lazy(() => import('../../../commons/Navigator'));
const Modal = lazy(() => import('../../../commons/Modal'));

const UpdateOrderStatusPage: FC = () => {
  const { orderId } = useParams<RouteParams>();
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

  const handleStatusMessage = useCallback(
    (title: string, bodyMessage: string) => {
      setTitle(title);
      setBodyMessage(bodyMessage);
      toggle();
    },
    [toggle]
  );
  const handleCallBack = (status: boolean) => {
    if (!status) {
      toggle();
    }
  };

  const [changeStatusByAdmin] = useMutation(CHANGE_STATUS_BY_ADMIN_MUTATION);
  const [cancelOrder] = useMutation(CANCEL_ORDER_MUTATION);
  const handleChangeStatusOrder = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (e.target.value === 'CANCEL') {
          await cancelOrder({ variables: { orderId: orderId } });
        } else {
          await changeStatusByAdmin({ variables: { orderId: orderId, status: e.target.value } });
        }
        return handleStatusMessage('แก้ไขสถานะเสร็จสิ้น', 'ระบบได้ทำการแก้ไขสถานะออเดอร์แล้ว');
      } catch ({ message }) {
        return handleStatusMessage('ทำรายการไม่สำเร็จ', message);
      }
    },
    [cancelOrder, changeStatusByAdmin, handleStatusMessage, orderId]
  );

  const {
    loading: orderLoading,
    error: orderError,
    data: orderData,
    refetch: orderRefetch,
  } = useQuery(ORDER_BY_ID_ADMIN_QUERY, { variables: { orderId: orderId } });

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
      <Modal
        isOpen={isShowing}
        isHasAccept={false}
        isHasDecline={false}
        title={title}
        bodyMessage={bodyMessage}
        callBackFunction={handleCallBack}
      />
      <Navigator listOfNode={['จัดการ', '>>', 'จัดการออเดอร์', '>>', orderById._id]} />
      <div className="lg:text-4xl text-3xl text-right text-dark-100 lg:mx-20 mx-10 mt-10">
        <button onClick={() => orderRefetch()}>
          <RefreshIcon className="h-5 w-5" />
        </button>{' '}
        <select
          onChange={handleChangeStatusOrder}
          name="orderStatus"
          className="border-2 border-dark-100 rounded-xl p-1"
          defaultValue={orderById.orderStatus}
        >
          {['SUCCESS', 'SHIPPING', 'ARRIVED', 'CANCEL'].map((status) => {
            return (
              <option key={status} value={status}>
                {status}
              </option>
            );
          })}
        </select>
      </div>
      <div className="lg:px-20 px-10 pt-12">
        <div className="text-2xl font-semibold">
          <UserIcon className="h-8 w-8 inline-flex" /> รหัสลูกค้า #{orderById.userId}
        </div>
      </div>
      <ConfirmOrderCard data={orderById} />
      <div className="grid lg:grid-cols-2 grid-cols-1 bg-gold-100 rounded-xl mt-8 lg:mx-20 mx-10 p-4">
        <AddressCard address={orderById.address} />
        <PaymentCard payment={orderById.payment} />
      </div>
    </div>
  );
};

export default UpdateOrderStatusPage;
