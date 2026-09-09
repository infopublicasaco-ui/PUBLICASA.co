"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NAV_LINKS = [
  { href: "/noticias", label: "Noticias" },
  { href: "/inmuebles?operacion=VENTA", label: "Comprar" },
  { href: "/publicar", label: "Vender" },
  { href: "/publicar", label: "Publicar" },
];

export function Nav() {
  const { status } = useSession();

  return (
    <nav className="h-20 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-publicasa.svg" alt="PUBLICASA.co" className="h-6 w-auto sm:h-7" />
        </Link>

        <div className="hidden items-center gap-8 text-sm font-bold uppercase tracking-wide text-gray-900 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-brand-blue">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          {status === "authenticated" && (
            <>
              <Link href="/perfil" className="hidden font-medium text-gray-700 hover:text-gray-900 sm:inline">
                Mi perfil
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="hidden font-medium text-gray-500 hover:text-gray-900 sm:inline"
              >
                Salir
              </button>
            </>
          )}
          {status !== "authenticated" && (
            <Link
              href="/login"
              className="rounded-full bg-brand-green px-6 py-2.5 font-bold uppercase tracking-wide text-white hover:opacity-90"
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
