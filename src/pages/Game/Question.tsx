import timer from "../../assets/timer.svg";
export default function Question() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex  relative gap-2 items-center justify-center   ">
        <img src={timer} alt="" />
        <p>0:50</p>
      </div>
      <div className="w-[500px] max-w-full h-[250px] bg-cardBgBlack flex justify-center items-center p-6 overflow-y-scroll scrollbar-hide rounded-md">
        <p className="overflow-hidden text-ellipsis break-words text-center">
          Which planet is known as the Red Planet?
        </p>
      </div>
      <div className="flex flex-wrap gap-y-4 gap-x-[2%] ">
        <div className="w-[49%] flex justify-center">
          <div className="cursor-pointer rounded-sm py-3 overflow-hidden text-ellipsis break-words text-center w-[80%] bg-cardBgBlack flex justify-center">
            <p className="text-sm">1. Earth</p>
          </div>
        </div>
        <div className="w-[49%] flex justify-center">
          <div className="cursor-pointer rounded-sm py-3 overflow-hidden text-ellipsis break-words text-center w-[80%] bg-cardBgBlack flex justify-center">
            <p className="text-sm">1. Earth</p>
          </div>
        </div>
        <div className="w-[49%] flex justify-center">
          <div className="cursor-pointer rounded-sm py-3 overflow-hidden text-ellipsis break-words text-center w-[80%] bg-cardBgBlack flex justify-center">
            <p className="text-sm">1. Earth</p>
          </div>
        </div>
        <div className="w-[49%] flex justify-center">
          <div className="cursor-pointer rounded-sm py-3 overflow-hidden text-ellipsis break-words text-center w-[80%] bg-cardBgBlack flex justify-center">
            <p className="text-sm">1. Earth</p>
          </div>
        </div>
      </div>
    </div>
  );
}
