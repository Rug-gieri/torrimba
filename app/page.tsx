import Image from "next/image";

const navLinks = [
  { href: "#visagismo", label: "Visagismo" },
  { href: "#transformacoes", label: "Antes e Depois" },
  { href: "#reels", label: "Reels" },
  { href: "#clube", label: "Clube" },
  { href: "#contato", label: "Contato" },
];

const services = [
  {
    title: "Corte Clássico",
    description:
      "Tesoura, navalha e acabamento impecável para um visual atemporal, executado com precisão.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Barba & Navalha",
    description:
      "Toalha quente, navalha e técnicas tradicionais para uma barba marcante e alinhada.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 17l8-8" />
        <path d="M11 9l4-4 4 4-4 4z" />
        <path d="M19 5l2-2" />
      </svg>
    ),
  },
  {
    title: "Visagismo",
    description:
      "Análise do formato do rosto e do estilo de vida para encontrar o corte que valoriza sua identidade.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      </svg>
    ),
  },
];

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

const reels = [
  { label: "Corte clássico" },
  { label: "Barba na navalha" },
  { label: "Toalha quente" },
  { label: "Visagismo" },
  { label: "Transformação" },
  { label: "Resultado final" },
];

const transformations = [
  { label: "Corte clássico" },
  { label: "Barba alinhada" },
  { label: "Restauração" },
];

function BeforeAfterIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-7 w-7 text-metal"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M3 12h18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-accent"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <a href="#" className="flex items-center">
            <Image
              src="/torres_logo.png"
              alt="Barbearia do Torres"
              width={54}
              height={36}
              className="h-10 w-auto"
            />
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#agendar"
              className="hidden h-10 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-background transition-colors hover:bg-accent-hover md:inline-flex"
            >
              Agendar horário
            </a>
            <details className="group relative md:hidden">
              <summary
                aria-label="Abrir menu"
                className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-border text-foreground"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
              </summary>
              <div className="absolute right-0 top-12 w-64 rounded-2xl border border-border bg-surface p-4 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href="#agendar"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
                  >
                    Agendar horário
                  </a>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,166,107,0.08),transparent_60%)]"
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:py-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
<Image
              src="/torres_logo.png"
              alt="Logo Barbearia do Torres"
              width={720}
              height={480}
              priority
              className="h-auto w-full max-w-[300px] lg:max-w-[320px]"
            />
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.4em] text-accent">
              Visagismo | Elegância | Sofisticação
            </p>
            <h1 className="mt-5 font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
              Seu ambiente de renovação
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-foreground-muted lg:text-lg lg:leading-8">
              Estética para homens em um espaço clássico com acabamento
              moderno. Tradição e precisão em cada detalhe do seu visual.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#agendar"
                className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
              >
                Agendar horário
              </a>
              <a
                href="#visagismo"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border-light px-8 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
              >
                Conhecer a experiência
              </a>
            </div>
          </div>
          <div className="relative mx-auto aspect-4/5 w-full max-w-sm bg-black rounded-2xl lg:mx-0 lg:max-w-md lg:-mr-[calc((80vw-52rem)/2+1.5rem)]">
            <div className="absolute inset-x-0 -top-16 bottom-0 overflow-hidden rounded-b-2xl">
              <Image
                src="/torres_header.png"
                alt="Interior da Barbearia do Torres"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl "
            />
          </div>
        </div>
      </section>

      <section id="visagismo" className="scroll-mt-24 border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
            Visagismo
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Tradição e precisão em cada detalhe
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-border bg-surface p-8 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] transition-colors hover:border-border-light"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface-elevated text-metal transition-colors group-hover:text-accent">
                  <div className="h-7 w-7">{service.icon}</div>
                </div>
                <h3 className="mt-6 font-display text-2xl font-medium text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 leading-7 text-foreground-muted">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              Resultados reais do nosso visagismo. Em breve, o registro
              completo de cada transformação.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {transformations.map((item) => (
              <div
                key={item.label}
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] transition-colors hover:border-border-light"
              >
                <div className="relative aspect-[4/5]">
                  <div className="absolute inset-0 flex flex-col">
                    <div className="flex flex-1 flex-col items-center justify-center gap-3 border-b border-border bg-surface-elevated">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-metal">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                      </span>
                      <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
                        Antes
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-metal">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path d="M12 5v14" />
                          <path d="M5 12h14" />
                        </svg>
                      </span>
                      <span className="text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
                        Depois
                      </span>
                    </div>
                  </div>
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent">
                    Em breve
                  </span>
                </div>
                <div className="flex items-center gap-3 border-t border-border p-5">
                  <BeforeAfterIcon />
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reels" className="scroll-mt-24 border-t border-border bg-surface/40 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
                Reels
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
                A barbearia em movimento
              </h2>
            </div>
            <a
              href="https://www.instagram.com/barbeariadotorres/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground-muted transition-colors hover:text-accent"
            >
              @barbeariadotorres
            </a>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {reels.map((reel) => (
              <div
                key={reel.label}
                className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border-light bg-surface-elevated text-metal">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-0.5 h-4 w-4"
                    >
                      <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l10.5-6.86a1.04 1.04 0 0 0 0-1.76L9.56 4.26A1.03 1.03 0 0 0 8 5.14Z" />
                    </svg>
                  </span>
                  <span className="px-3 text-center text-xs font-medium tracking-wide text-foreground-muted">
                    {reel.label}
                  </span>
                </div>
                <span className="absolute inset-x-0 bottom-0 flex h-14 items-end justify-center bg-gradient-to-t from-background/80 to-transparent pb-2 text-[10px] uppercase tracking-[0.3em] text-foreground-muted">
                  Em breve
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <section className="border-t border-border py-24 sm:py-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
            Barbearia do Torres
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Sua renovação começa aqui
          </h2>
          <p className="mt-5 max-w-xl leading-7 text-foreground-muted">
            Reserve seu horário e viva a experiência de uma barbearia
            tradicional elevada a um padrão premium.
          </p>
          <a
            href="#agendar"
            className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Agendar horário
          </a>
        </div>
      </section>

      <section id="agendar" className="scroll-mt-24 border-t border-border bg-surface/40 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
            Agendamento
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
            Reserve seu horário
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-foreground-muted">
            Fale conosco pelo WhatsApp ou ligue para a barbearia. Atendemos
            em Pôrto Velho/RO, de terça a sábado, das 9h às 20h.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="https://wa.me/556993303027?text=Ol%C3%A1%2C%20quero%20agendar%20um%20hor%C3%A1rio%20na%20Barbearia%20do%20Torres."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
            >
              Chamar no WhatsApp
            </a>
            <a
              href="tel:+556993303027"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border-light px-8 text-sm font-medium text-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              Ligar para a barbearia
            </a>
          </div>
        </div>
      </section>

      <footer id="contato" className="scroll-mt-24 border-t border-border bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-3">
          <div>
            <Image
              src="/torres_logo.png"
              alt="Barbearia do Torres"
              width={108}
              height={72}
              className="h-12 w-auto"
            />
            <p className="mt-4 text-sm leading-6 text-foreground-muted">
              Barbearia do Torres, em Pôrto Velho/RO. Seu ambiente de
              renovação.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
              Navegação
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
              Contato
            </h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-foreground-muted">
              <li>Rua Clara Nunes, 5969 — Pôrto Velho/RO, 76824-210</li>
              <li>
                <a href="tel:+556993303027" className="transition-colors hover:text-foreground">
                  (69) 9330-3027
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/barbeariadotorres/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  @barbeariadotorres
                </a>
              </li>
              <li>Ter–Sáb, 9h às 20h</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-6xl px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <p className="mt-6 text-center text-xs text-foreground-muted">
            © 2026 Barbearia do Torres. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
