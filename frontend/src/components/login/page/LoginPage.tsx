import React, { FC, useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './LoginPageStyle.css';
import { useSession } from '../../../context/SessionContext';
import useModal from '../../../hooks/useModal';

const Modal = React.lazy(() => import('../../commons/Modal'));

const Login: FC = () => {
  const { login } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [bodyMessage, setBodyMessage] = useState('');
  const { isShowing, toggle } = useModal(false);

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

      if (username.length <= 5)
        return handleErrorMessage(
          'กรุณาใส่ชื่อผู้ใช้งาน',
          'ชื่อผู้ใช้งานต้องมีอย่างน้อย 6 ตัวอักษร'
        );

      if (password.length <= 7)
        return handleErrorMessage('กรุณาใส่รหัสผ่าน', 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');

      try {
        await login(username, password);
      } catch ({ message }) {
        if (message === 'Username not found')
          return handleErrorMessage('เข้าสู่ระบบไม่สำเร็จ', 'ไม่พบบัญชีในระบบ');

        if (message === 'Incorrect password')
          return handleErrorMessage('เข้าสู่ระบบไม่สำเร็จ', 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
      }
    },
    [handleErrorMessage, login, password, username]
  );

  const handleCallBack = (stats: boolean) => {
    if (!stats) toggle();
  };

  const handleUsernameChange = useCallback(async (event) => {
    setUsername(event.target.value);
  }, []);

  const handlePasswordChange = useCallback(async (event) => {
    setPassword(event.target.value);
  }, []);

  return (
    <div>
      <Modal
        isOpen={isShowing}
        isHasAccept={false}
        isHasDecline={false}
        title={title}
        bodyMessage={bodyMessage}
        callBackFunction={handleCallBack}
      />
      <div className="login-page bg-dark-100 flex justify-center items-center">
        <div className="login-box relative p-10">
          <form onSubmit={handleSubmit}>
            <p className="text-2xl">เข้าสู่ระบบ</p>
            <p className="text-sm mt-1">กรอกชื่อผู้ใช้งานและรหัสผ่านเพื่อเข้าใช้งาน</p>

            <div className="mt-16">
              <p>ชื่อผู้ใช้งาน</p>
              <input
                onChange={handleUsernameChange}
                className="form-input w-full bg-white-100 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-dark-200"
                type="text"
                placeholder="ชื่อผู้ใช้งาน"
              />
              <p className="mt-5">รหัสผ่าน</p>
              <input
                onChange={handlePasswordChange}
                className="form-input w-full bg-white-100 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-dark-200"
                type="password"
                placeholder="รหัสผ่าน"
              />
              <p className="text-sm text-right mt-5">
                ยังไม่มีบัญชีหรอ ?{' '}
                <NavLink to="/register" className="text-blue-link">
                  สมัครสมาชิก
                </NavLink>
              </p>
            </div>
            <div className="mt-16">
              <div className="flex justify-center items-center">
                <div>
                  <button className="text-blue-700 font-semibold bg-transparent hover:border-dark-200 hover:text-white py-2 px-4 border-2 border-gold-500 hover:border-transparent rounded">
                    เข้าสู่ระบบ
                  </button>
                  <NavLink to="/" className="text-sm text-center mt-5 block text-blue-link">
                    กลับไปหน้าหลัก
                  </NavLink>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
