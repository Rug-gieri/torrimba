export default function Agendar() {
  return (
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
  );
}