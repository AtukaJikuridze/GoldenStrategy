import MiddleTopCards from "./MiddleTopCards";
import dComp4 from "../../../assets/dashboardComponent4.svg";
import dComp5 from "../../../assets/dashboardComponent5.svg";
import { MyContext } from "../../../Context/myContext";
import { useContext, useEffect, useState } from "react";
import TransactionDetails from "./TransactionDetails";
import TopRankLeaderboard from "./TopRankLeaderboard";
import axios from "axios";
import { API } from "../../../baseAPI";
import { Link } from "react-router-dom";
import languageData_ge from "../../../assets/language_ge.json";
import languageData_en from "../../../assets/language_en.json";

export default function DashboardMiddle() {
    const context = useContext(MyContext);
   let deflanguage: any = [];
   const gotLanguage = context?.defaultLanguage;
   if (gotLanguage == "EN") {
     deflanguage = languageData_en;
   } else {
     deflanguage = languageData_ge;
   }
 

  useEffect(() => {
    axios.get(`${API}/results`).then((res) => {
      setLeaderboardInfo(res.data);
    });
  }, []);

  useEffect(() => {
    setLastTransactions(context?.userTransactions);
  }, [context?.userTransactions]);

  const [lastTransactions, setLastTransactions] = useState<null | any>(null); // transaction info modis aq
  const [leaderboardInfo, setLeaderboardInfo] = useState<[] | null>(null); // top ranks info modis aq

  const [isRankLeaderboardActive, setIsRankLeaderboardActive] =
    useState<boolean>(false); // top ranks details ro daacher da popup gamodis tu true aris gamochndeba tuarada ara
  console.log(lastTransactions);

  const [isTransactionDetailsActive, setIsTransactionDetailsActive] =
    useState(false); // tranzaqciebis details ro daacher da popup gamodis tu true aris gamochndeba tuarada ara
  return (
    <div className="w-full ">
      <MiddleTopCards
        setIsRankLeaderboardActive={setIsRankLeaderboardActive}
        leaderBoardInfo={leaderboardInfo}
      />
      <TopRankLeaderboard
        isRankLeaderboardActive={isRankLeaderboardActive}
        setIsRankLeaderboardActive={setIsRankLeaderboardActive}
        leaderBoardInfo={leaderboardInfo}
      />

      <div className="flex my-14 justify-between sm:flex-col sm:gap-10">
        <div className="bg-cardBgBlack flex justify-between pr-32 w-[70%] rounded-xl items-center 3xl:pr-12 3xl:w-[65%] 2xl:!w-full 2xl:mr-5 lg:flex-col lg:gap-10 lg:pb-10 lg:!px-4 ">
          <img src={dComp4} alt="" />
          <Link to={"/GoldenStrategy/Game"}>
            {" "}
            <h1 className="text-3xl cursor-pointer">
              {deflanguage.dashboard.play}
            </h1>
          </Link>
        </div>
        <div className="flex bg-cardBgBlack  items-center rounded-xl 2xl:flex-col 2xl:justify-center 2xl:text-center 2xl:pb-4">
          <img src={dComp5} alt="Question" width={158} />
          <p className="w-32 text-sm">{deflanguage.dashboard.questionsHis}</p>
        </div>
      </div>
      <div className=" bg-cardBgBlack p-5 rounded-xl">
        <p className="text-center mb-12 text-xl">
          {deflanguage.dashboard.transDetails}
        </p>
        <div className="flex justify-around items-top  ">
          <div className="">
            <div className="flex flex-col items-center gap-3">
              <p className="md:text-[10px]">
                {deflanguage.dashboard.transaction}
              </p>
              <div className="border border-yellowButton w-10"></div>
            </div>
            <div className="flex items-center mt-10 flex-col gap-5 md:text-[12px]">
              <p className=" capitalize md:truncate md:w-[40px]">
                {/* {lastTransactions ? lastTransactions[0].trasaction_info : ""} */}
              </p>
              <p className="opacity-10 capitalize md:truncate md:w-[40px]">
                {/* {lastTransactions ? lastTransactions[1].trasaction_info : ""} */}
              </p>
              <p className="opacity-10 capitalize md:truncate md:w-[40px]">
                {/* {lastTransactions ? lastTransactions[2].trasaction_info : ""} */}
              </p>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col items-center gap-3 md:text-[12px] ">
              <p>{deflanguage.dashboard.amount}</p>
              <div className="border border-yellowButton w-10"></div>
            </div>
            <div className="flex items-center my-8 flex-col gap-5 md:text-[12px]">
              {/* <p>{lastTransactions ? lastTransactions[2].amount : ""}$</p> */}
              <p
                className="text-2xl cursor-pointer md:text-sm"
                onClick={() => {
                  setIsTransactionDetailsActive(true);
                  context?.setHideNavbar(true);
                }}
              >
                {deflanguage.dashboard.details}
              </p>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col items-center gap-3 md:text-[12px]">
              <p>{deflanguage.dashboard.date}</p>
              <div className="border border-yellowButton w-10"></div>
            </div>
            <div className="flex items-center mt-10 flex-col gap-5 md:text-[12px]">
              <p className=" md:truncate md:w-[40px]">
                {/* {lastTransactions[0] ? lastTransactions[0].date : ""} */}
              </p>
              <p className="opacity-10 md:truncate md:w-[40px] ">
                {/* {lastTransactions[1] ? lastTransactions[1].date : ""} */}
              </p>
              <p className="opacity-10 md:truncate md:w-[40px] ">
                {/* {lastTransactions[2] ? lastTransactions[2].date : ""} */}
              </p>
            </div>
          </div>
        </div>
        <TransactionDetails
          isTransactionDetailsActive={isTransactionDetailsActive}
          setIsTransactionDetailsActive={setIsTransactionDetailsActive}
        />
      </div>
    </div>
  );
}
