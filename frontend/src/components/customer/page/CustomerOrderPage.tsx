import { FC, lazy, useCallback } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from '@apollo/client';
import { CUSTOMER_ORDERS_QUERY } from '../../../graphql/customerOrdersQuery';
import { IOrder } from '../../commons/type/IOrder';
import moment from 'moment';
import 'moment/locale/th';

import { DocumentReportIcon, RefreshIcon, HomeIcon } from '@heroicons/react/outline';

const Loading = lazy(() => import('../../commons/loading/Loading'));

const CustomerOrderPage: FC = () => {
  const history = useHistory();

  const {
    loading: customerOrderLoading,
    error: customerOrderError,
    data: customerOrderData,
    refetch: customerOrderRefetch,
  } = useQuery(CUSTOMER_ORDERS_QUERY);

  const handleChangeToDetailPage = useCallback(
    async (e, orderId, orderStatus) => {
      e.preventDefault();
      if (orderStatus === 'WAITING')
        history.push({ pathname: '/checkout', state: { orderId: orderId } });
      if (orderStatus === 'CONFIRM')
        history.push({ pathname: '/payment', state: { orderId: orderId } });
      if (
        orderStatus === 'SUCCESS' ||
        orderStatus === 'CANCEL' ||
        orderStatus === 'SHIPPING' ||
        orderStatus === 'ARRIVED'
      )
        history.push({ pathname: '/customer/order/' + orderId });
    },
    [history]
  );

  if (customerOrderLoading) {
    return <Loading />;
  }
  if (customerOrderError) {
    history.push({ pathname: '/error' });
    return <></>;
  }
  const { orderByUserContext } = customerOrderData;

  return (
    <div className="lg:px-20 md:px-10 px-4 pt-12">
      <div className="lg:text-2xl text-xl">
        <DocumentReportIcon className="h-8 w-8 inline-flex" />{' '}
        <span className="mr-1">รายการคำสั่งซื้อของฉัน </span>
        <button onClick={() => customerOrderRefetch()}>
          <RefreshIcon className="h-5 w-5" />
        </button>{' '}
      </div>
      {orderByUserContext.length === 0 && <p className="mt-6 ml-2">คุณไม่มีคำสั่งซื้อ</p>}
      {orderByUserContext.length !== 0 && (
        <div className="my-4">
          <div className="grid grid-cols-12 gap-1 mt-6 mb-4">
            <div className="lg:col-span-8 col-span-8 lg:text-base text-sm">
              รายละเอียด / ที่อยู่การจัดส่ง
            </div>
            <div className="lg:col-span-2 col-span-2 lg:text-base text-sm">ชำระเงินผ่านทาง</div>
            <div className="lg:col-span-2 col-span-2 lg:text-base text-sm">สถานะ</div>
          </div>
          {orderByUserContext?.map((order: IOrder, index: number) => (
            <div key={order._id} className="my-2">
              <div
                role="button"
                onClick={(e) => {
                  handleChangeToDetailPage(e, order._id, order.orderStatus);
                }}
                className="grid grid-cols-12 gap-1 my-1 hover:bg-white-200 p-2 rounded-xl"
              >
                <div className="lg:col-span-8 col-span-8">
                  <p className="text-xs">เลขที่คำสั่งซื้อ #{order._id}</p>
                  {order.address && (
                    <>
                      <p className="lg:text-sm text-xs">
                        <HomeIcon className="h-4 w-4 inline-flex" /> {order.address?.name}
                      </p>
                      <p className="lg:text-sm text-xs">{order.address?.addressDetail}</p>
                    </>
                  )}
                  {!order.address && <p className="text-dark-500">ไม่พบข้อมูลที่อยู่</p>}
                </div>

                {order.payment && (
                  <div className="lg:col-span-2 col-span-2 lg:text-sm text-xs">
                    {order.payment?.name}
                  </div>
                )}
                {!order.payment && (
                  <div className="lg:col-span-2 col-span-2 lg:text-sm text-xs text-dark-500">
                    ยังไม่ชำระเงิน
                  </div>
                )}
                <div className="lg:col-span-2 col-span-2 lg:text-sm text-xs">
                  {(order.orderStatus === 'WAITING' || order.orderStatus === 'CONFIRM') && (
                    <>
                      <p className="bg-white-200 px-2 py-1 rounded-lg">รอการยืนยัน</p>
                    </>
                  )}
                  {order.orderStatus === 'SUCCESS' && (
                    <>
                      <p className="bg-dark-100 text-white-100 px-2 py-1 rounded-lg">
                        ชำระเงินแล้ว
                      </p>
                      <p className="mt-1">({moment(order.checkoutAt).format('L')})</p>
                    </>
                  )}
                  {order.orderStatus === 'SHIPPING' && (
                    <>
                      <p className="bg-orange-500 px-2 py-1 rounded-lg">กำลังขนส่ง</p>
                      <p className="mt-1">({moment(order.checkoutAt).format('L')})</p>
                    </>
                  )}
                  {order.orderStatus === 'ARRIVED' && (
                    <>
                      <p className="bg-green-500 px-2 py-1 rounded-lg">เสร็จสิ้น</p>
                      <p className="mt-1">({moment(order.checkoutAt).format('L')})</p>
                    </>
                  )}
                  {order.orderStatus === 'CANCEL' && (
                    <>
                      <p className="bg-red-500 px-2 py-1 rounded-lg">ยกเลิก</p>
                      <p className="mt-1">({moment(order.cancelAt).format('L')})</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrderPage;
