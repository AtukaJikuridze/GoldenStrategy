import axios from "axios";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Navbar from "./components/Navbar";
import Game from "./pages/Game/Game";
import Shop from "./pages/Shop/Shop";
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { MyContext } from "./Context/myContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./baseAPI";

function App() {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  useEffect(() => {
    axios.get(`${API}/users/${localStorage.getItem("Token")}`).then((res) => {
      context?.setUserInfo(res.data.userData[0]);
      context?.setUserTransactions(res.data.transactions);
      console.log(res.data.userData[0]);
    });
  }, []);
  useEffect(() => {
    console.log(context?.isLoggined);
    if (!context?.isLoggined) {
      navigate("/GoldenStrategy/Login");
    }
  }, [context?.isLoggined]);

  return (
    <div className="App lg:pt-32">
      {context?.isLoggined ? <Navbar /> : ""}
      {/* <Shop /> */}
      {/* <Game /> */}

      <Routes>
        <Route path="GoldenStrategy/Login" element={<RegistrationPage />} />
        <Route path="GoldenStrategy/Dashboard" element={<Dashboard />} />
        <Route path="GoldenStrategy/Shop" element={<Shop />} />
        <Route path="GoldenStrategy/Game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
