import user from "../../../assets/user.svg";
export default function TopRating() {
  return (
    <div className="flex flex-col items-center ">
      <img src={user} alt="" width={26} />
      <p className="text-sm">Nick J.</p>
      <div className="h-full relative mt-auto  ">
        <div className="bg-yellowButton w-[20px] h-[80px] rounded-t-lg "></div>
      </div>
    </div>
  );
}
