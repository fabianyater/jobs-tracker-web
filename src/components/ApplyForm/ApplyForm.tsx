import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { PostulacionFormState } from "../../types/types";
import { usePostulacionContext } from "../../hooks/usePostulacionContext";

const ApplyForm: React.FC = () => {
  const [formState, setFormState] = useState<PostulacionFormState>({
    nombreEmpresa: "",
    url: "",
    tituloPuesto: "",
  });

  const { agregarPostulacion, toggleFormVisible, isLoading } =
    usePostulacionContext();

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
      setTimeout(() => {
        toggleFormVisible();
      }, 1000);
    } catch (error) {
      console.error("Hubo un error al agregar la postulación", error);
    }
  };

  return (
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="empresa" value="Nombre de la empresa" />
        </div>
        <TextInput
          id="empresa"
          type="text"
          placeholder="Pragma"
          name="nombreEmpresa"
          value={formState.nombreEmpresa}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="puesto" value="Nombre del puesto" />
        </div>
        <TextInput
          id="puesto"
          type="text"
          placeholder="Java Developer"
          name="tituloPuesto"
          value={formState.tituloPuesto}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="oferta" value="Enlace de la oferta" />
        </div>
        <TextInput
          id="oferta"
          type="text"
          placeholder="https://www.linkedin.com/jobs/view/3826871820"
          name="url"
          value={formState.url}
          onChange={handleChange}
          required
        />
      </div>

      <Button color="blue" isProcessing={isLoading} type="submit">
        Agregar
      </Button>
    </form>
  );
};

export default ApplyForm;
