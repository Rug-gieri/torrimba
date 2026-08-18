export default function CTA() {
  return (
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
  );
}