const reels = [
  { label: "Corte clássico", src: "/reels/videocorte.mp4", poster: "/reels/videocorte.jpg" },
  { label: "Transformação", src: "/reels/videoguri.mp4", poster: "/reels/videoguri.jpg" },
  { label: "Toalha quente", src: "/reels/videotex.mp4", poster: "/reels/videotex.jpg" },
  { label: "Visagismo", src: "/reels/videovisa.mp4", poster: "/reels/videovisa.jpg" },
];

export default function Reels() {
  return (
    <section id="reels" className="scroll-mt-24 border-t border-border bg-surface/40 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
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
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {reels.map((reel) => (
            <figure
              key={reel.label}
              className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)] transition-colors hover:border-border-light"
            >
              <div className="relative aspect-[9/16]">
                <video
                  src={reel.src}
                  poster={reel.poster}
                  controls
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
    </section>
  );
}