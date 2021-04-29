import React, { FC, useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useQuery, useMutation } from '@apollo/client';
import { WAITING_CART_QUERY } from '../graphql/waitingCartQuery';
import { CHECKOUT_MUTATION } from '../graphql/checkoutCartMutation';

import useModal from '../../../hooks/useModal';

const ContentWithSidebarLayout = React.lazy(
  () => import('../../commons/layouts/ContentWithSidebarLayout')
);
const Loading = React.lazy(() => import('../../commons/loading/Loading'));
const Navigator = React.lazy(() => import('../../commons/Navigator'));
const CartTable = React.lazy(() => import('../components/CartTable'));
const SummaryWrapper = React.lazy(() => import('../components/SummaryWrapper'));
const Modal = React.lazy(() => import('../../commons/Modal'));

const CartPage: FC = () => {
  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

  const [order, setOrder] = useState('');

  const history = useHistory();

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
      history.push('/checkout', { orderId: order });
    }
  };

  const [checkoutCart] = useMutation(CHECKOUT_MUTATION);
  const handleCheckoutCart = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const orderResult: any = await checkoutCart({
          refetchQueries: [{ query: WAITING_CART_QUERY }],
        });
        setOrder(orderResult.data.checkoutCart._id);
        return handleStatusMessage(
          'ตรวจสอบเสร็จสิ้น',
          'ระบบได้ทำการตรวจสอบรายการสั่งซื้อสิ้นค้าของท่านแล้ว โปรดเลือกที่อยู่ปลายทางในการจัดส่งสินค้า'
        );
      } catch ({ message }) {
        return handleStatusMessage('ทำรายการไม่สำเร็จ', message);
      }
    },
    [checkoutCart, handleStatusMessage]
  );

  const { loading, error, data } = useQuery(WAITING_CART_QUERY);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    alert('error');
  }
  const { waitingCart } = data;

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
      <Navigator listOfNode={['หน้าหลัก', '>>', 'ตะกร้า']} />
      <CartTable items={waitingCart.items} />
      <SummaryWrapper
        totalPrice={waitingCart.totalPrice}
        promotionDiscount={waitingCart.promotionDiscount}
        totalFinalPrice={waitingCart.totalFinalPrice}
      />
      <div className="flex px-20 pt-10 justify-end">
        <button
          onClick={(e) => handleCheckoutCart(e)}
          className="bg-gold-100 hover:bg-dark-100 hover:text-gold-100 px-4 py-2 rounded"
        >
          ตรวจสอบตะกร้าสินค้า
        </button>
      </div>
    </ContentWithSidebarLayout>
  );
};

export default CartPage;
