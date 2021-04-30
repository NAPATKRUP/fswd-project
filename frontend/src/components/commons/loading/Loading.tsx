import { FC } from 'react';
import './Loading.css';

const Loading: FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="text-2xl">Loading . . .</div>
    </div>
  );
};

export default Loading;
