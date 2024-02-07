import axiosInstance from "./axionClient";

export const fetchEstados = () => {
  return axiosInstance.get("estados");
};
