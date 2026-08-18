import Image from "next/image";
import { BeforeAfterIcon } from "./icons";

const transformations = [
  { label: "Corte clássico", src: "/antesdepois1.jpg" },
  { label: "Barba alinhada", src: "/antesdepois2.jpg" },
  { label: "Restauração", src: "/antesdepois3.jpg" },
];

export default function Transformations() {
  return (
    <section id="transformacoes" className="scroll-mt-24 border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
            Antes e depois
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Transformações que falam por si
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-foreground-muted">
            Resultados reais do nosso visagismo, no antes e depois de cada
            cliente.
          </p>
        </div>
        <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {transformations.map((item) => (
            <figure
              key={item.label}
              className="w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] transition-colors hover:border-border-light sm:w-[60%] md:w-auto"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.src}
                  alt={`Antes e depois — ${item.label}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex items-center gap-3 border-t border-border p-5">
                <BeforeAfterIcon />
                <span className="text-sm font-medium text-foreground">
                  {item.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}