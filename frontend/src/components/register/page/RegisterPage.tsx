import React, { FC, useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSession } from '../../../context/SessionContext';
import useModal from '../../../hooks/useModal';
import Modal from '../../commons/Modal';

import './RegisterPageStyle.css';

const Register: FC = () => {
  const { register } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

  const handleModalCallBack = (status: boolean) => {
    if (!status) toggle();
  };

  const handleErrorMessage = useCallback(
    (title: string, bodyMessage: string) => {
      setTitle(title);
      setBodyMessage(bodyMessage);
      toggle();
    },
    [toggle]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (username.length < 6)
        return handleErrorMessage(
          'กรุณาใส่ชื่อผู้ใช้งาน',
          'ชื่อผู้ใช้งานต้องมีอย่างน้อย 6 ตัวอักษร'
        );

      if (password.length < 8)
        return handleErrorMessage('กรุณาใส่รหัสผ่าน', 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');

      if (displayName.length < 6)
        return handleErrorMessage(
          'กรุณาใส่ชื่อ - นามสกุล',
          'ชื่อ - นามสกุลต้องมีอย่างน้อย 6 ตัวอักษร'
        );

      try {
        await register(username, password, displayName);
      } catch ({ message }) {
        if (message === 'Username already used.')
          return handleErrorMessage('สร้างบัญชีไม่สำเร็จ', 'ชื่อผู้ใช้งานถูกใช้ไปแล้วในระบบ');

        if (message === 'Password is too weak.')
          return handleErrorMessage('กรุณาใส่รหัสผ่าน', 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
      }
    },
    [displayName, handleErrorMessage, password, register, username]
  );

  const handleUsernameChange = useCallback(async (event) => {
    setUsername(event.target.value);
  }, []);

  const handlePasswordChange = useCallback(async (event) => {
    setPassword(event.target.value);
  }, []);

  const handleDisplayNameChange = useCallback(async (event) => {
    setDisplayName(event.target.value);
  }, []);

  return (
    <div className="register-page flex justify-center items-center">
      <Modal
        isOpen={isShowing}
        isHasAccept={false}
        isHasDecline={false}
        title={title}
        bodyMessage={bodyMessage}
        callBackFunction={handleModalCallBack}
      />
      <div className="register-box p-10">
        <form onSubmit={handleSubmit}>
          <p className="text-2xl">สมัครสมาชิก</p>
          <p className="text-xs mt-1">กรอกข้อมูลเพื่อสมัครสมาชิก</p>

          <div className="mt-10">
            <p className="text-md">ชื่อผู้ใช้งาน</p>
            <input
              onChange={handleUsernameChange}
              className="form-input w-full bg-white-100 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-dark-200"
              type="text"
              placeholder="ชื่อผู้ใช้งาน"
            />
            <p className="mt-5 text-md">รหัสผ่าน</p>
            <input
              onChange={handlePasswordChange}
              className="form-input w-full bg-white-100 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-dark-200"
              type="password"
              placeholder="รหัสผ่าน"
            />
            <p className="mt-5 text-md">ชื่อ - นามสกุล</p>
            <input
              onChange={handleDisplayNameChange}
              className="form-input w-full bg-white-100 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-dark-200"
              type="text"
              placeholder="ชื่อ - นามสกุล"
            />
            <p className="text-right mt-5 text-sm">
              มีบัญชีแล้วเหรอ ?{' '}
              <NavLink to="/register" className="text-blue-link">
                เข้าสู่ระบบ
              </NavLink>
            </p>
          </div>
          <div className="mt-9">
            <div className="flex justify-center items-center">
              <div>
                <button className="bg-transparent hover:border-dark-200 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2  border-gold-500 hover:border-transparent rounded">
                  สมัครสมาชิก
                </button>
                <NavLink to="/" className="text-center text-sm mt-5 block text-blue-link">
                  กลับไปหน้าหลัก
                </NavLink>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
