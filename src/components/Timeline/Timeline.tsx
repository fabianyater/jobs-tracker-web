import { useEffect, useState } from "react";
import { fetchPostulacionesTimeline } from "../../api/postulacionesService";
import { EstadoPostulacion, Timeline } from "../../types/types";
import { calcularDiferenciaFecha, formatearFecha } from "../../utils";
import {
  SvgEnProceso,
  SvgEntrevista,
  SvgEnviada,
  SvgRechazada,
  SvgSinRespuesta,
  SvgVista,
} from "../SvgIcons/SvgIcons";

type TimelineProps = {
  postulacionId: number;
};

const Timeline: React.FC<TimelineProps> = ({ postulacionId }) => {
  const [timeline, setTimeline] = useState<Timeline[]>([]);

  const cargarTimeline = async (postulacionId: number) => {
    try {
      const response = await fetchPostulacionesTimeline(postulacionId);

      if (response.data && response.data.data) {
        setTimeline(response.data.data);
      }
    } catch (error) {
      console.error("Hubo un error al obtener las postulaciones", error);
    }
  };

  useEffect(() => {
    if (postulacionId) {
      cargarTimeline(postulacionId);
    }
  }, [postulacionId]);

  const getSvgForEstado = (
    estado: EstadoPostulacion,
    color: string
  ): JSX.Element => {
    switch (estado) {
      case EstadoPostulacion.Enviada:
        return <SvgEnviada style={{ color: color }} />;
      case EstadoPostulacion.Vista:
        return <SvgVista style={{ color: color }} />;
      case EstadoPostulacion.EnProceso:
        return <SvgEnProceso style={{ color: color }} />;
      case EstadoPostulacion.SinRespuesta:
        return <SvgSinRespuesta style={{ color: color }} />;
      case EstadoPostulacion.Rechazada:
        return <SvgRechazada style={{ color: color }} />;
      case EstadoPostulacion.Entrevista:
        return <SvgEntrevista style={{ color: color }} />;
      default:
        return <div />;
    }
  };

  return (
    <ol className="relative border-s border-blue-900 dark mt-2 ml-3">
      {timeline.map((t, index) => (
        <li key={index} className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-5 h-[2.2rem] rounded-full -start-3">
            {getSvgForEstado(t.estado as EstadoPostulacion, t.color)}
          </span>
          <h3 className="flex items-center mb-1 text-lg font-medium text-gray-900 dark:text-white gap-3">
            {t.estado}
          </h3>
          <time className="block mb-2 text-sm font-normal leading-none text-[#4F7396]">
            {formatearFecha(t.fechaActualizacion)} {calcularDiferenciaFecha(t.fechaActualizacion)}
          </time>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
