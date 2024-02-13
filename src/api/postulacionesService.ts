import { PostulacionFormState } from "../types/types";
import axiosInstance from "./axionClient";

export const fetchPostulaciones = (page: number, items: number) => {
  return axiosInstance.get(`postulaciones?page=${page}&items=${items}`);
};

export const fetchPostulacionesTimeline = (id: number) => {
  return axiosInstance.get(`postulaciones/timeline/${id}`);
};

export const addPostulacion = (postulacionData: PostulacionFormState) => {
  return axiosInstance.post("postulaciones", postulacionData);
};

export const deletePostulacion = (id: number) => {
  return axiosInstance.delete(`postulaciones/${id}`);
};

export const actualizarEstado = (id: number, estado: string) => {
  return axiosInstance.post(`postulaciones/${id}`, { estado });
};
