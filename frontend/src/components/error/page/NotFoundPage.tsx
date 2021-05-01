import { FC, lazy } from 'react';

const ErrorStatusCard = lazy(() => import('../components/ErrorStatusCard'));

const NotFoundPage: FC = () => <ErrorStatusCard title="ไม่พบเนื้อหา" />;

export default NotFoundPage;
