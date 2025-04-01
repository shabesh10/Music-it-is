import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./global.css";
import AuthProvider from "./context/AuthContext";
import UserProvider from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </>
);
