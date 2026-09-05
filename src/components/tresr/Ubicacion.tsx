import { MapPin, Clock, Navigation, Phone } from "lucide-react";
import { HORARIOS, NEGOCIO } from "@/lib/tresr";
import { EtiquetaSeccion, Reveal, Seccion } from "./primitivos";

const MAPA_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(NEGOCIO.direccion)}&output=embed`;

export function Ubicacion() {
  return (
    <Seccion id="ubicacion">
      <Reveal>
        <EtiquetaSeccion>Ubicación y horarios</EtiquetaSeccion>
        <h2 className="mt-4 text-4xl md:text-5xl">Dónde encontrarnos</h2>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col overflow-hidden rounded-xl linea-fina bg-card">
            <div className="group relative h-64 overflow-hidden border-b border-border sm:h-72">
              <iframe
                src={MAPA_EMBED}
                title="Mapa de Tres R Barbería en Plaza Point 54"
                aria-hidden="true"
                tabIndex={-1}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none h-full w-full opacity-85 grayscale-[0.15] transition-opacity duration-500 group-hover:opacity-100"
              />
              <a
                href={NEGOCIO.maps}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir la ubicación de Tres R Barbería en Google Maps"
                className="absolute inset-0 flex items-end justify-center bg-background/10 p-4"
              >
                <span className="rounded-full bg-background/90 px-4 py-2 text-xs font-semibold text-foreground shadow-lg">
                  Toca el mapa para abrir Google Maps
                </span>
              </a>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <p className="flex gap-3 text-sm leading-relaxed">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {NEGOCIO.direccion}
              </p>
              <a
                href={`tel:${NEGOCIO.telefonoE164}`}
                className="flex gap-3 text-sm transition-colors hover:text-accent"
              >
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                {NEGOCIO.telefono}
              </a>
              <a
                href={NEGOCIO.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95"
              >
                <Navigation className="h-4 w-4" /> Abrir en Google Maps
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="h-full rounded-xl linea-fina bg-card p-6">
            <h3 className="flex items-center gap-2 text-2xl">
              <Clock className="h-5 w-5 text-accent" /> Horario
            </h3>
            <table className="mt-5 w-full text-sm">
              <tbody>
                {HORARIOS.map((h) => (
                  <tr key={h.dia} className="border-b border-border/60 last:border-0">
                    <th scope="row" className="py-3 text-left font-semibold">
                      {h.dia}
                    </th>
                    <td className="py-3 text-right text-muted-foreground">{h.horas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Horario del local en Monterrey (hora del centro de México). Te recomendamos confirmar
              tu cita por WhatsApp antes de venir.
            </p>
          </div>
        </Reveal>
      </div>
    </Seccion>
  );
}
