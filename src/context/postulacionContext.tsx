import { ReactNode, createContext, useEffect, useState } from "react";
import { addComentario } from "../api/comentariosServices";
import { fetchEstados } from "../api/estadoService";
import {
  actualizarEstado,
  addPostulacion,
  deletePostulacion,
  fetchPostulaciones,
  fetchPostulacionesTimeline,
} from "../api/postulacionesService";
import {
  ComentarioFormState,
  Estado,
  Postulacion,
  PostulacionFormState,
  Timeline,
} from "../types/types";

type PostulacionContextType = {
  postulaciones: Postulacion[];
  estados: Estado[];
  agregarPostulacion: (postulacion: PostulacionFormState) => void;
  agregarComentario: (comentario: ComentarioFormState) => void;
  cargarPostulaciones: () => void;
  cargarTimeline: (postulacionId: number) => void;
  eliminarPostulacion: (postulacionId: number) => void;
  actualizarEstadoPostulacion: (id: number, estado: string) => void;
  cargarEstados: () => void;
  isLoading: boolean;
  isFormVisible: boolean;
  toggleFormVisible: () => void;
  estadosSeleccionados: string[];
  handleCheckboxChange: (estado: string) => void;
  clearFilter: () => void;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  nextPage: () => void;
  prevPage: () => void;
  handlePageChange: (page: number) => void;
  totalPages: number;
  timeline: Timeline[];
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

  const [timeline, setTimeline] = useState<Timeline[]>([]);

  const [estados, setEstados] = useState<Estado[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [estadosSeleccionados, setEstadosSeleccionados] = useState<string[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [totalItems, setTotalItems] = useState<number>(0);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (estado: string) => {
    setEstadosSeleccionados((prevSelecciones) =>
      prevSelecciones.includes(estado)
        ? prevSelecciones.filter((nombre) => nombre !== estado)
        : [...prevSelecciones, estado]
    );
  };

  const clearFilter = () => {
    setEstadosSeleccionados([]);
  };

  const toggleFormVisible = () => {
    setIsFormVisible(!isFormVisible);
  };

  const cargarPostulaciones = async () => {
    setIsLoading(true);

    try {
      const response = await fetchPostulaciones(
        currentPage,
        itemsPerPage,
        estadosSeleccionados
      );

      if (response.data && response.data.data) {
        setPostulaciones(response.data.data.postulaciones);
        setCurrentPage(response.data.data.currentPage);
        setItemsPerPage(response.data.data.itemsPerPage);
        setTotalItems(response.data.data.totalItems);
      }
    } catch (error) {
      console.error("Hubo un error al obtener las postulaciones", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cargarTimeline = async (postulacionId: number) => {
    try {
      const response = await fetchPostulacionesTimeline(postulacionId);

      if (response.data && response.data.data) {
        setTimeline(response.data.data);
      }
    } catch (error) {
      console.error("Hubo un error al obtener las postulaciones", error);
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

  useEffect(() => {
    cargarPostulaciones();
  }, [currentPage]); // Dependencia: currentPage

  return (
    <PostulacionContext.Provider
      value={{
        postulaciones,
        estados,
        agregarPostulacion,
        cargarPostulaciones,
        cargarTimeline,
        eliminarPostulacion,
        actualizarEstadoPostulacion,
        agregarComentario,
        cargarEstados,
        isLoading,
        isFormVisible,
        toggleFormVisible,
        estadosSeleccionados,
        handleCheckboxChange,
        clearFilter,
        currentPage,
        itemsPerPage,
        totalItems,
        handlePageChange,
        totalPages,
        prevPage,
        nextPage,
        timeline,
      }}
    >
      {children}
    </PostulacionContext.Provider>
  );
};
