import { useMutation, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useSession } from '../../../context/SessionContext';
import { ADDRESS_BY_ID_QUERY } from '../../../graphql/addressByIdQuery';
import { UPDATE_CUSTOMER_ADDRESS_MUTATION } from '../../../graphql/updateCustomerAddressMutation';
import useModal from '../../../hooks/useModal';
import Loading from '../../commons/loading/Loading';
import Modal from '../../commons/Modal';
import Navigator from '../../commons/Navigator';

import { HomeIcon } from '@heroicons/react/outline';

interface RouteParams {
  addressId: string;
}

interface addressByIdPayload {
  addressById: {
    name: string;
    addressDetail: string;
  };
}

interface updateAddressByIdPayload {
  updateAddressById: {
    recordId: string;
  };
}

interface updateAddressByIdInput {
  id: string;
  name: string;
  addressDetail: string;
  userId: string | undefined;
}

const CustomerEditAddressPage = () => {
  const { addressId } = useParams<RouteParams>();
  const { user } = useSession();

  const [name, setName] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');

  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

  const { loading, data, error } = useQuery<addressByIdPayload>(ADDRESS_BY_ID_QUERY, {
    fetchPolicy: 'network-only',
    variables: { id: addressId },
  });

  const [updateAddress] = useMutation<updateAddressByIdPayload, updateAddressByIdInput>(
    UPDATE_CUSTOMER_ADDRESS_MUTATION
  );

  useMemo(() => {
    if (data) {
      setName(data?.addressById.name);
      setAddressDetail(data?.addressById.addressDetail);
    }
  }, [data]);

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
        await updateAddress({
          variables: { id: addressId, name, addressDetail, userId: user?._id },
        });
        handleModalMessage('แก้ไขที่อยู่สำเร็จ', 'คุณแก้ไขที่อยู่สำเร็จ');
      } catch ({ message }) {}
    },
    [addressDetail, addressId, handleModalMessage, name, updateAddress, user?._id]
  );

  const handleNameChange = useCallback(async (event) => {
    setName(event.target.value);
  }, []);

  const handleAddressDetail = useCallback(async (event) => {
    setAddressDetail(event.target.value);
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return <p>Error ...</p>;
  }

  return (
    <>
      <Navigator listOfNode={['บัญชีของฉัน', '>>', `แก้ไขที่อยู่ #${addressId}`]} />
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
          <HomeIcon className="h-6 w-6 inline-flex" /> แก้ไขที่อยู่
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
                  defaultValue={data?.addressById.name}
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
                  defaultValue={data?.addressById.addressDetail}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
                ></textarea>
              </div>

              <div className="flex gap-3 my-4">
                <input
                  type="submit"
                  className="lg:text-base text-sm py-2 px-4 bg-dark-500 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-white-200 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75"
                  value="ยืนยันแก้ไขที่อยู่"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerEditAddressPage;
