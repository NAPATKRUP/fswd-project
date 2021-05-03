import React, { FC, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADDRESS_BY_USERCONTEXT_QUERY } from '../../../graphql/addressByUserContextQuery';
import Loading from '../../commons/loading/Loading';
import { Link, useRouteMatch } from 'react-router-dom';
import { REMOVE_ADDRESS_BY_ID_MUTATION } from '../../../graphql/removeAddressByIdMutation';
import useModal from '../../../hooks/useModal';
import Modal from '../../commons/Modal';

import { HomeIcon } from '@heroicons/react/outline';

interface IAddress {
  _id: string;
  name: string;
  addressDetail: string;
}

interface userAddressPayload {
  addressByUserContext: IAddress[];
}

const CustomerAddress: FC = () => {
  let { url } = useRouteMatch();
  const [title, setTitle] = useState<string>('');
  const [bodyMessage, setBodyMessage] = useState<string>('');
  const { isShowing, toggle } = useModal(false);

  const [removeAddress] = useMutation(REMOVE_ADDRESS_BY_ID_MUTATION);
  const { loading, data, error, refetch } = useQuery<userAddressPayload>(
    ADDRESS_BY_USERCONTEXT_QUERY
  );

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

  const handleRemoveAddress = useCallback(
    async (id) => {
      try {
        await removeAddress({ variables: { id: id } });
        handleModalMessage('ลบที่อยู่สำเร็จ', 'คุณได้ลบที่อยู่ของคุณ');
        refetch();
      } catch ({ message }) {
        handleModalMessage('ลบที่อยู่ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
      }
    },
    [handleModalMessage, refetch, removeAddress]
  );

  if (loading) return <Loading />;

  if (error) return <p>Error ...</p>;

  const renderAddress = (address) => {
    return (
      <div className="mt-2 flex justify-between" key={address._id}>
        <Modal
          isOpen={isShowing}
          isHasAccept={false}
          isHasDecline={false}
          title={title}
          bodyMessage={bodyMessage}
          callBackFunction={handleModalCallBack}
        />
        <div>
          <p className="lg:text-sm text-xs">{address?.name}</p>
          <p className="lg:text-sm text-xs">{address?.addressDetail}</p>
        </div>
        <div>
          <Link to={`${url}/address/${address?._id}`}>
            <button className="py-2 px-4 bg-dark-500 text-dark-100 font-semibold rounded-lg shadow-md hover:bg-white-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75">
              แก้ไข
            </button>
          </Link>
          <button
            onClick={() => handleRemoveAddress(address._id)}
            className="ml-2 py-2 px-4 bg-red-500 text-white-100 font-semibold rounded-lg shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75"
          >
            ลบ
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <h2 className="text-2xl mb-2">
          <HomeIcon className="h-6 w-6 inline-flex" /> ที่อยู่ของฉัน
        </h2>
        <Link to={`${url}/address`}>
          <button className="py-2 px-4 bg-dark-100 text-white-100 font-semibold rounded-lg shadow-md hover:bg-dark-200 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:ring-opacity-75">
            เพิ่มที่อยู่
          </button>
        </Link>
      </div>

      <div className="mt-5">
        {data?.addressByUserContext?.length === 0 && <p>คุณยังไม่ได้ใส่ที่อยู่ในระบบ</p>}
        {data?.addressByUserContext?.length !== 0 &&
          data?.addressByUserContext.map((address) => renderAddress(address))}
      </div>
    </div>
  );
};

export default CustomerAddress;
