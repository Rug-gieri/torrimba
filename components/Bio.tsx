import Image from "next/image";

export default function Bio() {
  return (
    <section id="sobre" className="scroll-mt-24 border-t border-border bg-[#08090a] py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Foto do Guilherme Torres (5 colunas) */}
          <div className="relative mx-auto w-full max-w-md lg:col-span-5">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)]">
              <Image
                src="/torres_header.png"
                alt="Guilherme Torres — Barbearia do Torres em Porto Velho"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-center"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
              />

              {/* Tag Flutuante Glass */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-black/60 p-4 backdrop-blur-md">
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Fundador & Visagista
                </p>
                <p className="mt-0.5 text-base font-semibold text-white">
                  Guilherme Torres
                </p>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Porto Velho — Rondônia
                </p>
              </div>
            </div>
          </div>

          {/* Biografia Enxuta (7 colunas) */}
          <div className="flex flex-col items-start lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-neutral-400">
              Guilherme Torres
            </span>

            <h2 className="mt-3 font-sans text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
              A precisão da técnica aliada à sua identidade.
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-neutral-300 font-light">
              Unindo a tradição da navalha à consultoria visagista, cada atendimento é personalizado para valorizar seus traços e elevar sua confiança em um ambiente exclusivo em Porto Velho.
            </p>

            {/* Pilares Diretos e Rápidos */}
            <div className="mt-8 grid grid-cols-3 gap-3 w-full border-t border-border pt-6">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">1 a 1</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Exclusivo</p>
              </div>
              <div className="border-x border-border/40 px-2 sm:px-4">
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">Visagismo</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">Sob medida</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">5.0 ★</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">No Google</p>
              </div>
            </div>

            {/* Chamada para Ação */}
            <div className="mt-8">
              <a
                href="#agendar"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-xs sm:text-sm font-semibold tracking-wide text-black transition-all hover:bg-neutral-200 active:scale-[0.98] shadow-lg shadow-white/5"
              >
                Conhecer a experiência
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
