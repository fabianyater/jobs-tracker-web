import React from "react";
import { usePostulaciones } from "../../hooks/usePostulacion";

const Table: React.FC = () => {
  const { postulaciones } = usePostulaciones();
  return (
    <table>
      <thead>
        <tr>
          <th>Puesto</th>
          <th>Empresa</th>
          <th>Estado</th>
          <th>Fecha de postulación</th>
          <th>Enlace</th>
        </tr>
      </thead>
      <tbody>
       
      </tbody>
    </table>
  );
};

export default Table;
