import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import PostulacionDetalle from "./PostulacionDetails.tsx";
import { PostulacionProvider } from "./context/postulacionContext.tsx";
import "./index.css";
import NotFound from "./components/NotFound/NotFound.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostulacionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/postulacion/:id" element={<PostulacionDetalle />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </PostulacionProvider>
  </React.StrictMode>
);
