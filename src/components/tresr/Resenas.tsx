import { ExternalLink } from "lucide-react";
import { NEGOCIO, RESENAS } from "@/lib/tresr";
import { Estrellas, EtiquetaSeccion, Reveal, Seccion } from "./primitivos";

export function Resenas() {
  return (
    <Seccion id="resenas" className="bg-secondary/30">
      <Reveal>
        <EtiquetaSeccion>Reseñas</EtiquetaSeccion>
        <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
          <h2 className="text-4xl md:text-5xl">Lo que dicen</h2>
          <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
            <Estrellas valor={NEGOCIO.rating} />
            {NEGOCIO.rating} · {NEGOCIO.resenas}
          </span>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {RESENAS.map((r, i) => (
          <Reveal key={r.autor} delay={i * 80}>
            <figure className="flex h-full flex-col rounded-xl linea-fina bg-card p-6">
              <Estrellas valor={r.estrellas} />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
                “{r.texto}”
              </blockquote>
              <figcaption className="mt-5 text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {r.autor}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <a
          href={NEGOCIO.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-md linea-fina bg-card px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
        >
          Ver en Google <ExternalLink className="h-4 w-4" />
        </a>
      </Reveal>
    </Seccion>
  );
}
