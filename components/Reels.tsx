"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const reels = [
  {
    label: "Corte clássico",
    src: "/reels/videocorte.mp4",
    poster: "/reels/videocorte.jpg",
    phrase: "O clássico nunca sai de moda.",
  },
  {
    label: "Transformação",
    src: "/reels/videoguri.mp4",
    poster: "/reels/videoguri.jpg",
    phrase: "Toda mudança começa com confiança.",
  },
  {
    label: "Toalha quente",
    src: "/reels/videotex.mp4",
    poster: "/reels/videotex.jpg",
    phrase: "O ritual que prepara o momento.",
  },
  {
    label: "Visagismo",
    src: "/reels/videovisa.mp4",
    poster: "/reels/videovisa.jpg",
    phrase: "Um corte que fala sobre você.",
  },
];

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export default function Reels() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const mobileVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const desktopGridRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isDesktop) return;

    const video = desktopVideoRef.current;
    const grid = desktopGridRef.current;
    if (!video || !grid) return;

    video.muted = true;
    const play = () => video.play().catch(() => {});

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.3 },
    );
    observer.observe(grid);

    play();

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [isDesktop, activeIndex]);

  useEffect(() => {
    const videos = mobileVideoRefs.current.filter(Boolean) as HTMLVideoElement[];
    if (videos.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            videos.forEach((other) => {
              if (other !== video) other.pause();
            });
            video.muted = true;
            video.loop = true;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 },
    );

    videos.forEach((video) => observer.observe(video));
    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
    };
  }, []);

  return (
    <section id="reels" className="scroll-mt-24 border-t border-border bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="md:hidden">
          <div className="flex flex-col items-start justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
                Reels
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
                A barbearia em movimento
              </h2>
            </div>
            <a
              href="https://www.instagram.com/barbeariadotorres/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground-muted transition-colors hover:text-accent"
            >
              @barbeariadotorres
            </a>
          </div>
          <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {reels.map((reel, index) => (
              <figure
                key={reel.label}
                className="w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]"
              >
                <div className="relative aspect-[9/16]">
                  <video
                    ref={(el) => {
                      mobileVideoRefs.current[index] = el;
                    }}
                    src={reel.src}
                    poster={reel.poster}
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                    className="absolute inset-0 h-full w-full bg-black object-cover"
                  />
                </div>
                <figcaption className="border-t border-border p-3 text-center text-xs font-medium tracking-wide text-foreground-muted">
                  {reel.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div
          ref={desktopGridRef}
          className="hidden items-center gap-14 md:grid md:grid-cols-[minmax(0,420px)_1fr]"
        >
          <figure className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]">
            <div className="relative aspect-[9/16]">
              <video
                key={activeIndex}
                ref={desktopVideoRef}
                src={reels[activeIndex].src}
                poster={reels[activeIndex].poster}
                controls
                autoPlay
                muted
                playsInline
                onEnded={() => setActiveIndex((index) => (index + 1) % reels.length)}
                preload="metadata"
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                className="absolute inset-0 h-full w-full bg-black object-cover"
              />
            </div>
            <button
              type="button"
              aria-label="Reel anterior"
              onClick={() => setActiveIndex((index) => (index - 1 + reels.length) % reels.length)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-surface-elevated hover:text-accent"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Próximo reel"
              onClick={() => setActiveIndex((index) => (index + 1) % reels.length)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-surface-elevated hover:text-accent"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </figure>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-accent">
              Reels
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight text-foreground sm:text-5xl">
              A barbearia em movimento
            </h2>
            <div className="mt-10 border-l-2 border-accent/60 pl-6">
              <h3 className="font-display text-2xl font-medium text-foreground">
                {reels[activeIndex].label}
              </h3>
              <p className="mt-3 text-lg leading-7 text-foreground-muted">
                {reels[activeIndex].phrase}
              </p>
            </div>
            <div className="mt-10 flex items-center gap-1">
              {reels.map((reel, index) => (
                <button
                  key={reel.label}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Ver ${reel.label}`}
                  aria-current={activeIndex === index}
                  className="group flex h-10 w-10 items-center justify-center"
                >
                  <span
                    className={
                      activeIndex === index
                        ? "h-2 w-8 rounded-full bg-accent transition-all"
                        : "h-2 w-2 rounded-full bg-border-light transition-all group-hover:bg-foreground-muted"
                    }
                  />
                </button>
              ))}
            </div>
            <a
              href="https://www.instagram.com/barbeariadotorres/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block text-sm text-foreground-muted transition-colors hover:text-accent"
            >
              @barbeariadotorres
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}