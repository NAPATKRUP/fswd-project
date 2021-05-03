import { FC } from 'react';

const BannerWrapper: FC = () => {
  return (
    <div className="h-80 grid lg:grid-cols-2 bg-dark-100 rounded-2xl">
      <div className="flex justify-center items-center">
        <img src="/logo.png" className="w-1/2" alt="logo" />
      </div>
      <div className="flex justify-center items-center">
        <p className="lg:text-2xl md:text-lg text-white-100">
          อยากเพิ่มเสน่ห์ในตัวคุณต้องนึกถึงเรา
        </p>
      </div>
    </div>
  );
};

export default BannerWrapper;
