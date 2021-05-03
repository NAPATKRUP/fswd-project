import { FC } from 'react';
import './Loading.css';

interface LoadingProps {
  isFullscreen?: boolean;
}

const Loading: FC<LoadingProps> = ({ isFullscreen = true }: LoadingProps) => {
  return (
    <div
      className={
        isFullscreen
          ? 'h-screen w-full flex flex-col items-center justify-center'
          : 'h-full w-full flex flex-col items-center justify-center'
      }
    >
      <div className="m-auto">
        <div className="loading">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="text-2xl">Loading . . .</div>
      </div>
    </div>
  );
};

export default Loading;
