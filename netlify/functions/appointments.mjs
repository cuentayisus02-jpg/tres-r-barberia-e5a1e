import appointmentHandler from "../../api/appointments.js";

export default async function appointments(request, context) {
  const rawBody = request.method === "POST" ? await request.text() : "";
  if (new TextEncoder().encode(rawBody).length > 8000) {
    return new Response(JSON.stringify({ error: "La solicitud es demasiado grande." }), {
      status: 413,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  let body = null;
  if (rawBody) {
    try {
      body = JSON.parse(rawBody);
    } catch {
      return new Response(JSON.stringify({ error: "Solicitud no válida." }), {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
      });
    }
  }

  const headers = Object.fromEntries(request.headers.entries());
  if (context.ip) headers["x-real-ip"] = context.ip;
  if (rawBody) headers["content-length"] = String(new TextEncoder().encode(rawBody).length);

  const req = { method: request.method, headers, body };
  const responseHeaders = new Headers();
  let responseBody = "";
  const res = {
    statusCode: 200,
    setHeader(name, value) {
      responseHeaders.set(name, value);
    },
    end(value = "") {
      responseBody = value;
    },
  };

  await appointmentHandler(req, res);
  return new Response(responseBody, { status: res.statusCode, headers: responseHeaders });
}

export const config = { path: "/api/appointments" };
