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
  const [isHovered, setIsHovered] = useState(false);
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

    // Altura do trilho: 74px | Altura da chave: 46px | Curso: 20px
    const maxDistance = 20;
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
    // Soltou antes do estalo: chave cai de volta suavemente
    setDragProgress(0);
  };

  // Clique em qualquer parte (texto ou chave) dispara a ativação
  const handleClick = () => {
    if (isActivated) return;
    triggerActivation();
  };

  // Efeito visual quando em hover (sobe levemente 30% como pré-ignição)
  const effectiveProgress = isActivated
    ? 1
    : isDragging
    ? dragProgress
    : isHovered
    ? 0.35
    : 0;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label="Cortar agora - Ligar máquina de agendamento"
      className="group flex items-center gap-3.5 select-none cursor-pointer"
    >
      {/* Texto no lado esquerdo com hover interativo */}
      <div className="flex flex-col items-end text-right transition-transform duration-200 group-hover:-translate-x-1">
        <span
          className={`text-sm sm:text-base font-semibold tracking-wide transition-colors duration-200 ${
            isActivated
              ? "text-emerald-400"
              : isHovered
              ? "text-white underline decoration-white/30 underline-offset-4"
              : "text-neutral-100"
          }`}
        >
          {isActivated ? "Ligando..." : "Cortar agora"}
        </span>
      </div>

      {/* Conjunto da Chave Seletora Industrial */}
      <div className="relative flex flex-col items-center">
        {/* Plaquinha superior com LED ON */}
        <div className="flex items-center justify-between w-12 px-1 mb-1">
          <span
            className={`text-[8px] font-mono tracking-wider font-bold uppercase transition-colors duration-200 ${
              isActivated || effectiveProgress > 0.8
                ? "text-white"
                : isHovered
                ? "text-neutral-300"
                : "text-[#4a4d50]"
            }`}
          >
            ON
          </span>
          <span
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              isActivated || effectiveProgress > 0.8
                ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                : isHovered
                ? "bg-emerald-500/50"
                : "bg-[#2a2d30]"
            }`}
          />
        </div>

        {/* Trilho Rebaixado com borda rgb(95, 95, 95) */}
        <div
          ref={trackRef}
          style={{ borderColor: "rgb(95, 95, 95)" }}
          className={`relative flex h-[74px] w-12 flex-col justify-end items-center rounded-xl border p-[3px] transition-all duration-300 overflow-hidden ${
            isActivated
              ? "bg-neutral-900 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              : isHovered
              ? "bg-[#0f1012] shadow-[inset_0_3px_8px_rgba(0,0,0,0.9),0_6px_20px_rgba(255,255,255,0.06)]"
              : "bg-[#08090a] shadow-[inset_0_3px_8px_rgba(0,0,0,0.95),0_6px_16px_rgba(0,0,0,0.8)]"
          }`}
        >
          {/* Fundo do nicho com textura usinada de parafuso */}
          <div className="pointer-events-none absolute inset-x-2 top-2 h-4 border-b border-neutral-800/80 flex items-center justify-center opacity-40">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-700 shadow-inner" />
          </div>

          {/* CHAVE SELETORA ROBUSTA */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              backgroundColor: isHovered && !isActivated ? "#4e4f50" : "#444545",
              borderColor: "rgb(95, 95, 95)",
              transform: `translateY(-${effectiveProgress * 20}px)`,
              transition: isDragging
                ? "none"
                : "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s",
            }}
            className="relative z-10 flex h-[46px] w-full cursor-grab active:cursor-grabbing flex-col justify-between rounded-lg border p-1 shadow-[0_4px_12px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)] touch-none"
          >
            {/* Crista de topo da chave */}
            <div className="h-[2px] w-full rounded-full bg-white/20" />

            {/* Grip Tátil: Nervuras horizontais */}
            <div className="flex flex-col gap-[3px] items-center my-auto pointer-events-none">
              <span className="w-6 h-[2.5px] rounded-full bg-neutral-950/90 shadow-[inset_0_1px_1px_rgba(0,0,0,0.9),0_0.5px_0.5px_rgba(255,255,255,0.15)]" />
              <span className="w-6 h-[2.5px] rounded-full bg-neutral-950/90 shadow-[inset_0_1px_1px_rgba(0,0,0,0.9),0_0.5px_0.5px_rgba(255,255,255,0.15)]" />
              <span className="w-6 h-[2.5px] rounded-full bg-neutral-950/90 shadow-[inset_0_1px_1px_rgba(0,0,0,0.9),0_0.5px_0.5px_rgba(255,255,255,0.15)]" />
            </div>

            {/* Base chanfrada da alavanca */}
            <div className="h-[2px] w-full rounded-full bg-black/40" />
          </div>
        </div>

        {/* Marcador OFF na base */}
        <div className="flex items-center justify-center w-12 mt-1">
          <span className="text-[8px] font-mono tracking-wider text-[#4a4d50] font-bold uppercase">
            OFF
          </span>
        </div>
      </div>
    </div>
  );
}
