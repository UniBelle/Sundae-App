import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);