import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MyContextProvider } from "./Context/myContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MyContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MyContextProvider>
);
