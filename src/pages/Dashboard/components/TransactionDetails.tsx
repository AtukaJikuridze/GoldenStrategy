import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../Context/myContext";
import { tranasctionsInterface } from "../../../Context/myContext";
import Loader from "../../../components/Loader";
import languageData_ge from "../../../assets/language_ge.json";
import languageData_en from "../../../assets/language_en.json";
export default function TransactionDetails(props: {
  isTransactionDetailsActive: boolean;
  setIsTransactionDetailsActive: Function;
}) {
const context = useContext(MyContext);
let deflanguage: any = [];
const gotLanguage = context?.defaultLanguage;
if (gotLanguage == "EN") {
  deflanguage = languageData_en;
} else {
  deflanguage = languageData_ge;
}
  const [allTransaction, setAllTransaction] = useState<null | any>(null);

  useEffect(() => {
    setAllTransaction(context?.userTransactions);
  }, [context?.userTransactions]);
  return (
    <div
      className={`bg-bgBlackTransparent w-full h-full fixed left-0 top-0 transition-all   ${
        props.isTransactionDetailsActive ? "visible" : "invisible"
      }  ${props.isTransactionDetailsActive ? "opacity-1" : "opacity-0"} `}
    >
      <div className="absolute w-[50%] h-[70%] lg:w-[90%] rounded-lg  bg-cardBgBlack top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll  scrollbar-hide">
        <div className="flex items-center justify-center  bg-gray-100 absolute right-5 top-5">
          <button
            className="w-20 h-10 bg-red-600 text-white font-bold flex items-center justify-center hover:bg-red-500 transition-all"
            onClick={() => {
              props.setIsTransactionDetailsActive(false);
              context?.setHideNavbar(false);
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <p className="text-center my-14 text-xl">
          {deflanguage.dashboard.transDetails}
        </p>
        <div className="flex justify-between   mb-9">
          <div className="flex flex-col items-center w-[33%]">
            <p> {deflanguage.dashboard.transaction}</p>
            <div className=" mt-2 w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
          </div>
          <div className="flex flex-col items-center w-[33%]">
            <p> {deflanguage.dashboard.amount}</p>
            <div className=" mt-2 w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
          </div>
          <div className="flex flex-col items-center w-[33%]">
            <p> {deflanguage.dashboard.date}</p>
            <div className=" mt-2 w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
          </div>
        </div>

        {allTransaction ? (
          allTransaction?.map((e: tranasctionsInterface, i: number) => (
            <div className="flex justify-between mb-8  " key={i}>
              <div className="flex flex-col items-center  w-[33%]">
                <p className="capitalize"> {e.transaction_info}</p>
              </div>
              <div className="flex flex-col items-center w-[33%]">
                <p> {e.amount}$</p>
              </div>
              <div className="flex flex-col items-center w-[33%]">
                <p> {e.date}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="  w-full  flex justify-center ">
            <div className="w-[225px] h-[425px] py-32">
              <Loader width={"100%"} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
