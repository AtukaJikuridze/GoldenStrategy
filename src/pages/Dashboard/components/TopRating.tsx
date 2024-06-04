import user from "../../../assets/user.svg";
interface topRatingInterface {
  ratingInfo: any;
}
export default function TopRating({ ratingInfo }: topRatingInterface) {
  return (
    <div className="flex gap-5  ">
      <div className="flex flex-col items-center ">
        <img src={user} alt="" width={26} className="mt-4" />
        <p className="text-sm">{ratingInfo[1]?.username}</p>
        <div className="h-full flex flex-col justify-end   ">
          <div className="bg-yellowButton w-[20px] h-[50px] rounded-t-lg  "></div>
        </div>
      </div>

      <div className="flex flex-col items-center ">
        <img src={user} alt="" width={26} />
        <p className="text-sm">{ratingInfo[0]?.username}</p>
        <div className="h-full flex flex-col justify-end  ">
          <div className="bg-yellowButton w-[20px] h-[75px] rounded-t-lg  "></div>
        </div>
      </div>
      <div className="flex flex-col items-center ">
        <img src={user} alt="" width={26} className="mt-1" />
        <p className="text-sm">{ratingInfo[2]?.username}</p>
        <div className="h-full  flex flex-col justify-end ">
          <div className="bg-yellowButton w-[20px] h-[60px] rounded-t-lg  "></div>
        </div>
      </div>
    </div>
  );
}
