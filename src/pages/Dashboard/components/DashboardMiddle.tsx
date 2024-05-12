import MiddleTopCards from "./MiddleTopCards";
import dComp4 from "../../../assets/dashboardComponent4.svg";
import dComp5 from "../../../assets/dashboardComponent5.svg";
import axios from "axios";
import { MyContext } from "../../../Context/myContext";
import { useContext } from "react";

export default function DashboardMiddle() {
  const context = useContext(MyContext);
  console.log(context?.userInfo?.data.email);

  axios
    .get("https://dull-erin-marlin-cuff.cyclic.app/api/users/transactions", {
      params: { email: context?.userInfo?.data.email },
    })
    .then((response) => {
      console.log(response.data + "asd");
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return (
    <div className="w-full">
      <MiddleTopCards />

      <div className="flex my-14 justify-between">
        <div className="bg-cardBgBlack flex justify-between pr-32 w-[70%] rounded-xl items-center">
          <img src={dComp4} alt="" />
          <h1 className="text-3xl cursor-pointer">PLAY GAME</h1>
        </div>
        <div className="flex bg-cardBgBlack  items-center rounded-xl">
          <img src={dComp5} alt="Question" width={158} />
          <p className="w-32 text-sm">History Of Questions</p>
        </div>
      </div>
      <div className=" bg-cardBgBlack p-5 rounded-xl">
        <p className="text-center mb-12 text-xl">Transaction Details</p>
        <div className="flex justify-around items-center">
          <div className="">
            <div className="flex flex-col items-center gap-3">
              <p>Transaction</p>
              <div className="border border-yellowButton w-10"></div>
            </div>
            <div className="flex items-center mt-10 flex-col gap-5">
              <p className="">Deposit</p>
              <p className="opacity-10">Deposit</p>
              <p className="opacity-10">Deposit</p>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col items-center gap-3">
              <p>Amount</p>
              <div className="border border-yellowButton w-10"></div>
            </div>
            <div className="flex items-center mt-10 flex-col gap-5">
              <p>3.47$</p>
              <p className="text-2xl cursor-pointer">Details</p>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col items-center gap-3">
              <p>Date</p>
              <div className="border border-yellowButton w-10"></div>
            </div>
            <div className="flex items-center mt-10 flex-col gap-5">
              <p className="">10.04.2023</p>
              <p className="opacity-10">10.04.2023</p>
              <p className="opacity-10">10.04.2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
