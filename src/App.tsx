import axios from "axios";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Navbar from "./components/Navbar";
import Game from "./pages/Game/Game";

function App() {
  return (
    <div className="App lg:pt-32">
      <Navbar />
      <Game />
      {/* <RegistrationPage /> */}
      <Dashboard />
    </div>
  );
}

export default App;
