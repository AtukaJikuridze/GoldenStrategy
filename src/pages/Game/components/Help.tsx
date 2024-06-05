import helpBottles from "../../../assets/HelpBottles.svg";
export default function Help() {
  return (
    <div>
      <div className=" bg-cardBgBlack rounded-lg p-10 flex justify-center items-center w-[500px] h-[250px] mb-8">
        <p className="text-lg">Do you want to help ?</p>
        <img className="absolute" src={helpBottles} />
      </div>
      <div className="flex justify-between">
        <button className="text-black bg-yellowButton rounded-lg px-10 py-3 ">
          Yes
        </button>
        <button className="text-yellowButton border border-[#282828] overflow-hidden rounded-lg px-10 py-3 ">
          No
        </button>
      </div>
    </div>
  );
}