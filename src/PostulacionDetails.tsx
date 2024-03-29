import DOMPurify from "dompurify";
import { Badge, Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { fetchPostulacioneDetalle } from "./api/postulacionesService";
import { Comment } from "./components/Comment";
import { Timeline } from "./components/Timeline";
import { useComentarioContext } from "./hooks/useComentarioContext";
import { EstadoPostulacion, Postulacion } from "./types/types";
import {
  calcularDiferenciaFecha,
  detectarYReemplazarURLs,
  formatearFecha,
  mapearNombresPlataforma,
} from "./utils";

const PostulacionDetalle = () => {
  const [postulacionDetalle, setPostulacionDetalle] = useState<Postulacion>();
  const {
    comentarios,
    cargarComentarios,
    isLoading: commentsLoading,
  } = useComentarioContext();
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const cargarPostulacionDetalle = async (postulacionId: number) => {
    setIsLoading(true);

    try {
      const response = await fetchPostulacioneDetalle(postulacionId);

      if (response.data && response.data.data) {
        setPostulacionDetalle(response.data.data);
      }
    } catch (error) {
      console.error("Hubo un error al obtener la postulación", error);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultPostulacion: Postulacion = {
    id: 0,
    nombreEmpresa: "",
    tituloPuesto: "",
    plataforma: "",
    descripcion: "",
    estado: EstadoPostulacion.Enviada,
    fechaActualizacion: "",
    fechaPostulacion: "",
    url: "",
  };

  const postulacion: Postulacion = postulacionDetalle || defaultPostulacion;

  const {
    id: postulacionId,
    url,
    descripcion,
    estado,
    tituloPuesto,
    nombreEmpresa,
    fechaPostulacion,
    plataforma,
  } = postulacion;

  const descripcionLimpia = DOMPurify.sanitize(descripcion);

  useEffect(() => {
    cargarComentarios(Number(id));
  }, [cargarComentarios, id]);

  useEffect(() => {
    cargarPostulacionDetalle(Number(id));
  }, [id]);

  if (id === undefined || !/^\d+$/.test(id)) {
    return <Navigate to="/not-found" replace />;
  }

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="container mx-auto my-24 px-4">
      <Button
        color="light"
        size="sm"
        className="rounded-full"
        title="Volver"
        onClick={() => navigate(-1)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-backward"
        >
          <polyline points="9 17 4 12 9 7" />
          <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
        </svg>
      </Button>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex justify-between flex-col sm:flex-row sm:gap-20">
          <div className="flex w-full flex-col">
            <section className="w-full mt-8 flex flex-col justify-between gap-5">
              <div className="flex flex-col gap-2">
                <Badge color="dark" className="w-max" size="sm" title={estado}>
                  {estado}
                </Badge>
                <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  {tituloPuesto}
                </h1>
                <h2 className="text-2xl text-white">{nombreEmpresa}</h2>
                <span className="text-white text-sm">
                  Solicitado el {formatearFecha(fechaPostulacion)} &#40;
                  {calcularDiferenciaFecha(fechaPostulacion)}&#41;
                </span>
                <Button
                  color="blue"
                  className="w-max"
                  href={url}
                  target="_blank"
                  title="Ver vacante"
                >
                  {mapearNombresPlataforma(plataforma) === "Linkedin" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-linkedin sm:mr-2 mr-2"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-link sm:mr-2 mr-2"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                  )}
                  Ver vacante
                </Button>
              </div>
            </section>
            <section className="w-full mt-8 flex flex-col justify-between gap-5">
              <div>
                <span className="text-gray-400 text-md mb-8">
                  Actualizaciones
                </span>
                <Timeline postulacionId={Number(id)} />
              </div>
            </section>
            <section className="w-full mt-8 flex flex-col justify-between gap-5">
              <div>
                <span className="text-gray-400 text-md mb-8">Comentarios</span>
                {commentsLoading ? (
                  <Spinner />
                ) : (
                  comentarios.length !== 0 && (
                    <ul className="mt-2 flex flex-col gap-2 max-w-xl space-y-1 text-white list-inside list-none">
                      {comentarios.map(
                        ({ comentario, fechaPublicacion }, index) => {
                          return (
                            <li key={index} className="flex flex-col">
                              <p
                                className="text-white break-words"
                                dangerouslySetInnerHTML={{
                                  __html: detectarYReemplazarURLs(comentario),
                                }}
                              ></p>
                              <span className="text-xs text-gray-400">
                                {formatearFecha(fechaPublicacion)} &#40;
                                {calcularDiferenciaFecha(fechaPublicacion)}&#41;
                              </span>
                            </li>
                          );
                        }
                      )}
                    </ul>
                  )
                )}
                <Comment postulacionId={postulacionId} />
              </div>
            </section>
          </div>
          {descripcion && (
            <div className=" w-full mt-8 relative">
              <span className="text-gray-400 text-md mb-8">Descripción</span>
              <div
                className={`text-white pretty overflow-hidden transition-max-height duration-500 ease-in-out relative ${
                  isDescriptionExpanded ? "max-h-[1000px]" : "max-h-80"
                } pb-10`}
                dangerouslySetInnerHTML={{ __html: descripcionLimpia }}
                style={{
                  transition: "max-height 0.5s ease-in-out",
                }}
              ></div>
              <div className="absolute w-full flex items-center justify-center transition-all duration-500 ease-in-out">
                <Button
                  color="transparent"
                  onClick={toggleDescription}
                  className="text-white flex flex-col"
                  title={isDescriptionExpanded ? "Leer menos" : "Leer más"}
                >
                  {isDescriptionExpanded ? (
                    <div className="flex items-center gap-1">
                      Ver menos
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-up"
                      >
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      Ver más
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostulacionDetalle;
