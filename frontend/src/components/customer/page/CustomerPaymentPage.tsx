import { useMutation, useQuery } from '@apollo/client';
import { CreditCardIcon } from '@heroicons/react/outline';
import { FC, useCallback, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { PAYMENT_BY_USERCONTEXT_QUERY } from '../../../graphql/paymentByUserContextQuery';
import { REMOVE_PAYMENT_BY_ID_MUTATION } from '../../../graphql/removePaymentByIdMutation';
import useModal from '../../../hooks/useModal';
import Modal from '../../commons/Modal';

interface IPaymeny {
  _id: string;
  name: string;
  fullName: string;
  cardNumber: string;
}

interface userPaymentPayload {
  paymentByUserContext: IPaymeny[];
}

const CustomerPaymentPage: FC = () => {
  let { url } = useRouteMatch();

  const [title, setTitle] = useState<string>('');
  const [bodyMessage, setBodyMessage] = useState<string>('');
  const { isShowing, toggle } = useModal(false);

  const { data, refetch } = useQuery<userPaymentPayload>(PAYMENT_BY_USERCONTEXT_QUERY);
  const [removePayment] = useMutation(REMOVE_PAYMENT_BY_ID_MUTATION);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleModalCallBack = (status: boolean) => {
    if (!status) toggle();
  };

  const handleModalMessage = useCallback(
    (title: string, bodyMessage: string) => {
      setTitle(title);
      setBodyMessage(bodyMessage);
      toggle();
    },
    [toggle]
  );

  const handleRemovePayment = useCallback(
    async (id) => {
      try {
        await removePayment({ variables: { id: id } });
        handleModalMessage('ลบข้อมูลการเงินสำเร็จ', 'คุณได้ลบข้อมูลการเงินของคุณ');
        refetch();
      } catch ({ message }) {
        handleModalMessage('ลบข้อมูลการเงินไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
      }
    },
    [handleModalMessage, refetch, removePayment]
  );

  const renderPayment = (payment) => {
    return (
      <div className="mt-2 flex justify-between" key={payment._id}>
        <div>
          <p className="lg:text-sm text-xs">{payment?.name}</p>
          <p className="lg:text-sm text-xs">{payment?.fullName}</p>
          <p className="lg:text-sm text-xs">{payment?.cardNumber}</p>
        </div>
        <div>
          <Link to={`${url}/payment/${payment?._id}`}>
            <button className="py-2 px-4 bg-dark-500 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-white-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75">
              แก้ไข
            </button>
          </Link>
          <button
            onClick={() => handleRemovePayment(payment._id)}
            className="ml-2 py-2 px-4 bg-red-500 text-white-100 font-semibold rounded-lg shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75"
          >
            ลบ
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mt-10">
        <Modal
          isOpen={isShowing}
          isHasAccept={false}
          isHasDecline={false}
          title={title}
          bodyMessage={bodyMessage}
          callBackFunction={handleModalCallBack}
        />
        <div className="flex justify-between">
          <h2 className="text-2xl mb-2">
            <CreditCardIcon className="h-6 w-6 inline-flex" /> ข้อมูลการเงินของฉัน
          </h2>
          <Link to={`${url}/payment`}>
            <button className="py-2 px-4 bg-dark-100 text-white-100 font-semibold rounded-lg shadow-md hover:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75">
              เพิ่มข้อมูลการเงิน
            </button>
          </Link>
        </div>

        <div className="mt-5">
          {data?.paymentByUserContext?.length === 0 && <p>คุณยังไม่ได้ใส่ข้อมูลการเงินในระบบ</p>}
          {data?.paymentByUserContext?.length !== 0 &&
            data?.paymentByUserContext.map((payment) => renderPayment(payment))}
        </div>
      </div>
    </>
  );
};

export default CustomerPaymentPage;
