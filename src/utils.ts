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
