import axios from "axios";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Navbar from "./components/Navbar";
import Game from "./pages/Game/Game";
import Shop from "./pages/Shop/Shop";
import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import { MyContext } from "./Context/myContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./baseAPI";
import FAQ from "./pages/FAQ/FAQ";
import SelectLanguage from "./pages/RegistrationPage/components/SelectLanguage";

function App() {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const [currentLanguage, setCurrentLanguage] = useState<any>(
    context?.defaultLanguage === "GE" ? "ninoM" : "interMedium"
  );
  useEffect(() => {
    setCurrentLanguage(
      context?.defaultLanguage === "GE" ? "ninoM" : "interMedium"
    );
  }, [context?.defaultLanguage]);

  useEffect(() => {
    axios
      .post(`${API}/users/delete-seen-questions`, {
        email: "avtojikuridze@gmail.com",
      })
      .then((res) => console.log(res));

    axios
      .post(`${API}/users`, {
        token: localStorage.getItem("Token"),
        language: "EN",
      })
      .then((res) => {
        console.log(res.data);

        context?.setUserInfo(res.data.userData[0]);
        context?.setUserTransactions(res.data.transactions);
      });
  }, []);
  useEffect(() => {
    if (!context?.isLoggined) {
      navigate("/GoldenStrategy/Login");
    } else {
      navigate("/GoldenStrategy/Dashboard");
    }
  }, [context?.isLoggined]);

  return (
    <div
      className={`App ${context?.isLoggined ? "lg:pt-32" : ""} `}
      style={{ fontFamily: currentLanguage }}
    >
      {context?.isLoggined ? <Navbar /> : ""}
      <SelectLanguage />
      <Routes>
        <Route path="GoldenStrategy/Login" element={<RegistrationPage />} />
        <Route path="GoldenStrategy/Dashboard" element={<Dashboard />} />
        <Route path="GoldenStrategy/Shop" element={<Shop />} />
        <Route path="GoldenStrategy/Game" element={<Game />} />
        <Route path="GoldenStrategy/FAQ" element={<FAQ />} />
      </Routes>
    </div>
  );
}

export default App;
