import Image from "next/image";

export default function Hero() {
  return (
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
  );
}