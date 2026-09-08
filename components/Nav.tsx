"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Nav() {
  const { status } = useSession();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-gray-900">
          PublicAsa.co
        </Link>
        <div className="flex h-8 items-center gap-4 text-sm">
          {status === "authenticated" && (
            <>
              <Link href="/publicar" className="text-gray-700 hover:text-gray-900">
                Publicar
              </Link>
              <Link href="/perfil" className="text-gray-700 hover:text-gray-900">
                Mi perfil
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-gray-500 hover:text-gray-900"
              >
                Cerrar sesión
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link href="/login" className="text-gray-700 hover:text-gray-900">
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                className="rounded-lg bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-800"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
