import styles from "./App.module.css";
import { ApplyForm } from "./components/ApplyForm";
import { usePostulaciones } from "./hooks/usePostulacion";
import { EstadoPostulacion } from "./types/types";

function App() {
  const {
    postulaciones,
    eliminarPostulacion,
    actualizarEstadoPostulacion,
    isLoading,
  } = usePostulaciones();

  const handleDeletePostulacion = (id: number) => {
    if (confirm("¿Está seguro que quiere eliminar esta postulación?")) {
      return eliminarPostulacion(id);
    }

    return null;
  };

  return (
    <div className={styles.container}>
      <header>
        <h1>Agregar postulación</h1>
        <ApplyForm />
      </header>
      <main>
        <h2>Mis postulaciones</h2>
        <section className={styles.posts}>
          {isLoading ? (
            <h1>Cargando...</h1>
          ) : (
            <ul className={styles.list}>
              {postulaciones.map((postulacion, index) => (
                <li key={index} className={styles.item}>
                  <div className={styles.postulacionHeader}>
                    {postulacion.tituloPuesto} en {postulacion.nombreEmpresa}
                  </div>
                  <div className={styles.postulacionBody}>
                    <p>
                      Estado:
                      <select
                        value={postulacion.estado}
                        onChange={(e) =>
                          actualizarEstadoPostulacion(
                            postulacion.id,
                            e.target.value
                          )
                        }
                      >
                        {Object.values(EstadoPostulacion).map((estado) => (
                          <option key={estado} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>
                    </p>
                    <p>Fecha de postulación: {postulacion.fechaPostulacion}</p>
                    {postulacion.notas && <p>Notas: {postulacion.notas}</p>}
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
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
