import { createContext, useState } from "react";
export const MyContext = createContext<ContextInterface | undefined>(undefined);

interface ContextInterface {}

export const MyContextProvider = ({ children }: any) => {
  return <MyContext.Provider value={{}}>{children}</MyContext.Provider>;
};
