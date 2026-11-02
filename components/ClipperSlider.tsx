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
    const thumbHeight = 28; // altura da chave proporcional ao trilho de 68px
    const maxDistance = trackHeight - thumbHeight - 6; // limites do trilho

    // Arrastar para cima: startY - clientY é positivo
    const deltaY = startYRef.current - e.clientY;
    const currentProgress = Math.min(Math.max(deltaY / maxDistance, 0), 1);

    setDragProgress(currentProgress);

    if (currentProgress >= 0.85) {
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
    <div className="flex items-center gap-3.5 select-none">
      {/* Texto no lado esquerdo */}
      <div className="flex flex-col items-end text-right">
        <span className="text-sm sm:text-base font-semibold tracking-wide text-neutral-100">
          {isActivated ? "Ligando..." : "Cortar agora"}
        </span>
        <span className="text-[10px] text-neutral-400 font-light mt-0.5">
          {isActivated ? "Indo para horários..." : "Deslize para cima"}
        </span>
      </div>

      {/* Botão Switch com trilho reduzido em 30% na altura (68px) */}
      <div className="relative flex flex-col items-center">
        {/* Marcador ON no topo */}
        <div className="flex items-center gap-1 mb-1">
          <span
            className={`h-1 w-1 rounded-full transition-all duration-300 ${
              isActivated || dragProgress > 0.8
                ? "bg-emerald-400 shadow-[0_0_6px_#34d399]"
                : "bg-neutral-600"
            }`}
          />
          <span className="text-[8px] font-mono tracking-widest text-neutral-400 uppercase">
            ON
          </span>
        </div>

        {/* Trilho Vertical: altura reduzida em 30% (de 96px para 68px), largura mantida em 44px (w-11) */}
        <div
          ref={trackRef}
          className={`relative flex h-[68px] w-11 flex-col justify-end items-center rounded-xl border p-[3px] transition-all duration-300 overflow-hidden ${
            isActivated
              ? "border-neutral-500 bg-neutral-900/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              : "border-neutral-800 bg-[#0c0d0e] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9),0_6px_16px_rgba(0,0,0,0.8)] backdrop-blur-md"
          }`}
        >
          {/* Fendas verticais no fundo do trilho */}
          <div className="pointer-events-none absolute inset-y-2 flex flex-col justify-between opacity-30">
            <span className="w-3 h-[1.5px] bg-neutral-500 rounded-full" />
            <span className="w-3 h-[1.5px] bg-neutral-500 rounded-full" />
            <span className="w-3 h-[1.5px] bg-neutral-500 rounded-full" />
          </div>

          {/* Setas animadas cinza sutil indicando "empurre para cima" */}
          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-neutral-400/40 transition-opacity duration-200"
            style={{ opacity: isActivated ? 0 : Math.max(1 - dragProgress * 2, 0) }}
          >
            <span className="text-[9px] font-mono animate-bounce">▲</span>
          </div>

          {/* Switch / Alavanca Física */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative z-10 flex h-7 w-full cursor-grab active:cursor-grabbing items-center justify-center rounded-lg border border-neutral-600/40 bg-gradient-to-b from-neutral-600 via-neutral-700 to-neutral-800 shadow-[0_3px_8px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)] touch-none"
            style={{
              transform: `translateY(-${
                dragProgress *
                ((trackRef.current?.offsetHeight || 68) - 28 - 6)
              }px)`,
              transition: isDragging
                ? "none"
                : "transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            {/* Ranhuras usinadas em cinza escuro */}
            <div className="flex flex-col gap-[2px] items-center pointer-events-none">
              <span className="w-4 h-[1.5px] rounded-full bg-neutral-900 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
              <span className="w-4 h-[1.5px] rounded-full bg-neutral-900 shadow-[inset_0_1px_1px_rgba(0,0,0,0.8)]" />
            </div>
          </div>
        </div>

        {/* Marcador OFF na base */}
        <span className="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mt-1">
          OFF
        </span>
      </div>
    </div>
  );
}
