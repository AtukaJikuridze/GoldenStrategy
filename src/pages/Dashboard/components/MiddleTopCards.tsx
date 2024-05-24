import dComp3 from "../../../assets/dashboardComponent3.svg";
import creditCard from "../../../assets/creditCard1.svg";
import topRanks from "../../../assets/topRanksIcon.svg";
import TopRating from "./TopRating";
import { useContext } from "react";
import { MyContext } from "../../../Context/myContext";
import Loader from "../../../components/Loader";
export default function MiddleTopCards(props: {
  setIsRankLeaderboardActive: Function;
  leaderBoardInfo: any;
}) {
  const context = useContext(MyContext);

  return (
    <div className="flex w-full justify-between ">
      <div className="flex gap-5 w-[70%]  justify-between">
        <div className="flex items-center justify-between p-5 bg-cardBgBlack gap-5">
          <img src={creditCard} alt="" className="w-[200px]" />
          <div className="text-center px-5">
            <p>Total Balance</p>
            <p className="text-sm my-5">{context?.userInfo?.balance}$</p>
            <div className="flex gap-5">
              <button className="text-black text-sm bg-yellowButton py-2 rounded-lg w-[150px] text-center">
                Deposit
              </button>
              <button className="text-sm border border-yellowButton py-2 rounded-lg w-[150px] text-center">
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src={dComp3} alt="" />
          <div className="bg-yellowButton w-[70%] text-center p-2 rounded-md absolute  left-1/2 transform -translate-x-1/2 bottom-5  ">
            <p className="text-black text-sm">
              Tickets {context?.userInfo?.tickets}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-cardBgBlack pt-5 px-14 rounded-lg flex flex-col justify-between">
        <div
          className="flex gap-3 justify-center cursor-pointer"
          onClick={() => props.setIsRankLeaderboardActive(true)}
        >
          <p>Top Ranks</p>
          <img src={topRanks} alt="" />
        </div>

        {props.leaderBoardInfo ? (
          <TopRating ratingInfo={props.leaderBoardInfo} />
        ) : (
          <div className="h-full flex items-center justify-center px-14">
            <Loader width={"60px"} />
          </div>
        )}
      </div>
    </div>
  );
}
