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
    <div className="flex w-full justify-between 2xl:flex-col  ">
      <div className="flex gap-5 w-[70%]   justify-between 4xl:w-[76%] 2xl:!w-full md:flex-col md:order-2    ">
        <div className="flex items-center justify-between p-5 bg-cardBgBlack gap-5 4xl:w-[70%] 4xl:justify-around 2xl:!w-[100%] sm:flex-col sm:gap-12">
          <img src={creditCard} alt="" className="w-[200px]" />
          <div className="text-center px-5">
            <div className="flex justify-center items-center gap-3">
              <p>Total Balance:</p>
              <p className="text-sm">{context?.userInfo?.balance}$</p>
            </div>
            <div className="flex justify-center items-center gap-3">
              <p>Aviable Coins:</p>
              <p className="text-sm my-5 ">{context?.userInfo?.coin}</p>
            </div>
            <div className="flex gap-5 3xl:flex-col">
              <button className="text-black text-sm bg-yellowButton py-2 rounded-lg w-[150px] text-center">
                Deposit
              </button>
              <button className="text-sm border border-yellowButton py-2 rounded-lg w-[150px] text-center">
                Withdraw
              </button>
            </div>
          </div>
        </div>
        <div className="relative md:flex md:justify-center lg:hidden    ">
          <img
            src={dComp3}
            alt=""
            className="4xl:h-full 4xl:object-cover md:!min-w-[80%] md:!h-[300px]   "
          />
          <div className="bg-yellowButton md:w-[20%]  text-center p-2 rounded-md absolute  left-1/2 transform -translate-x-1/2 bottom-5   ">
            <p className="text-black text-sm">
              Tickets {context?.userInfo?.tickets}
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-cardBgBlack pt-5  rounded-lg flex flex-col justify-between 4xl:w-[20%] 3xl:px-2  2xl:mt-10 2xl:!w-full  md:order-1 md:mb-10">
        <div
          className="flex gap-3 justify-center cursor-pointer 3xl:gap-1 lg:mb-10 3xl:mb-4 "
          onClick={() => {
            props.setIsRankLeaderboardActive(true);
            context?.setHideNavbar(true);
          }}
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
