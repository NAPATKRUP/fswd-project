import { FC, lazy } from 'react';

const ErrorStatusCard = lazy(() => import('../components/ErrorStatusCard'));

const ErrorPage: FC = () => <ErrorStatusCard title="เกิดข้อผิดพลาด" />;

export default ErrorPage;
