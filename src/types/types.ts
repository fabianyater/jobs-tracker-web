export type Postulacion = {
  id: number;
  fechaPostulacion: string;
  estado: string;
  url: string;
  tituloPuesto: string;
  nombreEmpresa: string;
  notas: string;
};

export type PostulacionFormState = {
  nombreEmpresa: string;
  url: string;
  tituloPuesto: string;
};
