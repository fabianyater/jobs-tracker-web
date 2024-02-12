import { Button } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { usePostulacionContext } from "../../hooks/usePostulacionContext";
import { Estado } from "../../types/types";

export type DropdownButtonProps = {
  estados: Estado[];
};

const DropdownButton: React.FC<DropdownButtonProps> = ({ estados }) => {
  const {
    estadosSeleccionados,
    handleCheckboxChange,
    filtrarPostulacionesPorEstado,
    clearFilter,
  } = usePostulacionContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button color="blue" className="my-6 flex gap-2" onClick={toggleDropdown}>
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
          className="lucide lucide-list-filter sm:mr-2"
        >
          <path d="M3 6h18" />
          <path d="M7 12h10" />
          <path d="M10 18h4" />
        </svg>
        <span className="hidden sm:inline">Filtrar</span>
      </Button>
      {isDropdownOpen && (
        <div className="absolute z-10 w-60 shadow-lg border border-gray-600 rounded-md p-4 bg-gray-700">
          {estados.map((estado) => (
            <div
              key={estado.id}
              className="flex items-center p-2 rounded hover:bg-gray-600"
            >
              <input
                id={estado.estado}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                checked={estadosSeleccionados.includes(estado.estado)}
                onChange={() => handleCheckboxChange(estado.estado)}
              />
              <label
                htmlFor={estado.estado}
                className="w-full ms-2 text-sm font-medium text-white rounded"
              >
                {estado.estado}
              </label>
            </div>
          ))}
          <div className="flex gap-x-2">
            <Button
              color="failure"
              title="Limpiar filtro"
              onClick={() => clearFilter()}
              className="mt-2"
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
                className="lucide lucide-trash-2 w-[18px]"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </Button>
            <Button
              color="blue"
              title="Filtrar por estados"
              onClick={() => filtrarPostulacionesPorEstado()}
              className="w-full mt-2"
            >
              Filtrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
