import { useContext, useEffect } from "react";
import DashboardMain from "./components/DashboardMain";
import axios from "axios";
import { MyContext } from "../../Context/myContext";
import { API } from "../../baseAPI";

export default function Dashboard() {
  const context = useContext(MyContext);
  

  useEffect(() => {
    axios

      .get(
        `${API}/users/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF2dG8iLCJpYXQiOjE3MTc1ODkyNDN9.83_DYZ6ddxQxT0Fsow9TvlALGsH1yGsRZE_CSpmno9U`
      )
      .then((res) => {
        context?.setUserInfo(res.data.userData);
        context?.setUserTransactions(res.data.transactions);
      });
  }, []);
  return (
    <>
      <DashboardMain />
    </>
  );
}
