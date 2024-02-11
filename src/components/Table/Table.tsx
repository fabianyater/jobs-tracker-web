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
import { Select } from "../Select";

const CustomTable: React.FC = () => {
  const { postulaciones, estados, actualizarEstadoPostulacion } =
    usePostulaciones();

  return (
    <div className="overflow-x-auto dark h-[720px]">
      <Table hoverable striped>
        <TableHead>
          <TableHeadCell>Puesto</TableHeadCell>
          <TableHeadCell>Empresa</TableHeadCell>
          <TableHeadCell>Fecha de Postulación</TableHeadCell>
          <TableHeadCell>Estado</TableHeadCell>
          <TableHeadCell>Ver más</TableHeadCell>
        </TableHead>
        <TableBody>
          {postulaciones.map((postulacion) => (
            <TableRow
              key={postulacion.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {postulacion.tituloPuesto}
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {postulacion.nombreEmpresa}
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {postulacion.fechaPostulacion}
              </TableCell>
              <TableCell>
                <Select
                  opciones={estados}
                  value={postulacion.estado}
                  onChange={(e) =>
                    actualizarEstadoPostulacion(postulacion.id, e)
                  }
                />
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
