import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { addComentario, fetchComentarios } from "../api/comentariosServices";
import { Comentario, ComentarioFormState } from "../types/types";

type ComentarioContextType = {
  comentarios: Comentario[];
  cargarComentarios: (postulacionId: number) => void;
  agregarComentario: (comentarioData: ComentarioFormState) => void;
  isLoading: boolean;
};

export const ComentarioContext = createContext<
  ComentarioContextType | undefined
>(undefined);

type ComentarioProviderProps = {
  children: ReactNode;
};

export const ComentarioProvider: React.FC<ComentarioProviderProps> = ({
  children,
}) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cargarComentarios = useCallback(async (postulacionId: number) => {
    try {
      setIsLoading(true);
      const response = await fetchComentarios(postulacionId);
      setComentarios(response.data.data);
    } catch (error) {
      console.error("Hubo un error al cargar los comentarios", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const agregarComentario = async (comentarioData: ComentarioFormState) => {
    try {
      setIsLoading(true);
      const response = await addComentario(comentarioData);

      setComentarios((prevComentarios) => [
        ...prevComentarios,
        response.data.data,
      ]);
    } catch (error) {
      console.error("Hubo un error al agregar la postulación", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <ComentarioContext.Provider
      value={{ comentarios, cargarComentarios, agregarComentario, isLoading }}
    >
      {children}
    </ComentarioContext.Provider>
  );
};
