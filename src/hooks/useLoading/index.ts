import { useBoolean } from "ahooks";
import { useRef } from "react";

const useLoading = (defaultValue = false, delay = 0) => {
  const [boolean, { setTrue, setFalse }] = useBoolean(true);
  const timer = useRef<number>(0);
  const openLoading = () => {
    setTrue();
    timer.current = new Date().getTime();
  };
  const closeLoading = () => {
    const now = new Date().getTime();
    const diff = now - timer.current;
    if (diff < delay) return setTimeout(setFalse, delay - diff);
    return setFalse();
  };

  return {
    loading: boolean,
    openLoading,
    closeLoading,
  };
};
export default useLoading;
