import { useMutation } from '@apollo/client';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useSession } from '../../../context/SessionContext';
import { UPDATE_USER_MUTATION } from '../../../graphql/updateUserMutation';
import useModal from '../../../hooks/useModal';
import Loading from '../../commons/loading/Loading';
import Modal from '../../commons/Modal';

interface updateUserInput {
  displayName: string;
  password: string;
}

interface updateUserPayload {
  updateUser: {
    status: string;
  };
}

const CustomerInfo: FC = () => {
  const { loading, user } = useSession();
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [bodyMessage, setBodyMessage] = useState<string>('');
  const { isShowing, toggle } = useModal(false);
  const [updateUser] = useMutation<updateUserPayload, updateUserInput>(UPDATE_USER_MUTATION);

  useMemo(() => {
    if (user) {
      setDisplayName(user.displayName);
    }
  }, [user]);

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

  const handleUpdateUser = useCallback(async () => {
    try {
      const result = await updateUser({ variables: { displayName, password } });
      if (result?.data?.updateUser?.status === 'Success')
        handleModalMessage('แก้ไขข้อมูลส่วนตัวสำเร็จ', 'ข้อมูลส่วนตัวของคุณได้รับการแก้ไขแล้ว');
    } catch ({ message }) {
      if (message === 'Same password')
        handleModalMessage('แก้ไขข้อมูลส่วนตัวไม่สำเร็จ', 'คุณใส่รหัสผ่านเก่า');
    } finally {
      setPassword('');
      setConfirmPassword('');
    }
  }, [displayName, handleModalMessage, password, updateUser]);

  const handleSubmitForm = useCallback(
    async (event) => {
      event.preventDefault();

      if (displayName.length < 6)
        return handleModalMessage(
          'กรุณาใส่ชื่อ - นามสกุล',
          'ชื่อ - นามสกุลต้องมีอย่างน้อย 6 ตัวอักษร'
        );

      if (password.length < 8 || confirmPassword.length < 8)
        return handleModalMessage(
          'กรุณาใส่รหัสผ่านให้ถูกต้อง',
          'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'
        );

      if (password !== confirmPassword)
        return handleModalMessage('รหัสผ่านไม่ตรงกัน', 'กรุณากรอกรหัสผ่านให้ตรงกัน');

      return handleUpdateUser();
    },
    [confirmPassword, displayName.length, handleModalMessage, handleUpdateUser, password]
  );

  const handleDisplayNameChange = useCallback(async (event) => {
    setDisplayName(event.target.value);
  }, []);

  const handlePasswordChange = useCallback(async (event) => {
    setPassword(event.target.value);
  }, []);

  const handleConfirmPasswordChange = useCallback(async (event) => {
    setConfirmPassword(event.target.value);
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <Modal
        isOpen={isShowing}
        isHasAccept={false}
        isHasDecline={false}
        title={title}
        bodyMessage={bodyMessage}
        callBackFunction={handleModalCallBack}
      />
      <div className="mt-5">
        <p>ข้อมูลของฉัน</p>
        <p className="text-gold-200">จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>

        <form onSubmit={handleSubmitForm}>
          <div className="grid grid-cols-6 gap-6 my-3">
            <div className="col-span-6 lg:col-span-3">
              <div className="my-2">
                <label htmlFor="display_name" className="block text-md font-medium text-dark-200">
                  ชื่อ - นามสกุล *
                </label>
                <input
                  type="text"
                  name="display_name"
                  id="display_name"
                  defaultValue={user?.displayName}
                  onChange={handleDisplayNameChange}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
                />
              </div>

              <div className="my-2">
                <label htmlFor="password" className="block text-md font-medium text-dark-200">
                  รหัสผ่าน *
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
                />
              </div>

              <div className="my-2">
                <label htmlFor="password_2" className="block text-md font-medium text-dark-200">
                  ยืนยันรหัสผ่าน *
                </label>
                <input
                  type="password"
                  name="password_2"
                  id="password_2"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="form-input rounded-md mt-1 px-2 py-2 sm:w-full md:w-1/2 lg:w-3/4 shadow-sm sm:text-sm"
                />
              </div>

              <div className="flex gap-3 my-4">
                <input
                  type="submit"
                  className="py-2 px-4 bg-gold-200 text-white font-semibold rounded-lg shadow-md hover:bg-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-opacity-75"
                  value="ยืนยันการแก้ไขข้อมูลส่วนตัว"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerInfo;
