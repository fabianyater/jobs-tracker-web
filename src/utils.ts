import { Postulacion } from "./types/types";

export function formatearFecha(fechaOriginal: string) {
  const fecha = new Date(fechaOriginal);

  // Obtenemos el día
  const dia = fecha.getDate();

  // Convertimos el número del mes a su nombre correspondiente
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const mes = meses[fecha.getMonth()];

  // Convertimos de formato 24 a 12 horas, determinamos AM o PM y si es "a la" o "a las"
  let horas = fecha.getHours();
  const ampm = horas >= 12 ? "pm" : "am";
  horas = horas % 12;
  horas = horas ? horas : 12; // El 0 se convierte en 12
  const minutos = fecha.getMinutes().toString().padStart(2, "0");

  // Determinar si se usa "a la" o "a las"
  const preposicion = horas === 1 ? "a la" : "a las";

  return `${dia} de ${mes} ${preposicion} ${horas}:${minutos} ${ampm}`;
}

export const exportToJson = (exportObj: Postulacion[]) => {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "export.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export const exportToCsv = (exportObj: Postulacion[]) => {
  // Crear la cabecera del CSV con las claves de tu objeto. Ajusta según la estructura de Postulacion.
  const csvHeader = Object.keys(exportObj[0]).join(",") + "\n";

  // Convertir cada objeto del array a una fila CSV.
  const csvRows = exportObj
    .map((row) => {
      return Object.values(row)
        .map((value) =>
          // Si el valor contiene comas, saltos de línea o comillas dobles, enciérralo entre comillas dobles
          // y duplica las comillas dobles dentro de este.
          typeof value === "string" && value.includes(",")
            ? `"${value.replace(/"/g, '""')}"`
            : value.toString()
        )
        .join(",");
    })
    .join("\n");

  const csvString = csvHeader + csvRows;

  // Crear un enlace y descargar el CSV
  const dataStr =
    "data:text/csv;charset=utf-8," + encodeURIComponent(csvString);
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "export.csv");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export function obtenerNombreSitio(url: string): string {
  // Extrae el hostname de la URL usando la clase URL
  const hostname = new URL(url).hostname;

  // Mapea hostnames conocidos a los nombres de los sitios
  const mapeoSitios: { [key: string]: string } = {
    "www.linkedin.com": "LinkedIn",
    "www.glassdoor.com": "Glassdoor",
    "www.indeed.com": "Indeed",
    "www.magneto365.com": "Magneto",
  };

  // Intenta obtener el nombre del sitio del mapeo
  const nombreSitio = mapeoSitios[hostname];

  // Si el sitio está en el mapeo, retorna el nombre mapeado; si no, extrae la parte relevante del hostname como fallback
  return nombreSitio || hostname.split(".")[1] || hostname;
}
