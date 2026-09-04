import { ArrowRight, Scissors } from "lucide-react";
import { SERVICIOS } from "@/lib/tresr";
import { EtiquetaSeccion, Reveal, Seccion } from "./primitivos";

export function Servicios({ onElegir }: { onElegir: (nombre: string) => void }) {
  return (
    <Seccion id="servicios">
      <Reveal>
        <EtiquetaSeccion>Servicios</EtiquetaSeccion>
        <h2 className="mt-4 max-w-[14ch] text-4xl md:text-6xl">Cortes con oficio, sin prisas</h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Elige el servicio y te llevamos directo a la agenda con todo preseleccionado.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {SERVICIOS.map((s, i) => (
          <Reveal key={s.id} delay={i * 70}>
            <button
              type="button"
              onClick={() => onElegir(s.nombre)}
              className="group flex h-full w-full flex-col items-start rounded-xl linea-fina bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-accent/70 active:scale-[0.99]"
            >
              <Scissors className="h-6 w-6 text-accent" />
              <h3 className="mt-4 text-2xl leading-tight">{s.nombre}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detalle}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                Consulta disponibilidad
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </Seccion>
  );
}
