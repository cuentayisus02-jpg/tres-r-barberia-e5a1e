import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import corte from "@/assets/foto-hero.jpg";
import interior from "@/assets/foto-interior.jpg";
import fachada from "@/assets/foto-fachada.jpg";
import { cn } from "@/lib/utils";
import { EtiquetaSeccion, Reveal, Seccion } from "./primitivos";

const IMAGENES = [
  {
    src: corte,
    alt: "Barbero de Tres R realizando un corte dentro de la barbería",
    titulo: "Cortes con detalle",
    texto: "Trabajo real en Tres R Barbería.",
  },
  {
    src: interior,
    alt: "Interior de Tres R Barbería con estaciones, espejos y sillones",
    titulo: "Un espacio para relajarte",
    texto: "El ambiente del local en Barrio Estrella.",
  },
  {
    src: fachada,
    alt: "Fachada de Tres R Barbería en Plaza Point 54, Monterrey",
    titulo: "Aquí te esperamos",
    texto: "Local 7 de Plaza Point 54.",
  },
] as const;

export function Galeria() {
  const [carruselRef, carruselApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [actual, setActual] = useState(0);

  const actualizarSeleccion = useCallback(() => {
    if (!carruselApi) return;
    setActual(carruselApi.selectedScrollSnap());
  }, [carruselApi]);

  useEffect(() => {
    if (!carruselApi) return;
    actualizarSeleccion();
    carruselApi.on("select", actualizarSeleccion);
    carruselApi.on("reInit", actualizarSeleccion);
    return () => {
      carruselApi.off("select", actualizarSeleccion);
      carruselApi.off("reInit", actualizarSeleccion);
    };
  }, [actualizarSeleccion, carruselApi]);

  return (
    <Seccion id="galeria" className="overflow-hidden">
      <Reveal>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <EtiquetaSeccion>Galería real</EtiquetaSeccion>
            <h2 className="mt-4 max-w-[14ch] text-balance text-4xl md:text-6xl">Conoce Tres R</h2>
            <p className="mt-4 max-w-xl text-pretty text-muted-foreground">
              El local, el ambiente y el trabajo que encontrarás cuando vengas a tu cita.
            </p>
          </div>

          <div className="flex gap-2" aria-label="Controles de la galería">
            <button
              type="button"
              onClick={() => carruselApi?.scrollPrev()}
              aria-label="Ver imagen anterior"
              aria-controls="galeria-carrusel"
              className="grid size-12 place-items-center rounded-full linea-fina bg-card transition-transform hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => carruselApi?.scrollNext()}
              aria-label="Ver imagen siguiente"
              aria-controls="galeria-carrusel"
              className="grid size-12 place-items-center rounded-full bg-accent text-accent-foreground transition-transform hover:scale-105 active:scale-95"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div
          id="galeria-carrusel"
          ref={carruselRef}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Fotos de Tres R Barbería"
          className="mt-8 overflow-hidden rounded-xl"
        >
          <div className="flex touch-pan-y">
            {IMAGENES.map((imagen, indice) => (
              <figure
                key={imagen.titulo}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${indice + 1} de ${IMAGENES.length}`}
                className="min-w-0 flex-[0_0_100%] pl-0 md:flex-[0_0_72%] md:pr-4"
              >
                <div className="gallery-frame group relative h-[26rem] overflow-hidden rounded-xl linea-fina bg-card sm:h-[34rem]">
                  <img
                    src={imagen.src}
                    alt={imagen.alt}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={1600}
                    className="h-full w-full object-cover object-center"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-background/88 p-5 backdrop-blur-sm sm:p-7">
                    <h3 className="text-2xl">{imagen.titulo}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{imagen.texto}</p>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-sm tabular-nums text-muted-foreground" aria-live="polite">
            Imagen {actual + 1} de {IMAGENES.length}
          </p>
          <div className="flex gap-2" aria-label="Elegir imagen de la galería">
            {IMAGENES.map((imagen, indice) => (
              <button
                key={imagen.titulo}
                type="button"
                onClick={() => carruselApi?.scrollTo(indice)}
                aria-label={`Ir a la imagen ${indice + 1}: ${imagen.titulo}`}
                aria-current={actual === indice ? "true" : undefined}
                className={cn(
                  "size-3 rounded-full border border-accent transition-transform hover:scale-110",
                  actual === indice ? "scale-110 bg-accent" : "bg-transparent",
                )}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </Seccion>
  );
}
