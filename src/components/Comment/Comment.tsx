import { Spinner } from "flowbite-react";
import { FormEvent, useState } from "react";
import { useComentarioContext } from "../../hooks/useComentarioContext";
import { ComentarioFormState } from "../../types/types";

type CommentProps = {
  postulacionId: number;
};

const Comment: React.FC<CommentProps> = ({ postulacionId }) => {
  const { agregarComentario, isLoading } = useComentarioContext();
  const [formState, setFormState] = useState<ComentarioFormState>({
    postulacionId: postulacionId,
    comentario: "",
  });

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    agregarComentario(formState);
    setFormState({ ...formState, comentario: "" });
  };

  return (
    <form onSubmit={handleOnSubmit} className="max-w-2xl dark mt-4">
      <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Tu comentario
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Escribe un comentario..."
            required
            value={formState.comentario}
            onChange={(e) =>
              setFormState({ ...formState, comentario: e.target.value })
            }
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button
            title="Agregar comentario"
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            style={{ minWidth: "160px" }} // Asegura un ancho mínimo para el botón
          >
            {isLoading ? (
              <div className="w-full flex justify-center items-center">
                <Spinner size="sm" color="info" className="dark:text-white" />
              </div>
            ) : (
              "Agregar un comentario"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Comment;
