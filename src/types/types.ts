export enum EstadoPostulacion {
  Enviada = "Enviada",
  Vista = "Vista",
  EnProceso = "En proceso",
  SinRespuesta = "Sin respuesta",
  Rechazada = "Rechazada"
}

export type Comentario = {
  comentario: string;
};

export type Postulacion = {
  id: number;
  nombreEmpresa: string;
  tituloPuesto: string;
  url: string;
  estado: EstadoPostulacion;
  fechaPostulacion: string;
  fechaActualizacion: string;
  comentarios: Comentario[];
  descripcion: string;
};

export type PostulacionFormState = {
  nombreEmpresa: string;
  url: string;
  tituloPuesto: string;
};

export type ComentarioFormState = {
  postulacionId: number;
  comentario: string;
};

export type Estado = {
  id: number;
  estado: string;
  color: string;
};

export type Timeline = {
  estado: string;
  fechaActualizacion: string;
  color: string
};
