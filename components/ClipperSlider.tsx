"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface ClipperSliderProps {
  onUnlock?: () => void;
  targetId?: string;
}

export default function ClipperSlider({
  onUnlock,
  targetId = "agendar",
}: ClipperSliderProps) {
  const [dragProgress, setDragProgress] = useState(0); // 0 a 1
  const [isDragging, setIsDragging] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);

  const triggerActivation = useCallback(() => {
    setIsActivated(true);
    setDragProgress(1);

    // Feedback de vibração tátil no celular se suportado
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([40, 60, 40]);
    }

    if (onUnlock) {
      onUnlock();
    } else if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.hash = targetId;
        }
        // Reseta suave após 1.2s para poder arrastar novamente se quiser
        setTimeout(() => {
          setIsActivated(false);
          setDragProgress(0);
        }, 1200);
      }, 250);
    }
  }, [onUnlock, targetId]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isActivated) return;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isActivated || !trackRef.current) return;

    const trackWidth = trackRef.current.offsetWidth;
    const thumbWidth = 56; // largura do switch
    const maxDistance = trackWidth - thumbWidth - 8; // 8px de padding

    const deltaX = e.clientX - startXRef.current;
    const currentProgress = Math.min(Math.max(deltaX / maxDistance, 0), 1);

    setDragProgress(currentProgress);

    if (currentProgress >= 0.92) {
      setIsDragging(false);
      triggerActivation();
    }
  };

  const handlePointerUp = () => {
    if (!isDragging || isActivated) return;
    setIsDragging(false);
    // Se soltar antes do final, volta suave pro início
    setDragProgress(0);
  };

  return (
    <div className="w-full sm:w-auto min-w-[280px] max-w-[340px] select-none">
      {/* Trilho da Máquina (Slot em relevo emborrachado/metálico) */}
      <div
        ref={trackRef}
        className={`relative flex h-14 items-center rounded-2xl border transition-all duration-300 p-1 overflow-hidden ${
          isActivated
            ? "border-white bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            : "border-white/20 bg-neutral-950/90 shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-md"
        }`}
      >
        {/* Ranhuras laterais da máquina de corte no fundo do trilho */}
        <div className="pointer-events-none absolute inset-x-12 flex justify-between opacity-15">
          <span className="h-4 w-[2px] bg-white rounded-full" />
          <span className="h-4 w-[2px] bg-white rounded-full" />
          <span className="h-4 w-[2px] bg-white rounded-full" />
          <span className="h-4 w-[2px] bg-white rounded-full" />
          <span className="h-4 w-[2px] bg-white rounded-full" />
          <span className="h-4 w-[2px] bg-white rounded-full" />
        </div>

        {/* Texto guia que se esconde conforme você arrasta */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center pl-10 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400 transition-opacity duration-200"
          style={{ opacity: isActivated ? 0 : Math.max(1 - dragProgress * 2.2, 0) }}
        >
          <span>Deslize para ligar</span>
          <span className="ml-1 text-white animate-pulse">»</span>
        </div>

        {/* Mensagem de sucesso quando ativado */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center text-xs font-bold uppercase tracking-[0.25em] text-white transition-opacity duration-200"
          style={{ opacity: isActivated ? 1 : 0 }}
        >
          <span>Máquina ligada! ✂️</span>
        </div>

        {/* Switch / Alavanca física com grip tátil (Thumb) */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative z-10 flex h-12 w-14 cursor-grab active:cursor-grabbing items-center justify-center rounded-xl bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 shadow-[0_4px_10px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.9)] touch-none"
          style={{
            transform: `translateX(${
              dragProgress *
              ((trackRef.current?.offsetWidth || 280) - 56 - 8)
            }px)`,
            transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          {/* Ranhuras de borracha/metal antiderrapante da chave da máquina */}
          <div className="flex gap-[3px] items-center">
            <span className="h-6 w-[2.5px] rounded-full bg-neutral-700/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            <span className="h-6 w-[2.5px] rounded-full bg-neutral-700/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            <span className="h-6 w-[2.5px] rounded-full bg-neutral-700/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
          </div>

          {/* Micro LED indicador ON */}
          <span
            className={`absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
              isActivated || dragProgress > 0.8
                ? "bg-emerald-400 shadow-[0_0_6px_#34d399]"
                : "bg-neutral-500/60"
            }`}
          />
        </div>
      </div>
      
      {/* Legenda sutil abaixo */}
      <p className="mt-2 text-center text-[10px] font-mono tracking-widest uppercase text-white/40">
        Agendamento Imediato
      </p>
    </div>
  );
}
