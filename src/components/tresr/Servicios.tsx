import { Clock3, Scissors } from "lucide-react";
import { SERVICIOS } from "@/lib/tresr";
import { EtiquetaSeccion, Reveal, Seccion } from "./primitivos";

export function Servicios({ onElegir }: { onElegir: (nombre: string) => void }) {
  return (
    <Seccion id="servicios">
      <Reveal>
        <EtiquetaSeccion>Precios oficiales</EtiquetaSeccion>
        <h2 className="mt-4 max-w-[14ch] text-4xl md:text-6xl">Nuestros servicios</h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Precios públicos y sin sorpresas. Elige tu servicio y te llevamos directo a la agenda.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {SERVICIOS.map((s, i) => (
          <Reveal key={s.id} delay={i * 70}>
            <button
              type="button"
              onClick={() => onElegir(s.nombre)}
              className="service-card flex h-full w-full flex-col items-start rounded-xl linea-fina bg-card p-5 text-left active:scale-[0.99]"
            >
              <div className="flex w-full items-start justify-between gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent ring-1 ring-accent/25">
                  <Scissors className="service-icon h-5 w-5" />
                </span>
                <strong className="font-display text-2xl tracking-wide text-accent">
                  {s.precio}
                </strong>
              </div>
              <h3 className="mt-4 text-2xl leading-tight">{s.nombre}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.detalle}
              </p>
              <div className="mt-5 flex w-full items-center justify-between gap-3 border-t border-border/60 pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-teal">
                  <Clock3 className="h-3.5 w-3.5" /> {s.duracion}
                </span>
                <span className="service-cta rounded-md bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                  Seleccionar
                </span>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
