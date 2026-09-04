import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Info } from "lucide-react";
import {
  SERVICIOS,
  enlaceWhatsApp,
  fechaLegible,
  horasDisponibles,
  hoyISO,
} from "@/lib/tresr";
import { EtiquetaSeccion, Reveal, Seccion } from "./primitivos";

const campo =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-ring/40";

export function Agenda({
  servicio,
  setServicio,
}: {
  servicio: string;
  setServicio: (v: string) => void;
}) {
  // "hoy" depende de la zona horaria del cliente: se calcula tras el montaje
  // para que SSR y cliente rendericen lo mismo (sin hydration mismatch).
  const [hoy, setHoy] = useState("");
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    const h = hoyISO();
    setHoy(h);
    setFecha((actual) => actual || h);
  }, []);
  const [hora, setHora] = useState("");
  const [nota, setNota] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});

  const horas = useMemo(() => horasDisponibles(fecha), [fecha]);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (nombre.trim().length < 2) err["nombre"] = "Escribe tu nombre.";
    if (!servicio) err["servicio"] = "Elige un servicio.";
    if (!fecha) err["fecha"] = "Elige una fecha.";
    else if (fecha < hoy) err["fecha"] = "La fecha no puede ser anterior a hoy.";
    if (!hora) err["hora"] = "Elige un horario.";
    setErrores(err);
    if (Object.keys(err).length > 0) return;

    const notaLimpia = nota.trim();
    const mensaje = `Hola Tres R Barbería, soy ${nombre.trim()}. Quiero solicitar una cita para ${servicio} el ${fechaLegible(fecha)} a las ${hora}.${notaLimpia ? ` ${notaLimpia}` : ""}`;
    window.open(enlaceWhatsApp(mensaje), "_blank", "noopener,noreferrer");
  }

  return (
    <Seccion id="agenda">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
        <Reveal>
          <EtiquetaSeccion>Agenda</EtiquetaSeccion>
          <h2 className="mt-4 text-4xl md:text-5xl">Aparta tu lugar</h2>
          <p className="mt-4 text-muted-foreground">
            Llena estos datos y se abrirá WhatsApp con tu solicitud lista para enviar.
          </p>
          <p className="mt-5 flex items-start gap-3 rounded-lg linea-fina bg-card p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Tu cita queda confirmada únicamente cuando la barbería te responde por WhatsApp.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form
            onSubmit={enviar}
            noValidate
            className="rounded-xl linea-fina bg-card p-5 sm:p-7"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="nombre" className="mb-2 block text-sm font-semibold">
                  Nombre
                </label>
                <input
                  id="nombre"
                  className={campo}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  maxLength={60}
                  autoComplete="name"
                />
                {errores["nombre"] && <Error texto={errores["nombre"]} />}
              </div>

              <div>
                <label htmlFor="servicio" className="mb-2 block text-sm font-semibold">
                  Servicio
                </label>
                <select
                  id="servicio"
                  className={campo}
                  value={servicio}
                  onChange={(e) => setServicio(e.target.value)}
                >
                  <option value="">Selecciona un servicio</option>
                  {SERVICIOS.map((s) => (
                    <option key={s.id} value={s.nombre}>
                      {s.nombre}
                    </option>
                  ))}
                </select>
                {errores["servicio"] && <Error texto={errores["servicio"]} />}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fecha" className="mb-2 block text-sm font-semibold">
                    Fecha preferida
                  </label>
                  <input
                    id="fecha"
                    type="date"
                    min={hoy}
                    className={campo}
                    value={fecha}
                    onChange={(e) => {
                      const nueva = e.target.value;
                      setFecha(nueva);
                      setHora((actual) =>
                        actual && horasDisponibles(nueva).includes(actual) ? actual : ""
                      );
                    }}
                  />
                  {errores["fecha"] && <Error texto={errores["fecha"]} />}
                </div>
                <div>
                  <label htmlFor="hora" className="mb-2 block text-sm font-semibold">
                    Hora preferida
                  </label>
                  <select
                    id="hora"
                    className={campo}
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                  >
                    <option value="">Selecciona una hora</option>
                    {horas.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  {errores["hora"] && <Error texto={errores["hora"]} />}
                </div>
              </div>

              <div>
                <label htmlFor="nota" className="mb-2 block text-sm font-semibold">
                  Nota (opcional)
                </label>
                <textarea
                  id="nota"
                  rows={3}
                  maxLength={300}
                  className={campo}
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  placeholder="¿Algo que debamos saber sobre tu corte?"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp px-6 py-4 text-base font-semibold text-whatsapp-foreground transition-transform hover:scale-[1.01] active:scale-95"
              >
                <MessageCircle className="h-5 w-5" /> Enviar solicitud por WhatsApp
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Seccion>
  );
}

function Error({ texto }: { texto: string }) {
  return (
    <p role="alert" className="mt-2 text-sm text-destructive">
      {texto}
    </p>
  );
}
