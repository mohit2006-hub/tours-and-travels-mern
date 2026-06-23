import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/AuthContext"; // <-- Added this line

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* <-- Added opening tag */}
      <App />
    </AuthProvider> {/* <-- Added closing tag */}
  </React.StrictMode>
);