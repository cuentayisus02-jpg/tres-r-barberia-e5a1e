import { MessageCircle, CalendarClock } from "lucide-react";
import { NEGOCIO } from "@/lib/tresr";

export function BarraFija() {
  return (
    <>
      <a
        href={NEGOCIO.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 active:scale-95 md:bottom-8"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="grid grid-cols-2 gap-3">
          <a
            href="#agenda"
            className="flex items-center justify-center gap-2 rounded-md linea-fina px-3 py-3 text-sm font-semibold"
          >
            <CalendarClock className="h-4 w-4" /> Agendar cita
          </a>
          <a
            href={NEGOCIO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md bg-whatsapp px-3 py-3 text-sm font-semibold text-whatsapp-foreground"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
