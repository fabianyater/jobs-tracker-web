import { Button } from "flowbite-react";
import { ApplyForm } from "./components/ApplyForm";
import { DropdownButton } from "./components/DropdownButton";
import CustomModal from "./components/Modal/CustomModal";
import { Table } from "./components/Table";
import { usePostulacionContext } from "./hooks/usePostulacionContext";

function App() {
  const { isFormVisible, toggleFormVisible, totalPostulaciones, estados } =
    usePostulacionContext();

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
          <div className="flex items-baseline g-4">
            <h2
              className="text-4xl font-bold dark:text-white my-4   
            underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600 text-white"
            >
              Mis postulaciones
            </h2>
            <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-2">
              {" "}
              {totalPostulaciones}
            </span>
          </div>
          <div className="flex gap-4">
            <DropdownButton estados={estados} />
            <Button className="my-6" onClick={toggleFormVisible}>
              Agregar postulación
            </Button>
          </div>
        </div>
        <Table />
      </main>
    </div>
  );
}

export default App;
