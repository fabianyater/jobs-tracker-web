import DOMPurify from "dompurify";
import { Button } from "flowbite-react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Comment } from "./components/Comment";
import { usePostulacionContext } from "./hooks/usePostulacionContext";
import { obtenerNombreSitio } from "./utils";

function PostulacionDetalle() {
  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { postulaciones } = usePostulacionContext();
  const postulacion = postulaciones.filter((p) => p.id === Number(id))[0];
  const nombrePlataforma = obtenerNombreSitio(postulacion.url);
  const descripcionLimpia = DOMPurify.sanitize(postulacion.descripcion);

  if (id === undefined || !/^\d+$/.test(id)) {
    return <Navigate to="/not-found" replace />;
  }

  if (postulacion === undefined) {
    return <Navigate to="/not-found" replace />;
  }

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div className="container mx-auto mt-24 px-4">
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
      <section className="w-full mt-8 flex sm:flex-row flex-col justify-between gap-5">
        <div>
          <h1 className="text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            {postulacion.tituloPuesto}
          </h1>
          <h2 className="text-2xl text-white">{postulacion.nombreEmpresa}</h2>
          <span className="text-white text-sm">
            Solicitado el {postulacion.fechaPostulacion}
          </span>
          <Button
            color="blue"
            className="mt-4 w-max"
            href={postulacion.url}
            target="_blank"
          >
            {nombrePlataforma === "LinkedIn" ? (
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
                className="lucide lucide-link sm:mr-2"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            )}
            Ver vacante
          </Button>
        </div>
        {postulacion.descripcion && (
          <div className="sm:w-1/2 md:w-1/2 w-full relative">
            <span className="text-gray-400 text-md mb-8">Descripción</span>
            <div
              className={`text-white pretty overflow-hidden transition-max-height duration-500 ease-in-out ${
                isDescriptionExpanded ? "max-h-[1000px]" : "max-h-40"
              } pb-10`}
              dangerouslySetInnerHTML={{ __html: descripcionLimpia }}
              style={{
                transition: "max-height 0.5s ease-in-out",
              }}
            ></div>
            <div
              className={`absolute bottom-0 w-full flex items-center justify-center ${
                !isDescriptionExpanded
                  ? "bg-gradient-to-t from-gray-900 to-[#1A1B2E00]"
                  : "bg-[#1A1B2E00]"
              } transition-all duration-500 ease-in-out`}
            >
              <Button
                color="transparent"
                onClick={toggleDescription}
                className="text-white"
                title={isDescriptionExpanded ? "Leer menos" : "Leer más"}
              >
                {isDescriptionExpanded ? (
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
                    className="lucide lucide-chevron-down"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        )}
      </section>
      <section className="w-full mt-8 flex sm:flex-row flex-col justify-between gap-5">
        <div>
          <span className="text-gray-400 text-md mb-8">Actualizaciones</span>
          <ul>
            <li className="text-white">
              Solicitud vista el {postulacion.fechaActualizacion}
            </li>
          </ul>
        </div>
      </section>
      <section className="sm:w-1/2 w-full mt-8 flex sm:flex-row flex-col justify-between gap-5">
        <div className="sm:w-full">
          <span className="text-gray-400 text-md mb-8">Comentarios</span>
          <ul className="max-w-md space-y-1 text-white list-disc list-inside">
            {postulacion.comentarios.length > 0 ? (
              postulacion.comentarios.map(({ comentario }, index) => (
                <li key={index}>{comentario}</li>
              ))
            ) : (
              <span className="text-2xl text-blue-400">No hay comentarios</span>
            )}
          </ul>
          <Comment postulacionId={postulacion.id} />
        </div>
      </section>
    </div>
  );
}

export default PostulacionDetalle;
