export function formatearFecha(fechaOriginal: string) {
  const fecha = new Date(fechaOriginal);

  // Suponiendo que quieres un formato como "DD/MM/YYYY HH:mm:ss"
  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan desde 0
  const año = fecha.getFullYear();
  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const segundos = fecha.getSeconds().toString().padStart(2, "0");

  return `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
}
