import { useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { useSession } from '../../../context/SessionContext';
import { CREATE_CUSTOMER_ADDRESS } from '../../../graphql/createCustomerAddress';
import useModal from '../../../hooks/useModal';
import Modal from '../../commons/Modal';
import Navigator from '../../commons/Navigator';

import { HomeIcon } from '@heroicons/react/outline';

interface createAddressInput {
  name: string;
  addressDetail: string;
  userId: string | undefined;
}

interface createAddressPayload {
  createAddress: {
    recordId: string;
  };
}

const CreateAddressPage = () => {
  const { user } = useSession();
  const [name, setName] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

  const [createAddress] = useMutation<createAddressPayload, createAddressInput>(
    CREATE_CUSTOMER_ADDRESS
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

      if (addressDetail.length < 5)
        return handleModalMessage('กรุณาใส่ชื่อที่อยู่', 'ชื่ออยู่แสดงต้องมีอย่างน้อย 5 ตัวอักษร');

      try {
        const result = await createAddress({
          variables: { name, addressDetail, userId: user?._id },
        });
        if (result?.data?.createAddress)
          handleModalMessage('เพิ่มที่อยู่ใหม่สำเร็จ', 'คุณเพิ่มที่อยู่ใหม่สำเร็จ');
      } catch (error) {
        handleModalMessage('เพิ่มที่อยู่ใหม่ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
      }
    },
    [addressDetail, createAddress, handleModalMessage, name, user?._id]
  );

  const handleNameChange = useCallback(async (event) => {
    setName(event.target.value);
  }, []);

  const handleAddressDetail = useCallback(async (event) => {
    setAddressDetail(event.target.value);
  }, []);

  return (
    <>
      <Navigator listOfNode={['บัญชีของฉัน', '>>', 'เพิ่มที่อยู่ใหม่']} />
      <div className="lg:px-20 md:px-10 px-4 mt-12">
        <Modal
          isOpen={isShowing}
          isHasAccept={false}
          isHasDecline={false}
          title={title}
          bodyMessage={bodyMessage}
          callBackFunction={handleModalCallBack}
        />
        <h2 className="text-2xl mb-2">
          <HomeIcon className="h-6 w-6 inline-flex" /> เพิ่มที่อยู่ใหม่
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
                <label htmlFor="address_detail" className="block text-md font-medium text-dark-200">
                  ที่อยู่ *
                </label>
                <textarea
                  name="address_detail"
                  id="address_detail"
                  onChange={handleAddressDetail}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
                ></textarea>
              </div>

              <div className="flex gap-3 my-4">
                <input
                  type="submit"
                  className="cursor-pointer lg:text-base text-sm py-2 px-4 bg-dark-100 text-white-100 font-semibold rounded-lg shadow-md hover:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75"
                  value="เพิ่มที่อยู่"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAddressPage;
