import { RazorIcon, ScissorsIcon, VisagismIcon } from "./icons";

const services = [
  {
    title: "Corte Clássico",
    description:
      "Tesoura, navalha e acabamento impecável para um visual atemporal, executado com precisão.",
    icon: ScissorsIcon,
  },
  {
    title: "Barba & Navalha",
    description:
      "Toalha quente, navalha e técnicas tradicionais para uma barba marcante e alinhada.",
    icon: RazorIcon,
  },
  {
    title: "Visagismo",
    description:
      "Análise do formato do rosto e do estilo de vida para encontrar o corte que valoriza sua identidade.",
    icon: VisagismIcon,
  },
];

export default function Services() {
  return (
    <section id="visagismo" className="scroll-mt-24 border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
          Visagismo
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
          Tradição e precisão em cada detalhe
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-border bg-surface p-8 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] transition-colors hover:border-border-light"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface-elevated text-metal transition-colors group-hover:text-accent">
                  <div className="h-7 w-7">
                    <Icon />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 leading-7 text-foreground-muted">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}