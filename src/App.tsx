import axios from "axios";
import "./App.css";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
// import Navbar from "./components/Navbar";

function App() {
  axios
    .post(`https://dull-erin-marlin-cuff.cyclic.app/api/users/delete`, {
      email: "atukajiquridze@gmail.com",
    })
    .then((res) => console.log("deleted"))
    .catch((err) => console.log(err));

  return (
    <div className="App">
      {/* <Navbar /> */}
      <RegistrationPage />
    </div>
  );
}

export default App;
