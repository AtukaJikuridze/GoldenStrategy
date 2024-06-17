import axios from "axios";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Navbar from "./components/Navbar";
import Game from "./pages/Game/Game";
import Shop from "./pages/Shop/Shop";

function App() {
  return (
    <div className="App lg:pt-32">
      <Navbar />
      <Shop />
      {/* <Game /> */}
      {/* <RegistrationPage /> */}
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
