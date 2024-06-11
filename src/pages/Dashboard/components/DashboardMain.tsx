import DashboardLeftside from "./DashboardLeftside";
import DashboardMiddle from "./DashboardMiddle";

export default function DashboardMain() {
  return (
    <div className="myContainer flex py-5 gap-10 opacity-0">
      <DashboardLeftside />
      <DashboardMiddle />
    </div>
  );
}
