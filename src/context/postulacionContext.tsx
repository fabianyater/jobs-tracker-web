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
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(false);

  const cargarPostulaciones = async () => {
    setIsLoading(true);

    try {
      const response = await fetchPostulaciones();

      if (response.data && response.data.data) {
        setPostulaciones(response.data.data);
      }
    } catch (error) {
      console.error("Hubo un error al obtener las postulaciones", error);
    } finally {
      setIsLoading(false);
    }
  };

  const agregarPostulacion = async (postulacionData: PostulacionFormState) => {
    setIsLoading(true);

    try {
      await addPostulacion(postulacionData);
      await cargarPostulaciones();
    } catch (error) {
      console.error("Hubo un error al agregar la postulación", error);
    } finally {
      setIsLoading(false);
    }
  };

  const eliminarPostulacion = async (postulacionId: number) => {
    setIsLoading(true);

    try {
      await deletePostulacion(postulacionId);
      await cargarPostulaciones();
    } catch (error) {
      console.error("Hubo un error al eliminar la postulación", error);
    } finally {
      setIsLoading(false);
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
        isLoading
      }}
    >
      {children}
    </PostulacionContext.Provider>
  );
};
