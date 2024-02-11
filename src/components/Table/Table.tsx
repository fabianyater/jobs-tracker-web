import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React from "react";
import { usePostulaciones } from "../../hooks/usePostulacion";
import { Postulacion } from "../../types/types";
import { formatearFecha } from "../../utils";
import { Select } from "../Select";
import { TableItem } from "../TableItem";

const CustomTable: React.FC = () => {
  const { postulacionesFiltradas, estados, actualizarEstadoPostulacion } =
    usePostulaciones();

  const handleOnClick = (postulacion: Postulacion) => {
    //TODO: Datos para ir al detalle de la postulación
    console.log(postulacionesFiltradas.find((f) => f.id === postulacion.id));
  };

  return (
    <div className="overflow-x-auto dark h-[720px]">
      <Table hoverable striped>
        <TableHead>
          <TableHeadCell className="text-white">Puesto</TableHeadCell>
          <TableHeadCell className="text-white">Empresa</TableHeadCell>
          <TableHeadCell className="text-white">
            Fecha de actualización
          </TableHeadCell>
          <TableHeadCell className="text-white">Estado</TableHeadCell>
          <TableHeadCell className="text-white">Ver más</TableHeadCell>
        </TableHead>
        <TableBody>
          {postulacionesFiltradas.length > 0 ? (
            postulacionesFiltradas.map((postulacion) => (
              <TableRow
                key={postulacion.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                onClick={() => handleOnClick(postulacion)}
              >
                <TableItem>{postulacion.tituloPuesto}</TableItem>
                <TableItem>{postulacion.nombreEmpresa}</TableItem>
                <TableItem>
                  {formatearFecha(postulacion.fechaActualizacion)}
                </TableItem>
                <TableItem>
                  <Select
                    opciones={estados}
                    title="Seleccionar estado"
                    value={postulacion.estado}
                    onChange={(e) =>
                      actualizarEstadoPostulacion(postulacion.id, e)
                    }
                  />
                </TableItem>
                <TableItem>
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
                    className="lucide lucide-eye cursor-pointer"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </TableItem>
              </TableRow>
            ))
          ) : (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell colSpan={5} className="text-center">
                No hay postulaciones disponibles
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
