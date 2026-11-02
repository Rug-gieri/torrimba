import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92dvh] sm:min-h-screen items-center overflow-hidden pt-24 pb-12 sm:pb-16">
      {/* Background Cinematográfico - Imagem com gradiente refinado */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/torres_header.png"
          alt="Ambiente Barbearia do Torres"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%] lg:hidden"
        />
        {/* Gradiente sutil e equilibrado: escurece a base e o topo garantindo leitura nítida sem sensação de 'abafado' */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background lg:hidden"
        />
        {/* Glow Radial para Desktop */}
        <div
          aria-hidden
          className="pointer-events-none hidden lg:block absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,166,107,0.12),transparent_65%)]"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 w-full lg:grid-cols-2">
        {/* Conteúdo de Texto e Ações */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          
          {/* Tag de boas-vindas com Estrelas perfeitamente alinhadas */}
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-border/80 bg-surface-elevated/70 px-4 py-1.5 backdrop-blur-md">
            <div className="flex items-center gap-0.5 text-accent text-xs">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <span className="text-xs font-semibold text-foreground">5.0</span>
            <span className="h-3 w-px bg-border" />
            <span className="text-[11px] text-foreground-muted">
              Barbearia & Visagismo
            </span>
          </div>

          {/* Subtítulo Dourado */}
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Experiência & Sofisticação
          </p>

          {/* Título Principal */}
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.18] text-foreground tracking-tight max-w-md lg:max-w-none">
            Seu ambiente de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-hover to-accent-muted">
              renovação & estilo.
            </span>
          </h1>

          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-foreground-muted lg:text-lg">
            Estética masculina personalizada em um espaço clássico. Da navalha ao
            visagismo minucioso, elevamos sua imagem e confiança.
          </p>

          {/* Botões de Ação */}
          <div className="mt-7 flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <a
              href="#agendar"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold tracking-wide text-background shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover active:scale-[0.98]"
            >
              Agendar Horário
            </a>
            <a
              href="#reels"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-border-light bg-surface/50 px-8 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              Ver Experiência em Vídeo
            </a>
          </div>

          {/* Destaques Rápidos com Ícones / Texto */}
          <div className="mt-8 pt-6 border-t border-border/50 grid grid-cols-3 gap-3 w-full max-w-sm text-center">
            <div>
              <p className="text-sm font-bold text-accent">1 a 1</p>
              <p className="text-[11px] text-foreground-subtle">Exclusivo</p>
            </div>
            <div className="border-x border-border/40">
              <p className="text-sm font-bold text-accent">Visagismo</p>
              <p className="text-[11px] text-foreground-subtle">Consultoria Facial</p>
            </div>
            <div>
              <p className="text-sm font-bold text-accent">Lounge</p>
              <p className="text-[11px] text-foreground-subtle">Open Bar</p>
            </div>
          </div>
        </div>

        {/* Lado Direito Desktop */}
        <div className="relative hidden lg:block aspect-4/5 w-full max-w-md ml-auto rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-black/80">
          <Image
            src="/torres_header.png"
            alt="Interior da Barbearia do Torres"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
