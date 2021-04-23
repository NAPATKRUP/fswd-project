import React, { FC, useCallback, useState } from "react";
import { NavLink } from "react-router-dom";

import "./LoginPageStyle.css";
import { useSession } from "../../../context/SessionContext";

const Login: FC = () => {
  const { login }: any = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await login(username, password);
      } catch (err) {}
    },
    [login, password, username]
  );

  return (
    <div className="login-page flex justify-center items-center">
      <div className="login-box relative p-10">
        <form onSubmit={handleSubmit}>
          <p className="text-2xl">เข้าสู่ระบบ</p>
          <p className="text-xs mt-1">กรอกชื่อผู้ใช้งานและรหัสผ่านเพื่อเข้าใช้งาน</p>

          <div className="mt-16">
            <p className="text-md">ชื่อผู้ใช้งาน</p>
            <input
              onChange={(event) => setUsername(event.target.value)}
              className="form-input w-full bg-white-100 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-dark-200"
              type="text"
              placeholder="ชื่อผู้ใช้งาน"
            />
            <p className="mt-5 text-md">รหัสผ่าน</p>
            <input
              onChange={(event) => setPassword(event.target.value)}
              className="form-input w-full bg-white-100 px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-dark-200"
              type="password"
              placeholder="รหัสผ่าน"
            />
            <p className="text-right mt-5 text-sm">
              ยังไม่มีบัญชีหรอ ?{" "}
              <NavLink to="/register" className="text-blue-link">
                สมัครสมาชิก
              </NavLink>
            </p>
          </div>
          <div className="mt-16">
            <div className="flex justify-center items-center">
              <div>
                <button className="bg-transparent hover:border-dark-200 text-blue-700 font-semibold hover:text-white py-2 px-4 border-2  border-gold-500 hover:border-transparent rounded">
                  เข้าสู่ระบบ
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

export default Login;
