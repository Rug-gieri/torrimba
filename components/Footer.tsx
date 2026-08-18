import Image from "next/image";
import { navLinks } from "./data";

export default function Footer() {
  return (
    <footer id="contato" className="scroll-mt-24 border-t border-border bg-background py-16">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-3">
        <div>
          <Image
            src="/torres_logo.png"
            alt="Barbearia do Torres"
            width={108}
            height={72}
            className="h-12 w-auto"
          />
          <p className="mt-4 text-sm leading-6 text-foreground-muted">
            Barbearia do Torres, em Pôrto Velho/RO. Seu ambiente de
            renovação.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
            Navegação
          </h4>
          <ul className="mt-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.3em] text-foreground-muted">
            Contato
          </h4>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-foreground-muted">
            <li>Rua Clara Nunes, 5969 — Pôrto Velho/RO, 76824-210</li>
            <li>
              <a href="tel:+556993303027" className="transition-colors hover:text-foreground">
                (69) 9330-3027
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/barbeariadotorres/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                @barbeariadotorres
              </a>
            </li>
            <li>Ter–Sáb, 9h às 20h</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <p className="mt-6 text-center text-xs text-foreground-muted">
          © 2026 Barbearia do Torres. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}