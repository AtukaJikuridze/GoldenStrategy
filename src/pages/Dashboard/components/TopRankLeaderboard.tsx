
import user from "../../../assets/user.svg";

interface userInfoInterface {
  username: string;
  coin: number;
}

export default function TopRankLeaderboard(props: {
  isRankLeaderboardActive: boolean;
  setIsRankLeaderboardActive: Function;
  leaderBoardInfo: any;
}) {
  return (
    <div
      className={`bg-bgBlackTransparent w-full h-full fixed left-0 top-0 transition-all   ${
        props.isRankLeaderboardActive ? "visible" : "invisible"
      }  ${props.isRankLeaderboardActive ? "opacity-1" : "opacity-0"} `}
    >
      <div className="absolute w-[50%] h-[70%] rounded-lg  bg-cardBgBlack top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll  scrollbar-hide">
        <div className="flex items-center justify-center  bg-gray-100 absolute right-5 top-5">
          <button
            className="w-20 h-10 bg-red-600 text-white font-bold flex items-center justify-center hover:bg-red-500 transition-all"
            onClick={() => props.setIsRankLeaderboardActive(false)}
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

        <p className="text-center my-24 text-xl "></p>
        <div className="flex justify-between   mb-9">
          <div className="flex flex-col items-center w-[33%]">
            <p> Top Ranks</p>
          </div>
          <div className="flex flex-col items-center w-[33%]">
            <p> Username</p>
            <div className=" mt-2 w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
          </div>
          <div className="flex flex-col items-center w-[33%]">
            <p> Coin</p>
            <div className=" mt-2 w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
          </div>
        </div>

        {props.leaderBoardInfo?.map((e: userInfoInterface, i: number) => (
          <div className="flex justify-between mb-8" key={i}>
            <div className="flex flex-col items-center  w-[33%]">
              <img src={user} alt="" />
            </div>
            <div className="flex flex-col items-center w-[33%]">
              <p> {e.username}1</p>
            </div>
            <div className="flex flex-col items-center w-[33%]">
              <p> {e.coin}</p>
            </div>
          </div>
        ))}

      
      </div>
    </div>
  );
}
