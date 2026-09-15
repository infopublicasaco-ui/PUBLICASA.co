import { SocialIcons } from "./SocialIcons";

const LEGAL_LINKS = [
  { label: "Aviso Legal", href: "/legal/aviso-legal" },
  { label: "Términos y Condiciones", href: "/legal/terminos" },
  { label: "Política de Datos Personales", href: "/legal/datos-personales" },
  { label: "Políticas de Cookies", href: "/legal/cookies" },
  { label: "Recomendaciones", href: "/legal/recomendaciones" },
];

export function Footer() {
  return (
    <footer className="bg-brand-blue py-8 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/20 pb-6">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm">
            <span>Cel: (+57) 310 2416 984</span>
            <span>Tel: 601 8841816</span>
            <span>info@publicasa.co</span>
            <span>Canales de preferencia</span>
            <span>Preguntas frecuentes</span>
          </div>

          <div className="flex items-center gap-3">
            <SocialIcons />
            <span className="text-sm">Creemos networking, síguenos!</span>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-6 sm:flex-row sm:items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-publicasa-white.svg" alt="PUBLICASA.co" className="h-6 w-auto" />
          <div className="hidden h-10 w-px bg-white/30 sm:block" />
          <ul className="flex flex-col gap-1.5 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
