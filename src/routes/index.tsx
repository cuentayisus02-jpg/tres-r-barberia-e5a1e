import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Encabezado } from "@/components/tresr/Encabezado";
import { Hero } from "@/components/tresr/Hero";
import { AccionesRapidas } from "@/components/tresr/AccionesRapidas";
import { Servicios } from "@/components/tresr/Servicios";
import { Experiencia } from "@/components/tresr/Experiencia";
import { Agenda } from "@/components/tresr/Agenda";
import { Resenas } from "@/components/tresr/Resenas";
import { Ubicacion } from "@/components/tresr/Ubicacion";
import { Cierre, PieDePagina } from "@/components/tresr/Cierre";
import { BarraFija } from "@/components/tresr/BarraFija";
import { NEGOCIO } from "@/lib/tresr";

const TITULO = "Tres R Barbería | Barbería en Monterrey";
const DESCRIPCION =
  "Barbería en Monterrey: corte clásico y moderno, barba y perfilado. Agenda tu cita por WhatsApp en menos de un minuto. Barrio Estrella, Monterrey, N.L.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRIPCION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "es_MX" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITULO },
      { name: "twitter:description", content: DESCRIPCION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BarberShop",
          name: "Tres R Barbería",
          description: NEGOCIO.descripcion,
          telephone: NEGOCIO.telefonoE164,
          image: [],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Av. de los Astros 101, Plaza Point 54, Local 7, Barrio Estrella",
            addressLocality: "Monterrey",
            addressRegion: "N.L.",
            postalCode: "64100",
            addressCountry: "MX",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.3",
            reviewCount: "16",
          },
          sameAs: [NEGOCIO.instagram, NEGOCIO.maps],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "14:00",
              closes: "22:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: "Saturday",
              opens: "12:00",
              closes: "22:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: "Sunday",
              opens: "11:00",
              closes: "17:00",
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  const [servicio, setServicio] = useState("");

  function elegirServicio(nombre: string) {
    setServicio(nombre);
    document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Encabezado />
      <main>
        <Hero />
        <AccionesRapidas />
        <Servicios onElegir={elegirServicio} />
        <Experiencia />
        <Agenda servicio={servicio} setServicio={setServicio} />
        <Resenas />
        <Ubicacion />
        <Cierre />
      </main>
      <PieDePagina />
      <BarraFija />
    </div>
  );
}
