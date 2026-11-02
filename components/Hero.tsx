import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-[92dvh] sm:min-h-screen flex items-end lg:items-center overflow-hidden pt-20 pb-12 sm:pb-16">
      {/* Background Cinematográfico - Imagem com gradiente de alta profundidade no mobile */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/torres_header.png"
          alt="Ambiente Barbearia do Torres"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center lg:hidden scale-105 motion-safe:animate-pulse transition-all duration-1000"
        />
        {/* Camada de Gradiente Mobile: escurece para dar legibilidade luxuosa ao texto */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40 lg:hidden"
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
          
          {/* Badge de Autoridade / Prova Social */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-surface/80 px-3.5 py-1.5 backdrop-blur-md shadow-lg shadow-black/40">
            <div className="flex items-center text-accent text-xs">
              {"★".repeat(5)}
            </div>
            <span className="text-[11px] font-medium tracking-wide text-foreground-muted">
              5.0 no Google • Barbearia & Visagismo
            </span>
          </div>

          {/* Subtítulo Dourado */}
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.35em] text-accent">
            Experiência & Sofisticação
          </p>

          {/* Título Principal de Impacto */}
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.15] text-foreground tracking-tight">
            Seu ambiente de <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-hover to-accent-muted">
              renovação & estilo.
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-foreground-muted lg:text-lg">
            Estética masculina personalizada em um espaço clássico. Da navalha ao
            visagismo minucioso, elevamos sua imagem e confiança.
          </p>

          {/* Botões de Ação Otimizados para Mobile (Thumb-Friendly) */}
          <div className="mt-7 flex flex-col sm:flex-row w-full sm:w-auto gap-3.5">
            <a
              href="#agendar"
              className="inline-flex h-13 sm:h-12 w-full sm:w-auto items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold tracking-wide text-background shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover active:scale-[0.98]"
            >
              Agendar Horário
            </a>
            <a
              href="#reels"
              className="inline-flex h-13 sm:h-12 w-full sm:w-auto items-center justify-center rounded-full border border-border-light bg-surface/60 px-8 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              Ver Experiência em Vídeo
            </a>
          </div>

          {/* Micro Pilares no Rodapé da Hero */}
          <div className="mt-8 pt-6 border-t border-border/40 grid grid-cols-3 gap-2 w-full max-w-md text-center lg:text-left">
            <div>
              <p className="text-xs font-bold text-accent">100%</p>
              <p className="text-[11px] text-foreground-subtle">Personalizado</p>
            </div>
            <div>
              <p className="text-xs font-bold text-accent">Visagismo</p>
              <p className="text-[11px] text-foreground-subtle">Consultoria Facial</p>
            </div>
            <div>
              <p className="text-xs font-bold text-accent">Lounge</p>
              <p className="text-[11px] text-foreground-subtle">Café & Conforto</p>
            </div>
          </div>
        </div>

        {/* Lado Direito Exclusivo para Desktop (Mantém a composição limpa em telas grandes) */}
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
