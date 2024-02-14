import { EstadoPostulacion, Postulacion } from "./types/types";

export function formatearFecha(fechaOriginal: string) {
  const fecha = new Date(fechaOriginal);

  return fecha.toLocaleString("es-ES", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h12",
    
  });
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
  const csvHeader = Object.keys(exportObj[0]).join(",") + "\n";

  const csvRows = exportObj
    .map((row) => {
      return Object.values(row)
        .map((value) => {
          if (value === null || value === undefined) {
            return "";
          } else if (typeof value === "string" && value.includes(",")) {
            return `"${value.replace(/"/g, '""')}"`;
          } else {
            return value.toString();
          }
        })
        .join(",");
    })
    .join("\n");

  const csvString = csvHeader + csvRows;

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
  const hostname = new URL(url).hostname;

  const mapeoSitios: { [key: string]: string } = {
    "www.linkedin.com": "LinkedIn",
    "www.glassdoor.com": "Glassdoor",
    "www.indeed.com": "Indeed",
    "www.magneto365.com": "Magneto",
  };

  const nombreSitio = mapeoSitios[hostname];

  return nombreSitio || hostname.split(".")[1] || hostname;
}

export function detectarYReemplazarURLs(texto: string) {
  const regexUrl =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  return texto.replace(
    regexUrl,
    (url) =>
      `<a href="${url}" target="_blank" class="font-medium text-blue-400 dark:text-blue-500 underline">${url}</a>`
  );
}

const mapeoEstadoColor: { [key in string]: string } = {
  [EstadoPostulacion.Enviada.toLowerCase()]: "#1c64f2",
  [EstadoPostulacion.Vista.toLowerCase()]: "#FFFF99",
  [EstadoPostulacion.EnProceso.toLowerCase()]: "#90EE90",
  [EstadoPostulacion.SinRespuesta.toLowerCase()]: "#D3D3D3",
  [EstadoPostulacion.Rechazada.toLowerCase()]: "#FF6347",
};

export const obtenerColorEstado = (estado: EstadoPostulacion): string => {
  return mapeoEstadoColor[estado.toLowerCase()];
};
