import { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface ErrorStatusCardProps {
  title: string;
}

const ErrorStatusCard: FC<ErrorStatusCardProps> = ({ title }: ErrorStatusCardProps) => (
  <div className="flex flex-col justify-center items-center bg-dark-100 text-white-100 h-screen w-screen">
    <img src="/logo.png" alt="logo" />
    <p className="lg:text-3xl md:xl my-8">{title}</p>
    <NavLink to="/" className="text-lg hover:text-gold-200">
      {'>> '}หน้าหลัก{' <<'}
    </NavLink>
  </div>
);

export default ErrorStatusCard;
