import { ReactNode, createContext, useEffect, useState } from "react";
import { addComentario } from "../api/comentariosServices";
import { fetchEstados } from "../api/estadoService";
import {
  actualizarEstado,
  addPostulacion,
  deletePostulacion,
  fetchPostulaciones,
} from "../api/postulacionesService";
import {
  ComentarioFormState,
  Estado,
  Postulacion,
  PostulacionFormState,
} from "../types/types";

type PostulacionContextType = {
  postulaciones: Postulacion[];
  estados: Estado[];
  agregarPostulacion: (postulacion: PostulacionFormState) => void;
  agregarComentario: (comentario: ComentarioFormState) => void;
  cargarPostulaciones: () => void;
  eliminarPostulacion: (postulacionId: number) => void;
  actualizarEstadoPostulacion: (id: number, estado: string) => void;
  cargarEstados: () => void;
  isLoading: boolean;
  isFormVisible: boolean;
  toggleFormVisible: () => void;
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
  const [estados, setEstados] = useState<Estado[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const toggleFormVisible = () => {
    setIsFormVisible(!isFormVisible);
  };

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

  const cargarEstados = async () => {
    setIsLoading(true);

    try {
      const response = await fetchEstados();

      if (response.data && response.data.data) {
        setEstados(response.data.data);
      }
    } catch (error) {
      console.error("Hubo un error al obtener los estados", error);
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

  const agregarComentario = async (comentarioData: ComentarioFormState) => {
    setIsLoading(true);

    try {
      await addComentario(comentarioData);
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

  const actualizarEstadoPostulacion = async (id: number, estado: string) => {
    setIsLoading(true);

    try {
      await actualizarEstado(id, estado);
      await cargarPostulaciones();
    } catch (error) {
      console.error(
        "Hubo un error al actualizar el estado de la postulación",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarPostulaciones();
    cargarEstados();
  }, []);

  return (
    <PostulacionContext.Provider
      value={{
        postulaciones,
        estados,
        agregarPostulacion,
        cargarPostulaciones,
        eliminarPostulacion,
        actualizarEstadoPostulacion,
        agregarComentario,
        cargarEstados,
        isLoading,
        isFormVisible,
        toggleFormVisible,
      }}
    >
      {children}
    </PostulacionContext.Provider>
  );
};
