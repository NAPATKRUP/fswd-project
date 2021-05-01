import { FC, lazy } from 'react';

const ErrorStatusCard = lazy(() => import('../components/ErrorStatusCard'));

const NotPermissionPage: FC = () => <ErrorStatusCard title="คุณไม่มีสิทธ์ในการเข้าใช้งานส่วนนี้" />;

export default NotPermissionPage;
