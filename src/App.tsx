import styles from "./App.module.css";
import { ApplyForm } from "./components/ApplyForm";
import { PostulacionItem } from "./components/PostulacionItem";
import { usePostulaciones } from "./hooks/usePostulacion";

function App() {
  const { postulaciones, isLoading } = usePostulaciones();

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
              {postulaciones.map((postulacion) => (
                <PostulacionItem postulacion={postulacion} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
