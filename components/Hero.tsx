"use client";

import { useEffect, useRef } from "react";
import ClipperSlider from "./ClipperSlider";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen items-end lg:items-center justify-center pt-28 pb-10 sm:pb-16 bg-black overflow-hidden"
    >
      {/* Background Cinematográfico - Vídeo posicionado no lado direito no Desktop */}
      <div className="pointer-events-none absolute inset-0 z-0">
        
        {/* Contêiner do vídeo: no desktop ocupa os 55% da direita */}
        <div className="absolute inset-0 lg:left-[45%] lg:right-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/reels/videotex.jpg"
            className="absolute inset-0 h-full w-full object-cover object-[center_35%] lg:object-cover lg:object-center opacity-70 lg:opacity-[0.30]"
          >
            <source src="/reels/videotex.mp4" type="video/mp4" />
          </video>

          {/* Vinheta cinematográfica sobre o vídeo no desktop */}
          <div
            aria-hidden
            className="hidden lg:block absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.65)_80%,rgba(0,0,0,0.95)_100%)]"
          />

          {/* Gradiente sutil à esquerda do vídeo para fusão suave com o fundo preto no desktop */}
          <div
            aria-hidden
            className="hidden lg:block absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-black via-black/70 to-transparent"
          />

          {/* Gradiente superior e inferior para acabamento suave */}
          <div
            aria-hidden
            className="hidden lg:block absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black to-transparent"
          />
          <div
            aria-hidden
            className="hidden lg:block absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent"
          />
        </div>

        {/* Gradiente exclusivo para Mobile (escurece de baixo para cima) */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/30 lg:hidden"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full">
        {/* Conteúdo de Texto e Ações */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left pt-20 sm:pt-0 max-w-xl">
          
          {/* Badge Minimalista */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/60 px-4 py-1.5 backdrop-blur-md shadow-2xl">
            <span className="flex h-1.5 w-1.5 rounded-full bg-white" />
            <span className="text-xs font-medium tracking-wide text-white/90">
              5.0 no Google
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="text-[11px] tracking-wider text-white/60 uppercase">
              Visagismo & Estética
            </span>
          </div>

          {/* Subtítulo com Localização */}
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/50">
            Visagismo Masculino em Porto Velho
          </p>

          {/* Título Principal */}
          <h1 className="mt-3 font-sans text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white max-w-xl">
            Seu ambiente de <br />
            <span className="text-white/60">renovação & estilo.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-white/70 font-light lg:text-lg">
            A tradição da navalha aliada à praticidade e à alta qualidade que o homem moderno exige. Cuidado sob medida para a sua rotina.
          </p>

          {/* Botão de Slide Tátil Chave Seletora */}
          <div className="mt-8 flex w-full sm:w-auto items-center justify-center lg:justify-start">
            <ClipperSlider targetId="agendar" />
          </div>
        </div>
      </div>
    </section>
  );
}
