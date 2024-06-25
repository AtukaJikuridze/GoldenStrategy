import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MyContextProvider } from "./Context/myContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </BrowserRouter>
);
