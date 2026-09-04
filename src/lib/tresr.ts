export const NEGOCIO = {
  nombre: "Tres R Barbería",
  telefono: "+52 81 2875 0500",
  telefonoE164: "+528128750500",
  whatsapp:
    "https://wa.me/528128750500?text=Hola%20Tres%20R%20Barber%C3%ADa%2C%20quiero%20agendar%20una%20cita.",
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
    nombre: "Corte",
    precio: "$200",
    duracion: "Aprox. 35–40 min",
    detalle: "Corte detallado profesional, desvanecido a gusto, tijera o máquina y peinado final.",
  },
  {
    id: "corte-barba",
    nombre: "Corte y barba",
    precio: "$300",
    duracion: "Aprox. 50–60 min",
    detalle:
      "El ritual completo: corte fresco, toalla caliente, arreglo de barba y acabado impecable.",
  },
  {
    id: "ceja",
    nombre: "Delineado de ceja",
    precio: "$50",
    duracion: "Aprox. 15 min",
    detalle:
      "Limpieza milimétrica y definición de cejas con acabado natural para una mirada más limpia.",
  },
  {
    id: "linea",
    nombre: "Línea extra",
    precio: "$50",
    duracion: "Aprox. 10 min",
    detalle: "Trazo artístico adicional con navaja para darle un detalle único a tu corte.",
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

function partesFecha(fechaISO: string): [number, number, number] {
  const [y, m, d] = fechaISO.split("-").map(Number);
  return [y ?? 2026, m ?? 1, d ?? 1];
}

export function esDomingo(fechaISO: string): boolean {
  if (!fechaISO) return false;
  const [y, m, d] = partesFecha(fechaISO);
  return new Date(y, m - 1, d).getDay() === 0;
}

export function horasDisponibles(fechaISO: string): string[] {
  if (!fechaISO) return [];
  const [y, m, d] = partesFecha(fechaISO);
  const dia = new Date(y, m - 1, d).getDay();
  if (dia === 0) return [];
  const inicio = dia === 6 ? 13 : 14;
  const ultimo = dia === 6 ? 20.5 : 21.5;
  const horas: string[] = [];
  for (let t = inicio; t <= ultimo; t += 0.5) {
    horas.push(formatoHora(Math.floor(t), t % 1 === 0 ? 0 : 30));
  }
  return horas;
}

function formatoHora(h: number, min: number): string {
  const sufijo = h >= 12 ? "p.m." : "a.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return h12 + ":" + String(min).padStart(2, "0") + " " + sufijo;
}

export function hoyISO(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"] as const;
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

export function fechaLegible(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = partesFecha(iso);
  const diaSemana = DIAS[new Date(y, m - 1, d).getDay()];
  return diaSemana + " " + d + " de " + MESES[m - 1];
}

export function enlaceWhatsApp(mensaje: string): string {
  return "https://wa.me/528128750500?text=" + encodeURIComponent(mensaje);
}

export function descargarVCard(): void {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;Tres R Barbería;;;",
    "FN:Tres R Barbería",
    "ORG:Tres R Barbería",
    "TEL;TYPE=CELL,VOICE:+528128750500",
    "ADR;TYPE=WORK:;;Av. de los Astros 101, Plaza Point 54, Local 7;Monterrey;N.L.;64100;México",
    "URL:https://tres-r-barberia.netlify.app/",
    "X-SOCIALPROFILE;TYPE=instagram:" + NEGOCIO.instagram,
    "NOTE:Barbería en Monterrey. Lun–Vie 2:00 p.m.–10:00 p.m. · Sáb 1:00 p.m.–9:00 p.m. · Dom cerrado. Instagram " +
      NEGOCIO.instagramHandle,
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
