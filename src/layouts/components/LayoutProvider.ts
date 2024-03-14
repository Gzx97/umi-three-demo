import { createContext, useContext } from "react";

interface LayoutContextValue {
  globalData?: any;
  changeGlobalData?: (data: any) => void;
  [key: string]: any;
}

const LayoutContext = createContext<LayoutContextValue>(
  {} as LayoutContextValue
);

export const LayoutContextProvider = LayoutContext.Provider;
export const useLayoutContext = (): LayoutContextValue =>
  useContext(LayoutContext);
