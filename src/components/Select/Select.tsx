import { Select } from "flowbite-react";
import React from "react";
import { Estado } from "../../types/types";

export type CustomSelectProps = {
  value: string;
  onChange: (value: string) => void;
  opciones: Estado[];
  title: string;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  opciones,
  title,
}) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      title={title}
    >
      {opciones.map((opcion) => (
        <option
          key={opcion.id}
          style={{ color: opcion.color }}
          value={opcion.estado}
        >
          {opcion.estado}
        </option>
      ))}
    </Select>
  );
};

export default CustomSelect;
