import { Button } from "flowbite-react";
import { ApplyForm } from "./components/ApplyForm";
import CustomModal from "./components/Modal/CustomModal";
import { Table } from "./components/Table";
import { usePostulaciones } from "./hooks/usePostulacion";

function App() {
  const { isFormVisible, toggleFormVisible } = usePostulaciones();

  return (
    <div className="container mx-auto">
      <header>
        <h1 className="my-8 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Jobs Tracker
          </span>
        </h1>
        {isFormVisible && (
          <CustomModal
            title="Nueva postulación"
            showModal={isFormVisible}
            showFooter={false}
          >
            <div className="flex flex-col g-2">
              <ApplyForm />
            </div>
          </CustomModal>
        )}
      </header>
      <main>
        <div className="flex justify-between">
          <h2
            className="text-4xl font-bold dark:text-white my-4   
          underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600 text-white"
          >
            Mis postulaciones
          </h2>
          <Button className="my-6" onClick={toggleFormVisible}>
            Agregar postulación
          </Button>
        </div>
        <Table />
        <section className="h-[620px] overflow-hidden my-8"></section>
      </main>
    </div>
  );
}

export default App;
