import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import PostulacionDetalle from "./PostulacionDetails.tsx";
import NotFound from "./components/NotFound/NotFound.tsx";
import { ComentarioProvider } from "./context/comentarioContext.tsx";
import { PostulacionProvider } from "./context/postulacionContext.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PostulacionProvider>
      <ComentarioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/postulacion/:id" element={<PostulacionDetalle />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ComentarioProvider>
    </PostulacionProvider>
  </React.StrictMode>
);
