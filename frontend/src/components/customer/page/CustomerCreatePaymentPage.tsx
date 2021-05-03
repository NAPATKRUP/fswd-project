import { useMutation } from '@apollo/client';
import { CreditCardIcon } from '@heroicons/react/outline';
import { FC, useCallback, useState } from 'react';
import { useSession } from '../../../context/SessionContext';
import { CREATE_CUSTOMER_PAYMENT_MUTATION } from '../../../graphql/createCustomerPaymentMutaion';
import useModal from '../../../hooks/useModal';
import Modal from '../../commons/Modal';
import Navigator from '../../commons/Navigator';

interface createAddressInput {
  name: string;
  fullName: string;
  cardNumber: string;
  userId: string | undefined;
}

interface createAddressPayload {
  createPayment: {
    recordId: string;
  };
}

const CustomerCreatePaymentPage: FC = () => {
  const { user } = useSession();
  const [name, setName] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

  const [createPayment] = useMutation<createAddressPayload, createAddressInput>(
    CREATE_CUSTOMER_PAYMENT_MUTATION
  );

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

  const handleSubmitForm = useCallback(
    async (event) => {
      event.preventDefault();

      if (name.length < 5)
        return handleModalMessage('กรุณาใส่ชื่อที่แสดง', 'ชื่อที่แสดงต้องมีอย่างน้อย 5 ตัวอักษร');

      if (fullName.length < 5)
        return handleModalMessage('กรุณาใส่ชื่อเต็ม', 'ชื่อเต็มต้องมีอย่างน้อย 5 ตัวอักษร');

      if (cardNumber.length < 5)
        return handleModalMessage('กรุณาใส่เลขบัตร', 'เลขบัตรต้องมีอย่างน้อย 5 ตัวอักษร');

      try {
        await createPayment({ variables: { name, fullName, cardNumber, userId: user?._id } });
        handleModalMessage('เพิ่มข้อมูลการเงินสำเร็จ', 'คุณเพิ่มข้อมูลการเงินใหม่สำเร็จ');
      } catch ({ message }) {
        handleModalMessage('เพิ่มข้อมูลการเงินใหม่ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
      }
    },
    [cardNumber, createPayment, fullName, handleModalMessage, name, user?._id]
  );

  const handleNameChange = useCallback(async (event) => {
    setName(event.target.value);
  }, []);

  const handleFullNameChange = useCallback(async (event) => {
    setFullName(event.target.value);
  }, []);

  const handleCardNumberChange = useCallback(async (event) => {
    setCardNumber(event.target.value);
  }, []);

  return (
    <>
      <Navigator listOfNode={['บัญชีของฉัน', '>>', 'เพิ่มข้อมูลการเงิน']} />
      <Modal
        isOpen={isShowing}
        isHasAccept={false}
        isHasDecline={false}
        title={title}
        bodyMessage={bodyMessage}
        callBackFunction={handleModalCallBack}
      />
      <div className="lg:px-20 md:px-10 px-4 mt-12">
        <h2 className="text-2xl mb-2">
          <CreditCardIcon className="h-6 w-6 inline-flex" /> เพิ่มข้อมูลการเงินใหม่
        </h2>

        <form onSubmit={handleSubmitForm}>
          <div className="grid grid-cols-6 gap-6 my-3">
            <div className="col-span-6 lg:col-span-3">
              <div className="my-2">
                <label htmlFor="name" className="block text-md font-medium text-dark-200">
                  ชื่อที่แสดง *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleNameChange}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
                />
              </div>

              <div className="my-2">
                <label htmlFor="full_name" className="block text-md font-medium text-dark-200">
                  ชื่อเต็ม *
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  onChange={handleFullNameChange}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
                />
              </div>

              <div className="my-2">
                <label htmlFor="card_number" className="block text-md font-medium text-dark-200">
                  เลขบัตร *
                </label>
                <input
                  type="text"
                  name="card_number"
                  id="card_number"
                  onChange={handleCardNumberChange}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
                />
              </div>

              <div className="flex gap-3 my-4">
                <input
                  type="submit"
                  className="cursor-pointer lg:text-base text-sm py-2 px-4 bg-dark-100 text-white-100 font-semibold rounded-lg shadow-md hover:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75"
                  value="เพิ่มข้อมูลการเงิน"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerCreatePaymentPage;
