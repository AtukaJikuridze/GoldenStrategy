import { createContext, useState } from "react";
export const MyContext = createContext<ContextInterface | undefined>(undefined);

interface ContextInterface {
  userInfo: userInterface | null;
  userTransactions: tranasctionsInterface | null;
  setUserInfo: Function;
  setUserTransactions: Function;
}
interface userInterface {
  avatar: string;
  balance: number;
  balancetobecollected: number;
  coin: number;
  email: string;
  exchanging_to_money: number;
  gift_card_id: number;
  health: number;
  health_with_coin: number;
  health_with_money: number;
  help: number;
  help_with_coin: number;
  help_with_money: number;
  id: number;
  level: number;
  passverificationnumber: number | null;
  password: string;
  paydonlevel: number;
  payment_status: number;
  seenquestions: string;
  subscription: number;
  tickets: number;
  token: string;
  username: string;
  verificationnumber: number | null;
  verifyed: string;
  x1_5_coin: string;
  x1_25_coin: number;
  x2_coin: string;
  x_card_with_coin: number;
  x_card_with_money: number;
}
export interface tranasctionsInterface {
  amount: number;
  date: string;
  status: string;
  trasaction_info: string;
}

export const MyContextProvider = ({ children }: any) => {
  const [userTransactions, setUserTransactions] =
    useState<null | tranasctionsInterface>(null);
  const [userInfo, setUserInfo] = useState<null | userInterface>(null);

  return (
    <MyContext.Provider
      value={{ userInfo, setUserInfo, setUserTransactions, userTransactions }}
    >
      {children}
    </MyContext.Provider>
  );
};
