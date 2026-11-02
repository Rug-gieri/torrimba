import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-end lg:items-center justify-center overflow-hidden pt-28 pb-10 sm:pb-16 bg-black">
      {/* Background Cinematográfico */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Vídeo de Atendimento em loop silencioso */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/reels/videotex.jpg"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] lg:hidden opacity-85"
        >
          <source src="/reels/videotex.mp4" type="video/mp4" />
        </video>

        {/* Gradiente de Alto Padrão: preto puro na base e topo translúcido */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent lg:hidden"
        />

        {/* Desktop glow neutro/monocromático */}
        <div
          aria-hidden
          className="pointer-events-none hidden lg:block absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_65%)]"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 w-full lg:grid-cols-2">
        {/* Conteúdo de Texto e Ações */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left pt-20 sm:pt-0">
          
          {/* Badge Minimalista Apple Style */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-xl shadow-2xl">
            <span className="flex h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-medium tracking-wide text-white/90">
              5.0 no Google
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-[11px] tracking-wider text-white/60 uppercase">
              Visagismo & Estética
            </span>
          </div>

          {/* Subtítulo Clean */}
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">
            Estúdio de Visagismo Masculino
          </p>

          {/* Título Principal */}
          <h1 className="mt-3 font-sans text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white max-w-md lg:max-w-none">
            Seu ambiente de <br className="hidden sm:inline" />
            <span className="text-white/60">renovação & estilo.</span>
          </h1>

          <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-white/70 font-light lg:text-lg">
            Precisão, proporção facial e estética clássica em um ambiente exclusivo.
            Elevamos sua imagem pessoal ao mais alto padrão.
          </p>

          {/* Botões de Ação com Personalidade (Switch / Máquina de Corte) */}
          <div className="mt-8 flex flex-col sm:flex-row w-full sm:w-auto items-center gap-4">
            {/* Botão Switch Clipper: Estilo interruptor tátil de máquina clássica (Wahl/Babyliss) */}
            <a
              href="#agendar"
              className="group relative flex h-14 w-full sm:w-auto min-w-[240px] items-center justify-between rounded-full border border-white/30 bg-gradient-to-b from-neutral-800 to-black p-1.5 pl-5 pr-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all hover:border-white/60 hover:shadow-[0_12px_35px_rgba(255,255,255,0.1)] active:scale-[0.98]"
            >
              {/* Rótulo de Ação */}
              <div className="flex flex-col items-start pr-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 group-hover:text-neutral-300">
                  LIGAR MÁQUINA
                </span>
                <span className="text-sm font-semibold tracking-wide text-white">
                  Alinhar o visual
                </span>
              </div>

              {/* Botão Switch Físico de Metal com Indicador LED */}
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-neutral-100 to-neutral-300 text-black shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_8px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105">
                {/* Ícone Power Switch tátil */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="h-5 w-5 text-neutral-900 transition-transform duration-300 group-hover:rotate-12"
                >
                  <path d="M12 2v6" />
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                </svg>
              </div>
            </a>

            {/* Secundário: Ver Experiência */}
            <a
              href="#reels"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 text-xs font-medium uppercase tracking-wider text-neutral-300 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:border-white/30 active:scale-[0.98]"
            >
              Ver na cadeira
            </a>
          </div>
        </div>

        {/* Lado Direito Desktop */}
        <div className="relative hidden lg:block aspect-4/5 w-full max-w-md ml-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.9)]">
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
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
