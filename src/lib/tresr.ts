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
  { dia: "Sábado", horas: "12:00 p.m. – 10:00 p.m." },
  { dia: "Domingo", horas: "11:00 a.m. – 5:00 p.m." },
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

/** Genera las horas disponibles según el horario del negocio para una fecha dada (YYYY-MM-DD). */
export function horasDisponibles(fechaISO: string): string[] {
  if (!fechaISO) return [];
  const [y, m, d] = fechaISO.split("-").map(Number);
  const dia = new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1).getDay(); // 0 domingo
  let inicio = 14;
  let fin = 22;
  if (dia === 6) inicio = 12;
  if (dia === 0) {
    inicio = 11;
    fin = 17;
  }
  const horas: string[] = [];
  for (let h = inicio; h < fin; h++) {
    horas.push(formatoHora(h, 0));
    horas.push(formatoHora(h, 30));
  }
  return horas;
}

function formatoHora(h: number, min: number) {
  const sufijo = h >= 12 ? "p.m." : "a.m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(min).padStart(2, "0")} ${sufijo}`;
}

export function hoyISO(): string {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

export function fechaLegible(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y ?? 2026, (m ?? 1) - 1, d ?? 1).toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
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
    `NOTE:Barbería en Monterrey. Instagram ${NEGOCIO.instagramHandle}`,
    "END:VCARD",
  ].join("\r\n");
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tres-r-barberia.vcf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
