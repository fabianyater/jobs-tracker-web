import React, { useState } from "react";
import { usePostulaciones } from "../../hooks/usePostulacion";
import { Postulacion } from "../../types/types";
import styles from "./PostulacionItem.module.css";

export type PostulacionItemProps = {
  postulacion: Postulacion;
};

const PostulacionItem: React.FC<PostulacionItemProps> = ({ postulacion }) => {
  const {
    actualizarEstadoPostulacion,
    estados,
    eliminarPostulacion,
    agregarComentario,
  } = usePostulaciones();
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");

  const handleDeletePostulacion = (id: number) => {
    if (confirm("¿Está seguro que quiere eliminar esta postulación?")) {
      return eliminarPostulacion(id);
    }

    return null;
  };

  const handleComments = (id: number) => {
    const comentarioActualizado = {
      postulacionId: id,
      comentario: commentText,
    };

    agregarComentario(comentarioActualizado);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  return (
    <li key={postulacion.id} className={styles.item}>
      <div className={styles.postulacionHeader}>
        {postulacion.tituloPuesto} en {postulacion.nombreEmpresa}
      </div>
      <div className={styles.postulacionBody}>
        <p>
          Estado:
          <select
            value={postulacion.estado}
            onChange={(e) =>
              actualizarEstadoPostulacion(postulacion.id, e.target.value)
            }
          >
            {Object.values(estados).map((estado) => (
              <option key={estado.id} value={estado.estado}>
                {estado.estado}
              </option>
            ))}
          </select>
        </p>
        <p>Fecha de postulación: {postulacion.fechaPostulacion}</p>
        <button onClick={() => setOpenComment(!openComment)}>
          Agregar Notas
        </button>
        {openComment && (
          <div className={styles.comments}>
            <textarea
              value={commentText}
              onChange={handleCommentChange}
            ></textarea>
            <button onClick={() => handleComments(postulacion.id)}>
              Agregar nota
            </button>
          </div>
        )}
        <ul>
          {postulacion.comentarios &&
            postulacion.comentarios.map((comentario, index) => (
              <li key={index}>{comentario.comentario}</li>
            ))}
        </ul>
      </div>
      <div className={styles.footer}>
        <a
          href={postulacion.url}
          className={styles.postulacionLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver Postulación
        </a>
        <button
          className={styles.delete}
          onClick={() => handleDeletePostulacion(postulacion.id)}
        >
          <img src="src/assets/delete.svg" alt="Delete icon" />
        </button>
      </div>
    </li>
  );
};

export default PostulacionItem;
