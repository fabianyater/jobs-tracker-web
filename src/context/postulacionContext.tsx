import { ReactNode, createContext, useEffect, useState } from "react";
import {
  addPostulacion,
  deletePostulacion,
  fetchPostulaciones,
} from "../api/postulacionesService";
import { Postulacion, PostulacionFormState } from "../types/types";

type PostulacionContextType = {
  postulaciones: Postulacion[];
  agregarPostulacion: (postulacion: PostulacionFormState) => void;
  cargarPostulaciones: () => void;
  eliminarPostulacion: (postulacionId: number) => void;
};

export const PostulacionContext = createContext<
  PostulacionContextType | undefined
>(undefined);

type PostulacionProviderProps = {
  children: ReactNode;
};

export const PostulacionProvider: React.FC<PostulacionProviderProps> = ({
  children,
}) => {
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);

  const cargarPostulaciones = async () => {
    try {
      const response = await fetchPostulaciones();

      if (response.data && response.data.data) {
        setPostulaciones(response.data.data);
      }
    } catch (error) {
      console.error("Hubo un error al obtener las postulaciones", error);
    }
  };

  const agregarPostulacion = async (postulacionData: PostulacionFormState) => {
    try {
      await addPostulacion(postulacionData);
      await cargarPostulaciones();
    } catch (error) {
      console.error("Hubo un error al agregar la postulación", error);
    }
  };

  const eliminarPostulacion = async (postulacionId: number) => {
    try {
      await deletePostulacion(postulacionId);
      await cargarPostulaciones();
    } catch (error) {
      console.error("Hubo un error al eliminar la postulación", error);
    }
  };

  useEffect(() => {
    cargarPostulaciones();
  }, []);

  return (
    <PostulacionContext.Provider
      value={{
        postulaciones,
        agregarPostulacion,
        cargarPostulaciones,
        eliminarPostulacion,
      }}
    >
      {children}
    </PostulacionContext.Provider>
  );
};
