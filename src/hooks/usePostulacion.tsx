import { useContext } from "react";
import { PostulacionContext } from "../context/postulacionContext";

export const usePostulaciones = () => {
  const context = useContext(PostulacionContext);
  if (!context) {
    throw new Error(
      "usePostulaciones must be used within a PostulacionProvider"
    );
  }
  return context;
};
