import { createContext, useContext } from "react";

interface HouseContextValue {
  globalData?: any;
  changeGlobalData?: (data: any) => void;
  [key: string]: any;
}

const HouseContext = createContext<HouseContextValue>({} as HouseContextValue);

export const HouseContextProvider = HouseContext.Provider;
export const useLayoutContext = (): HouseContextValue =>
  useContext(HouseContext);
