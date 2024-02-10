import React from "react";
import { Estado } from "../../types/types";

export type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  opciones: Estado[];
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  opciones,
}) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {opciones.map((opcion) => (
        <option key={opcion.id} value={opcion.estado}>
          {opcion.estado}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
