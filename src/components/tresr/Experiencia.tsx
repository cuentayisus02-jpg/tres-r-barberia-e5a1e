import { Handshake, Ruler, Sofa } from "lucide-react";
import herramientas from "@/assets/foto-interior.jpg";
import { NEGOCIO } from "@/lib/tresr";
import { EtiquetaSeccion, Reveal, Seccion } from "./primitivos";

const BENEFICIOS = [
  {
    icono: Handshake,
    titulo: "Trato cercano",
    texto: "Aquí un amigo es tu barbero: llegas, platicas y te vas como en casa.",
  },
  {
    icono: Ruler,
    titulo: "Atención al detalle",
    texto: "Cada línea, perfilado y acabado se revisa hasta que queda impecable.",
  },
  {
    icono: Sofa,
    titulo: "Ambiente relajado",
    texto: "Buen ambiente, música y calma para que tu corte sea un rato agradable.",
  },
];

export function Experiencia() {
  return (
    <Seccion id="experiencia" className="bg-secondary/30 grano">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-xl linea-fina">
            <img
              src={herramientas}
              alt="Interior de Tres R Barbería con sus estaciones de trabajo, espejos y sillones"
              loading="lazy"
              width={1200}
              height={1600}
              className="h-72 w-full object-cover object-center sm:h-96 md:h-[30rem]"
            />
          </div>

        </Reveal>

        <div>
          <Reveal>
            <EtiquetaSeccion>Experiencia</EtiquetaSeccion>
            <h2 className="mt-4 text-4xl md:text-5xl">Como en casa</h2>
            <p className="mt-4 border-l-2 border-accent pl-4 text-lg italic leading-relaxed text-foreground/90">
              “{NEGOCIO.descripcion}”
            </p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {BENEFICIOS.map((b, i) => (
              <Reveal key={b.titulo} delay={i * 80}>
                <li className="flex gap-4 rounded-lg linea-fina bg-card p-4">
                  <b.icono className="h-6 w-6 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <h3 className="text-xl leading-none">{b.titulo}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{b.texto}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Seccion>
  );
}
