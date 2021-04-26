import { useState } from "react";

const useModal = (initialValue: boolean) => {
  const [isShowing, setShowing] = useState(initialValue);

  const toggle = () => {
    setShowing(!isShowing);
  };

  return {
    isShowing,
    toggle,
  };
};

export default useModal;
