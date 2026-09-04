export const NEGOCIO = {
  nombre: "Tres R Barbería",
  telefono: "+52 81 2875 0500",
  telefonoE164: "+528128750500",
  whatsapp: "https://wa.me/528128750500",
  direccion:
    "Av. de los Astros 101, Plaza Point 54, Local 7, Barrio Estrella, 64100 Monterrey, N.L.",
  maps: "https://share.google/11qmvryk6tomfi9mS",
  instagram: "https://www.instagram.com/tresr_barber",
  instagramHandle: "@tresr_barber",
  rating: 4.3,
  resenas: 16,
  descripcion:
    "Somos una barbería donde buscamos hacer sentir al cliente como en casa, con trato amable y buen ambiente, donde un amigo es tu barbero.",
} as const;

export const SERVICIOS = [
  {
    id: "corte",
    nombre: "Corte clásico y moderno",
    detalle:
      "Desde el fade más limpio hasta el clásico de toda la vida, adaptado a tu tipo de cabello.",
  },
  {
    id: "barba",
    nombre: "Barba y perfilado",
    detalle: "Perfilado a navaja, toalla caliente y acabado preciso en cada línea.",
  },
  {
    id: "corte-barba",
    nombre: "Corte + barba",
    detalle: "El combo completo: look renovado de arriba a abajo en una sola visita.",
  },
  {
    id: "diseno",
    nombre: "Diseño y acabados",
    detalle: "Líneas, detalles a mano alzada y acabados para que tu corte destaque.",
  },
] as const;

export const HORARIOS = [
  { dia: "Lunes", horas: "2:00 p.m. – 10:00 p.m." },
  { dia: "Martes", horas: "2:00 p.m. – 10:00 p.m." },
  { dia: "Miércoles", horas: "2:00 p.m. – 10:00 p.m." },
  { dia: "Jueves", horas: "2:00 p.m. – 10:00 p.m." },
  { dia: "Viernes", horas: "2:00 p.m. – 10:00 p.m." },
  { dia: "Sábado", horas: "1:00 p.m. – 9:00 p.m." },
  { dia: "Domingo", horas: "Cerrado" },
] as const;

export const RESENAS = [
  {
    autor: "Alexis Rubio",
    estrellas: 5,
    texto: "Recomiendo mucho esta barber, excelente servicio, te tratan bien.",
  },
  { autor: "Raúl Valadez", estrellas: 4, texto: "Está bien, te ofrecen cerveza o agua." },
  { autor: "Erick Palacios", estrellas: 5, texto: "Atendieron rápido y buen corte 😎🤙🏻" },
] as const;

/** Descompone "YYYY-MM-DD" en partes numéricas sin pasar por `new Date(str)` (UTC). */
function partesFecha(fechaISO: string): [number, number, number] {
  const [y, m, d] = fechaISO.split("-").map(Number);
  return [y ?? 2026, m ?? 1, d ?? 1];
}

/** true si la fecha (YYYY-MM-DD) cae en domingo, interpretada como fecha local. */
export function esDomingo(fechaISO: string): boolean {
  if (!fechaISO) return false;
  const [y, m, d] = partesFecha(fechaISO);
  return new Date(y, m - 1, d).getDay() === 0;
}

/**
 * Genera las horas disponibles según el día de la semana de la fecha elegida
 * (YYYY-MM-DD), interpretada siempre como fecha local:
 * lun–vie 2:00–9:30 p.m. · sábado 1:00–8:30 p.m. · domingo cerrado.
 */
export function horasDisponibles(fechaISO: string): string[] {
  if (!fechaISO) return [];
  const [y, m, d] = partesFecha(fechaISO);
  const dia = new Date(y, m - 1, d).getDay(); // 0 domingo
  if (dia === 0) return [];
  let inicio = 14;
  let ultimo = 21.5;
  if (dia === 6) {
    inicio = 13;
    ultimo = 20.5;
  }
  const horas: string[] = [];
  for (let t = inicio; t <= ultimo; t += 0.5) {
    horas.push(formatoHora(Math.floor(t), t % 1 === 0 ? 0 : 30));
  }
  return horas;
}

function formatoHora(h: number, min: number) {
  const sufijo = h >= 12 ? "p.m." : "a.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${sufijo}`;
}

/** Fecha de hoy en Monterrey (America/Mexico_City) como YYYY-MM-DD, sin desfase UTC. */
export function hoyISO(): string {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return partes; // en-CA ya entrega YYYY-MM-DD
}

const DIAS = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
] as const;
const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

/** "2026-09-04" → "viernes 4 de septiembre" (siempre el día elegido, sin conversión UTC). */
export function fechaLegible(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = partesFecha(iso);
  const diaSemana = DIAS[new Date(y, m - 1, d).getDay()];
  return `${diaSemana} ${d} de ${MESES[m - 1]}`;
}

export function enlaceWhatsApp(mensaje: string) {
  return `https://wa.me/528128750500?text=${encodeURIComponent(mensaje)}`;
}

export function descargarVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;Tres R Barbería;;;",
    "FN:Tres R Barbería",
    "ORG:Tres R Barbería",
    "TEL;TYPE=CELL,VOICE:+528128750500",
    "ADR;TYPE=WORK:;;Av. de los Astros 101, Plaza Point 54, Local 7;Monterrey;N.L.;64100;México",
    `URL:${NEGOCIO.instagram}`,
    `NOTE:Barbería en Monterrey. Lun–Vie 2:00 p.m.–10:00 p.m. · Sáb 1:00 p.m.–9:00 p.m. · Dom cerrado. Instagram ${NEGOCIO.instagramHandle}`,
    "END:VCARD",
  ].join("\r\n");
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Tres-R-Barberia.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
