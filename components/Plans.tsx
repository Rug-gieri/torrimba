import { CheckIcon } from "./icons";

const plans = [
  {
    name: "Ilimitado",
    price: "R$ 99,90",
    description: "Corte ou barba quando quiser, todo mês.",
    features: [
      "Corte ou barba ilimitados",
      "10% de desconto em serviços extras e produtos",
    ],
    featured: false,
  },
  {
    name: "Premium Ilimitado",
    price: "R$ 179,90",
    description: "O pacote completo, sem limites.",
    features: [
      "Corte e barba ilimitados",
      "10% de desconto em serviços extras e produtos",
    ],
    featured: true,
  },
  {
    name: "Básico",
    price: "R$ 79,90",
    description: "Para uma rotina simples e garantida.",
    features: [
      "2 cortes ou 4 barbas por mês",
      "10% de desconto em serviços extras e produtos",
    ],
    featured: false,
  },
];

export default function Plans() {
  return (
    <section id="clube" className="scroll-mt-24 border-t border-border bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
            Clube de assinaturas
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Viva a barbearia todos os meses
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-foreground-muted">
            Um clube pensado para a sua rotina, com horários garantidos,
            atendimento exclusivo e benefícios pensados em você.
          </p>
        </div>
        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] ${
                plan.featured
                  ? "border border-accent/60 bg-surface-elevated"
                  : "border border-border bg-surface"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-accent/60 bg-surface px-4 py-1 text-xs font-medium uppercase tracking-widest text-accent">
                  Mais escolhido
                </span>
              )}
              <h3 className="font-display text-2xl font-medium text-foreground">
                {plan.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-foreground-muted">
                {plan.description}
              </p>
              <p className="mt-6 font-display text-4xl font-medium text-foreground">
                {plan.price}
                <span className="ml-1 text-base font-normal text-foreground-muted">
                  /mês
                </span>
              </p>
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-border-light to-transparent" />
              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-foreground-muted">
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#agendar"
                className={`mt-8 inline-flex h-11 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  plan.featured
                    ? "bg-accent text-background hover:bg-accent-hover"
                    : "border border-border-light text-foreground hover:border-accent/60 hover:text-accent"
                }`}
              >
                Assinar agora
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}