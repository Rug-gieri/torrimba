import Image from "next/image";

export default function Ambience() {
  return (
    <section id="ambiente" className="scroll-mt-24 border-t border-border bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Cabeçalho da Seção */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.35em] text-neutral-400">
              O Espaço
            </p>
            <h2 className="mt-4 font-sans text-3xl sm:text-5xl font-medium tracking-tight text-white leading-tight">
              Um refúgio clássico feito para você desacelerar.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base leading-relaxed text-neutral-400 font-light">
            Muito além do corte. Um ambiente pensado em cada detalhe, do conforto das cadeiras tradicionais ao espaço de bar e lounge para sua melhor experiência.
          </p>
        </div>

        {/* Mosaico de 3 Fotos de Alto Padrão */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          
          {/* Card Principal / Destaque Grande (Cadeira & Estação de Atendimento) - 7 colunas */}
          <div className="group relative md:col-span-7 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl min-h-[380px] sm:min-h-[460px]">
            <Image
              src="/barber_chair.jpg"
              alt="Cadeira clássica e bancada de atendimento Barbearia do Torres"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Gradiente sutil e legenda no rodapé */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
                Estação de Atendimento
              </span>
              <p className="mt-2 text-lg sm:text-xl font-medium text-white">
                Conforto e precisão clássica
              </p>
              <p className="text-xs text-neutral-400 mt-1 font-light">
                Cadeiras reclináveis para rituais completos de barba e corte.
              </p>
            </div>
          </div>

          {/* Coluna Direita (2 Fotos Menores Empilhadas) - 5 colunas */}
          <div className="flex flex-col gap-5 sm:gap-6 md:col-span-5">
            
            {/* Foto 2: Lounge / Bar */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl h-[230px] sm:h-[240px]">
              <Image
                src="/barber_bar.jpg"
                alt="Espaço Lounge Bar da Barbearia do Torres"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block rounded-full border border-white/15 bg-black/60 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
                  Lounge & Bar
                </span>
                <p className="mt-1.5 text-base font-medium text-white">
                  Café & Confraternização
                </p>
              </div>
            </div>

            {/* Foto 3: Fachada / Espaço Externo */}
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl h-[230px] sm:h-[240px]">
              <Image
                src="/barber_out.jpg"
                alt="Fachada e ambiente externo Barbearia do Torres em Porto Velho"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-block rounded-full border border-white/15 bg-black/60 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white backdrop-blur-md">
                  Porto Velho / RO
                </span>
                <p className="mt-1.5 text-base font-medium text-white">
                  Fachada Exclusiva & Fácil Acesso
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
