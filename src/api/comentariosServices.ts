import { ComentarioFormState } from "../types/types";
import axiosInstance from "./axionClient";

export const addComentario = (comentarioData: ComentarioFormState) => {
  return axiosInstance.post("comentarios", comentarioData);
};
