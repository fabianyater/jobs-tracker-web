import { useEffect } from "react";
import { usePostulacionContext } from "../../hooks/usePostulacionContext";
import { EstadoPostulacion } from "../../types/types";
import { formatearFecha } from "../../utils";
import {
  SvgEnProceso,
  SvgEnviada,
  SvgRechazada,
  SvgSinRespuesta,
  SvgVista,
} from "../SvgIcons/SvgIcons";

type TimelineProps = {
  postulacionId: number;
};

const Timeline: React.FC<TimelineProps> = ({ postulacionId }) => {
  const { timeline, cargarTimeline } = usePostulacionContext();

  const getSvgForEstado = (
    estado: EstadoPostulacion,
    color: string
  ): JSX.Element => {
    switch (estado) {
      case EstadoPostulacion.Enviada.toLocaleLowerCase():
        return <SvgEnviada style={{ color: color }} />;
      case EstadoPostulacion.Vista.toLocaleLowerCase():
        return <SvgVista style={{ color: color }} />;
      case EstadoPostulacion.EnProceso.toLocaleLowerCase():
        return <SvgEnProceso style={{ color: color }} />;
      case EstadoPostulacion.SinRespuesta.toLocaleLowerCase():
        return <SvgSinRespuesta style={{ color: color }} />;
      case EstadoPostulacion.Rechazada.toLocaleLowerCase():
        return <SvgRechazada style={{ color: color }} />;
      default:
        return <div />; // Retorna un div vacío o un SVG por defecto si prefieres
    }
  };

  useEffect(() => {
    cargarTimeline(postulacionId);
  }, []);

  return (
    <ol className="relative border-s border-blue-900 dark mt-4 ml-3">
      {timeline.map((t, index) => (
        <li key={index} className="mb-10 ms-6">
          <span className="absolute flex items-center justify-center w-5 h-[2.2rem] rounded-full -start-3">
            {getSvgForEstado(
              t.estado.toLocaleLowerCase() as EstadoPostulacion,
              t.color
            )}
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Solicitud {t.estado.toLocaleLowerCase()}
          </h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {formatearFecha(t.fechaActualizacion)}
          </time>
        </li>
      ))}
    </ol>
  );
};

export default Timeline;
