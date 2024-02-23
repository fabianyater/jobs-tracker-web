import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostulacionContext } from "../../hooks/usePostulacionContext";
import { Postulacion } from "../../types/types";
import { formatearFecha } from "../../utils";
import { Select } from "../Select";
import { TableItem } from "../TableItem";
import { TablePagination } from "../TablePagination";

const CustomTable: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(
    localStorage.getItem("selectedRow")
      ? Number(localStorage.getItem("selectedRow"))
      : null
  );
  const {
    postulaciones,
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
    localStorage.setItem("selectedRow", postulacion.id.toString());
  };

  useEffect(() => {
    const savedId = localStorage.getItem("selectedRow");
    if (savedId) {
      setSelectedRow(Number(savedId));
    }
  }, []);

  return (
    <>
      <div className="overflow-x-auto dark h-[650px]">
        <Table hoverable striped>
          <TableHead>
            <TableHeadCell className="text-white">Puesto</TableHeadCell>
            <TableHeadCell className="text-white">Empresa</TableHeadCell>
            <TableHeadCell className="text-white">Plataforma</TableHeadCell>
            <TableHeadCell className="text-white">
              Fecha de actualización
            </TableHeadCell>
            <TableHeadCell className="text-white">Estado</TableHeadCell>
            <TableHeadCell className="text-white">Enlace</TableHeadCell>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  <Spinner color="info" size="md" />
                </TableCell>
              </TableRow>
            ) : postulaciones.length > 0 ? (
              postulaciones.map((postulacion) => (
                <TableRow
                  style={{
                    border:
                      selectedRow === postulacion.id ? "solid 1px #22d3ee" : "",
                  }}
                  key={postulacion.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                  onClick={() => handleOnClick(postulacion)}
                >
                  <TableItem>{postulacion.tituloPuesto}</TableItem>
                  <TableItem>{postulacion.nombreEmpresa}</TableItem>
                  <TableItem>{postulacion.plataforma}</TableItem>
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
                <TableCell colSpan={6} className="text-center">
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
