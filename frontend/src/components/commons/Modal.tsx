import { FC, Fragment, useCallback } from 'react';

interface IModal {
  isOpen: boolean;
  title: string;
  bodyMessage: String;
  isHasDecline?: boolean;
  isHasAccept?: boolean;
  callBackFunction?: (status: boolean) => void;
}

const Modal: FC<IModal> = ({
  isOpen,
  title,
  bodyMessage,
  isHasDecline,
  isHasAccept,
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
        } absolute inset-0 bg-dark-100 bg-opacity-30 h-screen w-full flex justify-center items-center pt-10 md:pt-0 z-10`}
        onClick={() => handleOnClick(false)}
      >
        <div className="bg-white-100 rounded-lg">
          <div className="w-96 border-t-8 border-pink-600 rounded-lg flex">
            <div className="w-full pt-9 p-4">
              <h3 className="font-bold text-pink-700">{title}</h3>
              <p className="py-4 text-sm text-gray-400">{bodyMessage}</p>
            </div>
          </div>

          {(isHasAccept || isHasDecline) && (
            <div className="p-4 flex justify-center space-x-4">
              {isHasDecline && (
                <button
                  onClick={() => handleOnClick(false)}
                  className="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm"
                >
                  ยกเลิก
                </button>
              )}
              {isHasAccept && (
                <button
                  onClick={() => handleOnClick(true)}
                  className="w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm"
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
