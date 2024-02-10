import { useState } from "react";
import { usePostulaciones } from "../../hooks/usePostulacion";
import { PostulacionFormState } from "../../types/types";
import { Input } from "../Input";

const ApplyForm = () => {
  const [formState, setFormState] = useState<PostulacionFormState>({
    nombreEmpresa: "",
    url: "",
    tituloPuesto: "",
  });
  const { agregarPostulacion, isLoading } = usePostulaciones();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await agregarPostulacion(formState);
      setFormState({ nombreEmpresa: "", url: "", tituloPuesto: "" });
    } catch (error) {
      console.error("Hubo un error al agregar la postulación", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        text="Nombre de la empresa"
        type="text"
        name="nombreEmpresa"
        value={formState.nombreEmpresa}
        onChange={handleChange}
        placeholder="Pragma"
        required
      />

      <Input
        text="Nombre del puesto"
        type="text"
        name="tituloPuesto"
        value={formState.tituloPuesto}
        onChange={handleChange}
        placeholder="Backend developer"
        required
      />

      <Input
        text="Url de la oferta"
        type="url"
        name="url"
        value={formState.url}
        onChange={handleChange}
        placeholder="https://www.pragma.co/es/carrera/vacantes/practicante-de-desarrollo-de-software"
        required
      />

      <button type="submit">
        {isLoading ? "Creando" : "Agregar Postulación"}
      </button>
    </form>
  );
};

export default ApplyForm;
