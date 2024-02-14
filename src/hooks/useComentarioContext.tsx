import { useContext } from "react";
import { ComentarioContext } from "../context/comentarioContext";

export const useComentarioContext = () => {
  const context = useContext(ComentarioContext);
  if (!context) {
    throw new Error(
      "useComentarioContext must be used within a PostulacionProvider"
    );
  }
  return context;
};
