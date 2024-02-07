export enum EstadoPostulacion {
  Enviada = "Enviada",
  Vista = "Vista",
  EnProceso = "En proceso",
  SinRespuesta = "Sin respuesta",
}

export type Postulacion = {
  id: number;
  fechaPostulacion: string;
  estado: EstadoPostulacion;
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

export type Estados = {
  id: number;
  estado: string;
}