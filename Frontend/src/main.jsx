import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import logoUrl from "./assets/images/VeriLens-Logo.svg";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import "./styles.css";

const favicon = document.querySelector('link[rel="icon"]') || document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/svg+xml";
favicon.href = "/src/assets/images/VeriLens-Logo.svg";
document.head.appendChild(favicon);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
