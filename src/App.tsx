import { ApplyForm } from "./components/ApplyForm";
import { Table } from "./components/Table";

function App() {
  return (
    <div>
      <header>
        <h1>Agregar postulación</h1>
        <ApplyForm />
      </header>
      <main>
        <h2>Mis postulaciones</h2>
        <section>
          <Table />
        </section>
      </main>
    </div>
  );
}

export default App;
