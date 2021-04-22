import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/UserContext"
import Loading from "./components/commons/loading/Loading";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
