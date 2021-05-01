import { useState } from 'react';
import Modal from '../components/commons/Modal';
import { IModal } from '../components/commons/type/IModal';

const useModal = ({
  isOpen = false,
  isHasAccept = false,
  isHasDecline = false,
  title = '',
  bodyMessage = '',
  callBackFunction = (status: boolean) => {},
}: IModal) => {
  const [modal, setModal] = useState<IModal>({
    isOpen,
    isHasAccept,
    isHasDecline,
    title,
    bodyMessage,
    callBackFunction,
  });

  const toggle = () => {
    setModal({
      ...modal,
      isOpen: !modal.isOpen,
    });
  };

  const updateModal = (data: IModal) => {
    setModal({
      ...modal,
      ...data,
    });
  };

  const updateModalAndToggle = (data: IModal) => {
    setModal({
      ...modal,
      ...data,
      isOpen: !modal.isOpen,
    });
  };

  const ModalElement = () => {
    return (
      <Modal
        {...modal}
        callBackFunction={(status: boolean) => {
          if (modal?.callBackFunction) modal.callBackFunction(status);
          toggle();
        }}
      />
    );
  };

  return {
    toggle,
    updateModal,
    updateModalAndToggle,
    ModalElement,
  };
};

export default useModal;
