import { useEffect, useMemo, useState } from "react";
import { MessageCircle, Info } from "lucide-react";
import {
  SERVICIOS,
  enlaceWhatsApp,
  fechaLegible,
  horasDisponibles,
  hoyISO,
  esDomingo,
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
  const [telefono, setTelefono] = useState("");
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
  const cerrado = esDomingo(fecha);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (nombre.trim().length < 2) err["nombre"] = "Escribe tu nombre.";
    const digitosTelefono = telefono.replace(/\D/g, "");
    if (digitosTelefono.length < 10 || digitosTelefono.length > 13) {
      err["telefono"] = "Escribe un teléfono válido (10 a 13 dígitos).";
    }
    if (!servicio) err["servicio"] = "Elige un servicio.";
    if (!fecha) err["fecha"] = "Elige una fecha.";
    else if (fecha < hoy) err["fecha"] = "La fecha no puede ser anterior a hoy.";
    if (cerrado) err["fecha"] = "Cerrado los domingos. Elige otro día.";
    if (!cerrado && !hora) err["hora"] = "Elige un horario.";
    setErrores(err);
    if (Object.keys(err).length > 0) {
      const primerCampo = Object.keys(err)[0];
      window.requestAnimationFrame(() => document.getElementById(primerCampo)?.focus());
      return;
    }

    const notaLimpia = nota.trim();
    const mensaje = `Hola Tres R Barbería, soy ${nombre.trim()}. Mi teléfono es ${telefono.trim()}. Quiero solicitar una cita para ${servicio} el ${fechaLegible(fecha)} a las ${hora}.${notaLimpia ? ` ${notaLimpia}` : ""}`;
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
          <form onSubmit={enviar} noValidate className="rounded-xl linea-fina bg-card p-5 sm:p-7">
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
                  required
                  aria-invalid={Boolean(errores["nombre"])}
                  aria-describedby={errores["nombre"] ? "nombre-error" : undefined}
                />
                {errores["nombre"] && <Error id="nombre-error" texto={errores["nombre"]} />}
              </div>

              <div>
                <label htmlFor="telefono" className="mb-2 block text-sm font-semibold">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  type="tel"
                  inputMode="tel"
                  className={campo}
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="81 1234 5678"
                  maxLength={20}
                  autoComplete="tel"
                  required
                  aria-invalid={Boolean(errores["telefono"])}
                  aria-describedby={errores["telefono"] ? "telefono-error" : undefined}
                />
                {errores["telefono"] && <Error id="telefono-error" texto={errores["telefono"]} />}
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
                  required
                  aria-invalid={Boolean(errores["servicio"])}
                  aria-describedby={errores["servicio"] ? "servicio-error" : undefined}
                >
                  <option value="">Selecciona un servicio</option>
                  {SERVICIOS.map((s) => (
                    <option key={s.id} value={s.nombre}>
                      {s.nombre}
                    </option>
                  ))}
                </select>
                {errores["servicio"] && <Error id="servicio-error" texto={errores["servicio"]} />}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="fecha" className="mb-2 block text-sm font-semibold">
                    Fecha preferida
                  </label>
                  <input
                    id="fecha"
                    type="date"
                    min={hoy || undefined}
                    className={campo}
                    value={fecha}
                    required
                    aria-invalid={Boolean(errores["fecha"])}
                    aria-describedby={errores["fecha"] ? "fecha-error" : undefined}
                    onChange={(e) => {
                      const nueva = e.target.value;
                      setFecha(nueva);
                      setHora((actual) =>
                        actual && horasDisponibles(nueva).includes(actual) ? actual : "",
                      );
                    }}
                  />
                  {errores["fecha"] && <Error id="fecha-error" texto={errores["fecha"]} />}
                </div>
                <div>
                  <label htmlFor="hora" className="mb-2 block text-sm font-semibold">
                    Hora preferida
                  </label>
                  <select
                    id="hora"
                    className={campo}
                    value={hora}
                    disabled={cerrado}
                    onChange={(e) => setHora(e.target.value)}
                    required={!cerrado}
                    aria-invalid={!cerrado && Boolean(errores["hora"])}
                    aria-describedby={!cerrado && errores["hora"] ? "hora-error" : undefined}
                  >
                    <option value="">
                      {cerrado ? "Cerrado los domingos" : "Selecciona una hora"}
                    </option>
                    {horas.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                  {cerrado && (
                    <p role="status" aria-live="polite" className="mt-2 text-sm text-accent">
                      Cerrado los domingos
                    </p>
                  )}
                  {!cerrado && errores["hora"] && <Error id="hora-error" texto={errores["hora"]} />}
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
                disabled={cerrado}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-whatsapp px-6 py-4 text-base font-semibold text-whatsapp-foreground transition-transform hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <MessageCircle className="size-5" aria-hidden="true" /> Enviar solicitud por
                WhatsApp
              </button>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Tus datos no se guardan en esta página; se usan únicamente para preparar el mensaje
                que tú decides enviar por WhatsApp.
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Seccion>
  );
}

function Error({ id, texto }: { id: string; texto: string }) {
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-destructive">
      {texto}
    </p>
  );
}
