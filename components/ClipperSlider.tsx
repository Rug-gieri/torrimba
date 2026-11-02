"use client";

import { useState, useRef, useCallback } from "react";

interface ClipperSliderProps {
  onUnlock?: () => void;
  targetId?: string;
}

export default function ClipperSlider({
  onUnlock,
  targetId = "agendar",
}: ClipperSliderProps) {
  const [dragProgress, setDragProgress] = useState(0); // 0 (baixo/OFF) a 1 (cima/ON)
  const [isDragging, setIsDragging] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef(0);

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
        // Reseta suave após 1.4s
        setTimeout(() => {
          setIsActivated(false);
          setDragProgress(0);
        }, 1400);
      }, 300);
    }
  }, [onUnlock, targetId]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isActivated) return;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    startYRef.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isActivated || !trackRef.current) return;

    const trackHeight = trackRef.current.offsetHeight;
    const thumbHeight = 44; // altura do switch
    const maxDistance = trackHeight - thumbHeight - 8; // limites do trilho

    // Arrastar para cima: startY - clientY é positivo
    const deltaY = startYRef.current - e.clientY;
    const currentProgress = Math.min(Math.max(deltaY / maxDistance, 0), 1);

    setDragProgress(currentProgress);

    if (currentProgress >= 0.88) {
      setIsDragging(false);
      triggerActivation();
    }
  };

  const handlePointerUp = () => {
    if (!isDragging || isActivated) return;
    setIsDragging(false);
    // Soltou antes de ligar: chave cai de volta suavemente
    setDragProgress(0);
  };

  return (
    <div className="flex items-center gap-4 select-none">
      {/* Texto no lado esquerdo */}
      <div className="flex flex-col items-end text-right">
        <span className="text-base font-semibold tracking-wide text-white">
          {isActivated ? "Ligando..." : "Cortar agora"}
        </span>
        <span className="text-[11px] text-white/50 font-light mt-0.5">
          {isActivated ? "Indo para horários..." : "Deslize para cima"}
        </span>
      </div>

      {/* Botão Switch no lado direito */}
      <div className="relative flex flex-col items-center">
        {/* Marcador ON no topo */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              isActivated || dragProgress > 0.8
                ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                : "bg-white/20"
            }`}
          />
          <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">
            ON
          </span>
        </div>

        {/* Trilho Vertical Usinado */}
        <div
          ref={trackRef}
          className={`relative flex h-36 w-14 flex-col justify-end items-center rounded-2xl border p-1 transition-all duration-300 overflow-hidden ${
            isActivated
              ? "border-white bg-white/10 shadow-[0_0_25px_rgba(255,255,255,0.25)]"
              : "border-white/20 bg-neutral-950/90 shadow-[inset_0_3px_8px_rgba(0,0,0,0.9),0_10px_25px_rgba(0,0,0,0.6)] backdrop-blur-md"
          }`}
        >
          {/* Fendas verticais no fundo do trilho */}
          <div className="pointer-events-none absolute inset-y-4 flex flex-col justify-between opacity-20">
            <span className="w-4 h-[2px] bg-white rounded-full" />
            <span className="w-4 h-[2px] bg-white rounded-full" />
            <span className="w-4 h-[2px] bg-white rounded-full" />
            <span className="w-4 h-[2px] bg-white rounded-full" />
            <span className="w-4 h-[2px] bg-white rounded-full" />
          </div>

          {/* Setas animadas indicando "empurre para cima" */}
          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-white/30 transition-opacity duration-200"
            style={{ opacity: isActivated ? 0 : Math.max(1 - dragProgress * 2, 0) }}
          >
            <span className="text-xs font-mono animate-bounce">▲</span>
          </div>

          {/* Switch / Alavanca Física de Polegar */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative z-10 flex h-11 w-full cursor-grab active:cursor-grabbing items-center justify-center rounded-xl bg-gradient-to-b from-neutral-200 via-neutral-300 to-neutral-400 shadow-[0_4px_10px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.9)] touch-none"
            style={{
              transform: `translateY(-${
                dragProgress *
                ((trackRef.current?.offsetHeight || 144) - 44 - 8)
              }px)`,
              transition: isDragging
                ? "none"
                : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            {/* Ranhuras horizontais para o polegar não escorregar */}
            <div className="flex flex-col gap-[3px] items-center pointer-events-none">
              <span className="w-6 h-[2px] rounded-full bg-neutral-700/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
              <span className="w-6 h-[2px] rounded-full bg-neutral-700/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
              <span className="w-6 h-[2px] rounded-full bg-neutral-700/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
            </div>
          </div>
        </div>

        {/* Marcador OFF na base */}
        <span className="text-[9px] font-mono tracking-widest text-white/30 uppercase mt-1.5">
          OFF
        </span>
      </div>
    </div>
  );
}
