import { CalendarCheck, MapPin, MessageCircle, Zap } from "lucide-react";
import hero from "@/assets/foto-hero.jpg";
import { enlaceWhatsApp, NEGOCIO } from "@/lib/tresr";
import { Estrellas, Reveal } from "./primitivos";
import { Marca } from "./Encabezado";

export function Hero() {
  return (
    <section id="inicio" className="relative grano overflow-hidden">
      <img
        src={hero}
        alt="Barbero de Tres R Barbería atendiendo a un cliente en el local de Monterrey"
        width={1200}
        height={1600}
        className="hero-photo absolute inset-0 h-full w-full object-cover object-[65%_25%] opacity-40 transition-transform duration-1000 md:object-[60%_30%]"
      />

      <div className="hero-vignette absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28 sm:px-8 md:pb-28 md:pt-36">
        <Reveal>
          <Marca className="h-24 w-24 md:h-28 md:w-28" />
        </Reveal>

        <Reveal delay={80}>
          <span className="mt-7 inline-flex items-center gap-2 rounded-full linea-fina bg-card/70 px-3 py-1.5 text-xs uppercase tracking-[0.2em] text-accent">
            <Zap className="h-3.5 w-3.5" /> Agenda en menos de 1 minuto
          </span>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="mt-5 max-w-[12ch] text-[3.4rem] leading-[0.9] md:text-[6rem]">
            Tu estilo.
            <br />
            <span className="text-accent">Tu lugar.</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            Barbería en Monterrey donde un amigo es tu barbero. Corte, barba y buen ambiente, sin
            prisas y con oficio.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#agenda"
              className="flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 text-base font-semibold text-accent-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              <CalendarCheck className="h-5 w-5" /> Agendar cita en la web
            </a>
            <a
              href={enlaceWhatsApp("Hola Tres R Barbería, quiero agendar una cita.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md bg-whatsapp px-6 py-4 text-base font-semibold text-whatsapp-foreground transition-transform hover:scale-[1.02] active:scale-95"
            >
              <MessageCircle className="h-5 w-5" /> Agendar por WhatsApp
            </a>
            <a
              href={NEGOCIO.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-md linea-fina bg-card/60 px-6 py-4 text-base font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              <MapPin className="h-5 w-5" /> Cómo llegar
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-7 flex items-center gap-3 text-sm text-muted-foreground">
            <Estrellas valor={NEGOCIO.rating} />
            <span>
              <strong className="text-foreground">{NEGOCIO.rating}</strong> · {NEGOCIO.resenas}{" "}
              reseñas en Google
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
