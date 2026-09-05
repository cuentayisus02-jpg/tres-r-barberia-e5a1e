import { CalendarClock, Home, MapPin, MessageCircle, Scissors } from "lucide-react";
import { NEGOCIO } from "@/lib/tresr";

export function BarraFija() {
  return (
    <>
      <a
        href={NEGOCIO.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos directamente por WhatsApp"
        className="whatsapp-attention fixed bottom-24 right-4 z-40 grid size-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform hover:scale-105 active:scale-95 md:bottom-8"
      >
        <MessageCircle className="size-7" aria-hidden="true" />
      </a>

      <nav
        aria-label="Navegación rápida"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pb-[calc(.65rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
          <NavMovil href="#inicio" texto="Inicio" icono={Home} />
          <NavMovil href="#servicios" texto="Servicios" icono={Scissors} />
          <NavMovil href="#ubicacion" texto="Ubicación" icono={MapPin} />
          <NavMovil href="#agenda" texto="Citas" icono={CalendarClock} destacado />
        </div>
      </nav>
    </>
  );
}

function NavMovil({
  href,
  texto,
  icono: Icono,
  destacado = false,
}: {
  href: string;
  texto: string;
  icono: typeof Home;
  destacado?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[0.68rem] font-semibold transition-colors ${
        destacado
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-accent"
      }`}
    >
      <Icono className="h-4 w-4" />
      {texto}
    </a>
  );
}
