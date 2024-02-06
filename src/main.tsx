import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PostulacionProvider } from "./context/postulacionContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostulacionProvider>
      <App />
    </PostulacionProvider>
  </React.StrictMode>
);
