import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePostulacionContext } from "../../hooks/usePostulacionContext";
import { Postulacion } from "../../types/types";
import { formatearFecha } from "../../utils";
import { Select } from "../Select";
import { TableItem } from "../TableItem";
import { TablePagination } from "../TablePagination";

const CustomTable: React.FC = () => {
  const {
    postulacionesFiltradas,
    estados,
    actualizarEstadoPostulacion,
    totalItems,
    itemsPerPage,
    currentPage,
    nextPage,
    prevPage,
    totalPages,
    handlePageChange,
    isLoading,
  } = usePostulacionContext();
  const navigate = useNavigate();

  const handleOnClick = (postulacion: Postulacion) => {
    navigate(`/postulacion/${postulacion.id}`);
  };

  return (
    <>
      <div className="overflow-x-auto dark h-[650px]">
        <Table hoverable striped>
          <TableHead>
            <TableHeadCell className="text-white">Puesto</TableHeadCell>
            <TableHeadCell className="text-white">Empresa</TableHeadCell>
            <TableHeadCell className="text-white">
              Fecha de actualización
            </TableHeadCell>
            <TableHeadCell className="text-white">Estado</TableHeadCell>
            <TableHeadCell className="text-white">Enlace</TableHeadCell>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <Spinner color="info" size="md" />
                </TableCell>
              </TableRow>
            ) : postulacionesFiltradas.length > 0 ? (
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
                      onChange={(e) => {
                        actualizarEstadoPostulacion(postulacion.id, e);
                      }}
                    />
                  </TableItem>
                  <TableItem>
                    <a
                      title="Abrir enlace"
                      href={postulacion.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 dark:text-white hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ver vacante
                    </a>
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
      <TablePagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        nextPage={nextPage}
        prevPage={prevPage}
        totalPages={totalPages}
        handlePage={handlePageChange}
      />
    </>
  );
};

export default CustomTable;
