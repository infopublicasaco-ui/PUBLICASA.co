import Link from "next/link";
import { NavClient } from "./NavClient";

const NAV_LINKS = [
  { href: "/noticias", label: "Noticias" },
  { href: "/inmuebles?operacion=VENTA", label: "Comprar" },
  { href: "/inmuebles?operacion=ARRIENDO", label: "Arriendo" },
  { href: "/publicar", label: "Publicar" },
];

export function Nav() {
  return (
    <nav className="h-20 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-publicasa.svg" alt="PUBLICASA.co" className="h-6 w-auto sm:h-7" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden items-center gap-8 text-sm font-bold uppercase tracking-wide text-gray-900 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-brand-blue">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu & Auth */}
        <NavClient navLinks={NAV_LINKS} />
      </div>
    </nav>
  );
}
