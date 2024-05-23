import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../../Context/myContext";
import { tranasctionsInterface } from "../../../Context/myContext";
export default function TransactionDetails(props: {
  isTransactionDetailsActive: boolean;
  setIsTransactionDetailsActive: Function;
}) {
  const context = useContext(MyContext);
  const [allTransaction, setAllTransaction] = useState<null | any>(null);
  useEffect(() => {
    setAllTransaction(context?.userTransactions);
  }, [context?.userTransactions]);

  return (
    <div
      className={`bg-bgBlackTransparent w-full h-full fixed left-0 top-0 transition-all  ${
        props.isTransactionDetailsActive ? "visible" : "invisible"
      }  ${props.isTransactionDetailsActive ? "opacity-1" : "opacity-0"} `}
    >
      <div className="absolute w-[50%] h-[70%] rounded-lg  bg-cardBgBlack top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll  scrollbar-hide">
        <div className="flex items-center justify-center  bg-gray-100 absolute right-5 top-5">
          <button
            className="w-20 h-10 bg-red-600 text-white font-bold flex items-center justify-center hover:bg-red-500 transition-all"
            onClick={() => props.setIsTransactionDetailsActive(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <p className="text-center my-14 text-xl">Transaction Details</p>
        <div className="flex justify-between   mb-9">
          <div className="flex flex-col items-center w-[33%]">
            <p> Transaction</p>
            <div className=" mt-2 w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
          </div>
          <div className="flex flex-col items-center w-[33%]">
            <p> Amount</p>
            <div className=" mt-2 w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
          </div>
          <div className="flex flex-col items-center w-[33%]">
            <p> Date</p>
            <div className=" mt-2 w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
          </div>
        </div>
        {allTransaction?.map((e: tranasctionsInterface) => (
          <div className="flex justify-between mb-8  ">
            <div className="flex flex-col items-center  w-[33%]">
              <p className="capitalize"> {e.trasaction_info}</p>
            </div>
            <div className="flex flex-col items-center w-[33%]">
              <p> {e.amount}$</p>
            </div>
            <div className="flex flex-col items-center w-[33%]">
              <p> {e.date}</p>
            </div>
          </div>
        ))}
        {allTransaction?.map((e: tranasctionsInterface) => (
          <div className="flex justify-between mb-8  ">
            <div className="flex flex-col items-center  w-[33%]">
              <p className="capitalize"> {e.trasaction_info}</p>
            </div>
            <div className="flex flex-col items-center w-[33%]">
              <p> {e.amount}$</p>
            </div>
            <div className="flex flex-col items-center w-[33%]">
              <p> {e.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
