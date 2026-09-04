import { MessageCircle, Instagram } from "lucide-react";
import { NEGOCIO } from "@/lib/tresr";
import { Reveal, Seccion } from "./primitivos";
import { Marca } from "./Encabezado";

export function Cierre() {
  return (
    <Seccion className="grano border-t border-border bg-secondary/40 text-center">
      <Reveal>
        <h2 className="mx-auto max-w-[16ch] text-4xl md:text-6xl">
          Tu próximo corte <span className="text-accent">empieza aquí</span>
        </h2>
        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={NEGOCIO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md bg-whatsapp px-6 py-4 font-semibold text-whatsapp-foreground transition-transform hover:scale-[1.02] active:scale-95"
          >
            <MessageCircle className="h-5 w-5" /> WhatsApp
          </a>
          <a
            href={NEGOCIO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-md linea-fina bg-card px-6 py-4 font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            <Instagram className="h-5 w-5" /> Instagram
          </a>
        </div>
      </Reveal>
    </Seccion>
  );
}

export function PieDePagina() {
  return (
    <footer className="border-t border-border px-5 pb-32 pt-12 sm:px-8 md:pb-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <Marca className="h-12 w-12 shrink-0" />
          <div className="min-w-0">
            <p className="font-display text-xl leading-none">Tres R Barbería</p>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Monterrey, N.L.
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{NEGOCIO.direccion}</p>

        <div className="text-sm text-muted-foreground">
          <p>Lun–Vie 2:00 p.m.–10:00 p.m.</p>
          <p>Sáb 12:00 p.m.–10:00 p.m.</p>
          <p>Dom 11:00 a.m.–5:00 p.m.</p>
          <a
            href={NEGOCIO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-accent hover:underline"
          >
            {NEGOCIO.instagramHandle}
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 w-full max-w-6xl text-xs text-muted-foreground">
        © 2026 Tres R Barbería
      </p>
    </footer>
  );
}
