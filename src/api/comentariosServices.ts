import { ComentarioFormState } from "../types/types";
import axiosInstance from "./axionClient";

export const addComentario = (comentarioData: ComentarioFormState) => {
  return axiosInstance.post("comentarios", comentarioData);
};

export const fetchComentarios = (postulacionId: number) => {
  return axiosInstance.get(`comentarios/postulacion/id/${postulacionId}`);
};
