import React, { FC, lazy } from 'react';

const ErrorStatusCard = lazy(() => import('../components/ErrorStatusCard'));

const NeedAuthenticationPage: FC = () => (
  <ErrorStatusCard title="คุณต้องเข้าสู่ระบบก่อนถึงจะเข้าถึงเนื้อหาส่วนนี้ได้" />
);

export default NeedAuthenticationPage;
