import { useContext, useEffect } from "react";
import DashboardMain from "./components/DashboardMain";
import DashboardNavbar from "./components/DashboardNavbar";
import axios from "axios";
import { MyContext } from "../../Context/myContext";
import { API } from "../../baseAPI";

export default function Dashboard() {
  const context = useContext(MyContext);
  useEffect(() => {
    axios
      .get(
        `${API}/users/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF0dWthIiwiaWF0IjoxNzE1NTA4OTMyfQ.yPtYnWR4y493Eh6i73MAWUTn4wd6keVAvO9jFyfRbSA`
      )
      .then((res) => {
        context?.setUserInfo(res.data.userData[0]);

        context?.setUserTransactions(res.data.transactions);
        console.log(res.data.transactions);
      });
  }, []);
  return (
    <>
      <DashboardNavbar />
      <DashboardMain />
    </>
  );
}
