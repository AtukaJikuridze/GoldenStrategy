import dComp1 from "../../../assets/dashboardComponent1.svg";
import dComp2 from "../../../assets/dashboardComponent2.svg";

export default function DashboardLeftside() {
  return (
    <div className="flex flex-col gap-32">
      <div className="bg-cardBgBlack flex flex-col items-center py-5 rounded-lg">
        <p>Plan</p>
        <img src={dComp1} alt="" />
        <p>COMING SOON...</p>
      </div>

      <div className="relative">
        <img src={dComp2} alt="" />
        <div className="bg-yellowButton w-[250px] text-center p-2 rounded-md absolute  left-1/2 transform -translate-x-1/2 bottom-5  ">
          <p className="text-black">Time left 00:32:34</p>
        </div>
      </div>
    </div>
  );
}
