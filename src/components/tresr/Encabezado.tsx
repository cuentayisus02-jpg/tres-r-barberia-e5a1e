import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import logo from "@/assets/tres-r-logo.png.asset.json";
import { NEGOCIO } from "@/lib/tresr";
import { cn } from "@/lib/utils";

const ENLACES = [
  { href: "#servicios", texto: "Servicios" },
  { href: "#experiencia", texto: "Experiencia" },
  { href: "#resenas", texto: "Reseñas" },
  { href: "#ubicacion", texto: "Ubicación" },
];

export function Marca({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid place-items-center overflow-hidden rounded-md bg-marfil p-1 shadow-[0_2px_10px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <img
        src={logo.url}
        alt="Logo de Tres R Barbería"
        width={96}
        height={96}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export function Encabezado() {
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border/80 bg-background/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 sm:px-8">
        <a href="#inicio" className="flex min-w-0 items-center gap-3">
          <Marca className="h-11 w-11 shrink-0" />
          <span className="min-w-0">
            <span className="block truncate font-display text-xl leading-none tracking-wide">
              Tres R
            </span>
            <span className="block truncate text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
              Barbería
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {ENLACES.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              {e.texto}
            </a>
          ))}
          <a
            href="#agenda"
            className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03] active:scale-95"
          >
            Agendar
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-md linea-fina md:hidden"
        >
          {abierto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="menu-movil"
        hidden={!abierto}
        className="border-t border-border bg-background/98 px-5 py-4 backdrop-blur-md md:hidden"
      >
        <ul className="flex flex-col">
          {ENLACES.map((e) => (
            <li key={e.href}>
              <a
                href={e.href}
                onClick={() => setAbierto(false)}
                className="block border-b border-border/60 py-3 text-base text-foreground"
              >
                {e.texto}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={NEGOCIO.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setAbierto(false)}
          className="mt-4 flex items-center justify-center gap-2 rounded-md bg-whatsapp px-4 py-3 font-semibold text-whatsapp-foreground"
        >
          <MessageCircle className="h-5 w-5" /> Agendar por WhatsApp
        </a>
      </div>
    </header>
  );
}
