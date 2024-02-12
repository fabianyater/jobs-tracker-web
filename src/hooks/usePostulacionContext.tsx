import { useContext } from "react";
import { PostulacionContext } from "../context/postulacionContext";

export const usePostulacionContext = () => {
  const context = useContext(PostulacionContext);
  if (!context) {
    throw new Error(
      "usePostulacionContext must be used within a PostulacionProvider"
    );
  }
  return context;
};
