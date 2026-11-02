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
    <section id="visagismo" className="scroll-mt-24 border-t border-border py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-mono uppercase tracking-[0.35em] text-neutral-400">
          Serviços & Visagismo
        </p>
        <h2 className="mt-4 max-w-2xl font-sans text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
          Tradição e precisão em cada detalhe
        </h2>

        {/* View Mobile: Compacto em Linhas (Row List) sem cards volumosos */}
        <div className="mt-10 divide-y divide-border/60 md:hidden">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-neutral-900 text-white">
                  <div className="h-5 w-5">
                    <Icon />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-base font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-400 font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Desktop: Mantém os 3 cards espaçosos em Grid */}
        <div className="mt-14 hidden md:grid md:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-3xl border border-white/10 bg-neutral-900/60 p-8 shadow-2xl transition-all hover:border-white/20 hover:bg-neutral-900"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-neutral-800 text-white transition-colors group-hover:border-white/30">
                  <div className="h-7 w-7">
                    <Icon />
                  </div>
                </div>
                <h3 className="mt-6 font-sans text-2xl font-medium text-white">
                  {service.title}
                </h3>
                <p className="mt-3 leading-7 text-neutral-400 font-light text-sm sm:text-base">
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
