export enum EstadoPostulacion {
  Enviada = "Enviada",
  Vista = "Vista",
  EnProceso = "En proceso",
  SinRespuesta = "Sin respuesta",
}

export type Comentario = {
  comentario: string;
}

export type Postulacion = {
  id: number;
  nombreEmpresa: string;
  tituloPuesto: string;
  url: string;
  estado: EstadoPostulacion;
  fechaPostulacion: string;
  fechaActualizacion: string;
  comentarios: Comentario[];
};

export type PostulacionFormState = {
  nombreEmpresa: string;
  url: string;
  tituloPuesto: string;
};

export type ComentarioFormState = {
  postulacionId: number;
  comentario: string;
}

export type Estado = {
  id: number;
  estado: string;
  color: string;
}