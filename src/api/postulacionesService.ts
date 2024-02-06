import { PostulacionFormState } from "../types/types";
import axiosInstance from "./axionClient";

export const fetchPostulaciones = () => {
  return axiosInstance.get("postulaciones");
};

export const addPostulacion = (postulacionData: PostulacionFormState) => {
  return axiosInstance.post("postulaciones", postulacionData);
};

export const deletePostulacion = (id: number) => {
  return axiosInstance.delete(`postulaciones/${id}`);
};
