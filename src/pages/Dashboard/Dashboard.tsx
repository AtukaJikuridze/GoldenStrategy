import { useContext, useEffect } from "react";
import DashboardMain from "./components/DashboardMain";
import axios from "axios";
import { MyContext } from "../../Context/myContext";
import { API } from "../../baseAPI";

export default function Dashboard() {
  const context = useContext(MyContext);

  return (
    <>
      <DashboardMain />
    </>
  );
}
