// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ---- Rutas ----
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>

  // <React.StrictMode>
  // <App />
  //  </React.StrictMode>,
);
