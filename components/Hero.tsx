import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-end lg:items-center justify-center overflow-hidden pt-28 pb-8 sm:pb-16">
      {/* Background Cinematográfico */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Vídeo visível em telas menores que lg - mais limpo na metade superior */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/reels/videotex.jpg"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] lg:hidden opacity-75"
        >
          <source src="/reels/videotex.mp4" type="video/mp4" />
        </video>

        {/* Gradiente refinado: topo aberto e limpo para mostrar a ação do corte/vapor, escurecendo apenas na base onde fica o texto */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-[#08090a]/85 to-transparent lg:hidden"
        />

        {/* Desktop glow */}
        <div
          aria-hidden
          className="pointer-events-none hidden lg:block absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(198,166,107,0.12),transparent_65%)]"
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 w-full lg:grid-cols-2">
        {/* Conteúdo de Texto e Ações posicionado mais abaixo no mobile para abrir o campo visual do vídeo */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left pt-24 sm:pt-0">
          
          {/* Badge 5.0 Google */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-black/60 px-3.5 py-1 backdrop-blur-md">
            <span className="text-accent text-xs tracking-tight font-bold">★★★★★</span>
            <span className="text-xs font-semibold text-white">5.0</span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-[11px] text-gray-300">
              Barbearia & Visagismo
            </span>
          </div>

          {/* Subtítulo Dourado */}
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Experiência & Sofisticação
          </p>

          {/* Título Principal */}
          <h1 className="mt-2.5 font-display text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.18] text-foreground tracking-tight max-w-md lg:max-w-none">
            Seu ambiente de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-hover to-accent-muted">
              renovação & estilo.
            </span>
          </h1>

          <p className="mt-3 max-w-md text-xs sm:text-base leading-relaxed text-foreground-muted lg:text-lg">
            Estética masculina personalizada em um espaço clássico. Da navalha ao
            visagismo minucioso, elevamos sua imagem e confiança.
          </p>

          {/* Botões de Ação */}
          <div className="mt-6 flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <a
              href="#agendar"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold tracking-wide text-background shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover active:scale-[0.98]"
            >
              Agendar Horário
            </a>
            <a
              href="#reels"
              className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded-full border border-white/20 bg-black/40 px-8 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              Ver Experiência em Vídeo
            </a>
          </div>

          {/* Destaques Rápidos */}
          <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-3 gap-3 w-full max-w-sm text-center">
            <div>
              <p className="text-sm font-bold text-accent">1 a 1</p>
              <p className="text-[11px] text-foreground-subtle">Exclusivo</p>
            </div>
            <div className="border-x border-white/10">
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
