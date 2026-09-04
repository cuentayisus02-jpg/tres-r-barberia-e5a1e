import { CalendarClock, MapPin, Instagram, ContactRound } from "lucide-react";
import { NEGOCIO, descargarVCard } from "@/lib/tresr";
import { Reveal } from "./primitivos";

const base =
  "flex flex-col items-center justify-center gap-2 rounded-lg linea-fina bg-card px-3 py-5 text-center text-xs font-semibold uppercase tracking-wider transition-colors hover:border-accent hover:text-accent active:scale-95";

export function AccionesRapidas() {
  return (
    <div className="border-y border-border bg-secondary/40 px-5 py-6 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <a href="#agenda" className={base}>
              <CalendarClock className="h-6 w-6 text-accent" /> Agendar
            </a>
            <a href={NEGOCIO.maps} target="_blank" rel="noopener noreferrer" className={base}>
              <MapPin className="h-6 w-6 text-accent" /> Cómo llegar
            </a>
            <a href={NEGOCIO.instagram} target="_blank" rel="noopener noreferrer" className={base}>
              <Instagram className="h-6 w-6 text-accent" /> Instagram
            </a>
            <button type="button" onClick={descargarVCard} className={base}>
              <ContactRound className="h-6 w-6 text-accent" /> Guardar contacto
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
