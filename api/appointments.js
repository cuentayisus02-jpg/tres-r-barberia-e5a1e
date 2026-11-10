import { createHmac } from "node:crypto";
import { isIP } from "node:net";

const services = new Set([
  "Corte",
  "Corte y barba",
  "Solo barba",
  "Delineado de ceja",
  "Línea extra",
]);

const styles = new Set([
  "Moderno",
  "Clásico",
  "Degradado / fade",
  "Taper",
  "Crop texturizado",
  "Ejecutivo",
  "Otro (lo platicamos por WhatsApp)",
]);

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.end(JSON.stringify(body));
}

function text(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength);
}

function currentMonterreyDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Monterrey",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type) => parts.find((item) => item.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function parseDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

function parseTime(value) {
  const match = /^(\d{1,2}):([0-5]\d)\s*(a\.m\.|p\.m\.)$/i.exec(value);
  if (!match) return null;
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const suffix = match[3].toLowerCase();
  if (hour < 1 || hour > 12) return null;
  if (suffix === "a.m.") hour = hour === 12 ? 0 : hour;
  else hour = hour === 12 ? 12 : hour + 12;
  return { hour, minute, sql: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00` };
}

async function supabaseRequest(path, key, body, prefer) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    return await fetch(path, {
      method: "POST",
      headers: {
        apikey: key,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(prefer ? { Prefer: prefer } : {}),
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return send(res, 405, { error: "Método no permitido." });
  }

  const origin = req.headers.origin;
  const host = req.headers.host;
  if (origin && host) {
    try {
      if (new URL(origin).host.toLowerCase() !== host.toLowerCase()) {
        return send(res, 403, { error: "Origen no permitido." });
      }
    } catch {
      return send(res, 403, { error: "Origen no permitido." });
    }
  }

  const contentType = String(req.headers["content-type"] || "").toLowerCase();
  if (!contentType.startsWith("application/json")) {
    return send(res, 415, { error: "Tipo de solicitud no permitido." });
  }

  const contentLength = Number(req.headers["content-length"] || 0);
  if (contentLength > 8000) return send(res, 413, { error: "La solicitud es demasiado grande." });

  const input = req.body;
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return send(res, 400, { error: "Solicitud no válida." });
  }

  if (text(input.website, 160)) return send(res, 200, { ok: true, ignored: true });

  const name = text(input.name, 80);
  const phone = typeof input.phone === "string" ? input.phone.replace(/[\s()+.-]/g, "") : "";
  const service = text(input.service, 80);
  const dateString = text(input.date, 10);
  const timeString = text(input.time, 20);
  const style = text(input.style, 80);
  const note = text(input.note, 240);
  const date = parseDate(dateString);
  const time = parseTime(timeString);

  if (
    name.length < 2 ||
    !/^[0-9]{10,15}$/.test(phone) ||
    !services.has(service) ||
    !date ||
    dateString < currentMonterreyDate() ||
    !time ||
    (style && !styles.has(style))
  ) {
    return send(res, 400, { error: "Revisa los datos de la cita." });
  }

  const weekday = date.getUTCDay();
  const minutes = time.hour * 60 + time.minute;
  const open = weekday === 6 ? 13 * 60 : 14 * 60;
  const close = weekday === 6 ? 20 * 60 + 30 : 21 * 60 + 30;
  if (weekday === 0 || minutes < open || minutes > close || time.minute % 30 !== 0) {
    return send(res, 400, { error: "Ese día u horario está fuera del horario de atención." });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !secretKey || !/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(supabaseUrl)) {
    return send(res, 503, { error: "La agenda no está configurada todavía." });
  }

  const clientIp = String(req.headers["x-real-ip"] || "").trim();
  if (!clientIp || !isIP(clientIp)) {
    return send(res, 503, { error: "No se pudo verificar la solicitud. Intenta de nuevo." });
  }

  const ipHash = createHmac("sha256", secretKey).update(clientIp).digest("hex");
  try {
    const limitResponse = await supabaseRequest(
      `${supabaseUrl}/rest/v1/rpc/consume_booking_rate_limit`,
      secretKey,
      { p_ip_hash: ipHash },
    );
    if (!limitResponse.ok) throw new Error("rate-limit");
    const allowed = await limitResponse.json();
    if (allowed !== true) return send(res, 429, { error: "Por seguridad, espera un momento antes de enviar otra solicitud." });

    const insertResponse = await supabaseRequest(
      `${supabaseUrl}/rest/v1/appointment_requests`,
      secretKey,
      {
        name,
        phone,
        service,
        requested_date: dateString,
        requested_time: time.sql,
        style: style || null,
        note: note || null,
      },
      "return=minimal",
    );
    if (!insertResponse.ok) throw new Error("database-insert");
    return send(res, 201, { ok: true });
  } catch {
    return send(res, 503, { error: "No se pudo guardar la solicitud. Intenta de nuevo o continúa por WhatsApp." });
  }
}
