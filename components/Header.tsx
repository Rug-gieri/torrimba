import Image from "next/image";
import { navLinks } from "./data";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center">
          <Image
            src="/torres_logo.png"
            alt="Barbearia do Torres"
            width={54}
            height={36}
            className="h-10 w-auto"
          />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#agendar"
            className="hidden h-10 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-background transition-colors hover:bg-accent-hover md:inline-flex"
          >
            Agendar horário
          </a>
          <details className="group relative md:hidden">
            <summary
              aria-label="Abrir menu"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-border text-foreground"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
                className="h-5 w-5"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            </summary>
            <div className="absolute right-0 top-12 w-64 rounded-2xl border border-border bg-surface p-4 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.7)]">
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#agendar"
                  className="inline-flex h-10 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
                >
                  Agendar horário
                </a>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}