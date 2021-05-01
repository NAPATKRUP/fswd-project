import { FC, Fragment, useCallback } from 'react';
import { IModal } from './type/IModal';

const Modal: FC<IModal> = ({
  isOpen = false,
  title = '',
  bodyMessage = '',
  isHasDecline = false,
  isHasAccept = false,
  callBackFunction,
}) => {
  const handleOnClick = useCallback(
    async (value) => {
      if (callBackFunction) {
        callBackFunction(value);
      }
    },
    [callBackFunction]
  );

  return (
    <Fragment>
      <div
        id="modal_overlay"
        className={`${
          isOpen ? '' : 'hidden'
        } absolute inset-0 bg-dark-100 bg-opacity-70 h-screen w-full flex justify-center items-center pt-10 md:pt-0 z-10`}
        onClick={() => handleOnClick(false)}
      >
        <div className="bg-white-100 rounded-lg">
          <div className="w-96 border-t-8 border-gold-100 rounded-lg flex">
            <div className="w-full pt-9 p-4">
              <p className="font-semibold text-dark-100">{title}</p>
              <div
                className="py-4 text-sm text-gray-400"
                dangerouslySetInnerHTML={{ __html: bodyMessage }}
              />
            </div>
          </div>

          {(isHasAccept || isHasDecline) && (
            <div className="p-4 flex justify-center space-x-4">
              {isHasDecline && (
                <button
                  onClick={() => handleOnClick(false)}
                  className="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-semibold rounded-lg text-sm"
                >
                  ยกเลิก
                </button>
              )}
              {isHasAccept && (
                <button
                  onClick={() => handleOnClick(true)}
                  className="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-semibold rounded-lg text-sm"
                >
                  ยืนยัน
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Modal;
