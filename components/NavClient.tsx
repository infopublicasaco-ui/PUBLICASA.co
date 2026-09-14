"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
}

export function NavClient({ navLinks }: { navLinks: NavLink[] }) {
  const { status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden inline-flex flex-col gap-1.5"
        aria-label="Toggle menu"
      >
        <span className="h-0.5 w-6 bg-gray-900"></span>
        <span className="h-0.5 w-6 bg-gray-900"></span>
        <span className="h-0.5 w-6 bg-gray-900"></span>
      </button>

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

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 border-t border-gray-200 bg-white z-50">
          <div className="flex flex-col px-4 py-3 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-2 text-sm font-medium text-gray-900 hover:text-brand-blue"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {status === "authenticated" && (
              <>
                <Link
                  href="/perfil"
                  className="py-2 text-sm font-medium text-gray-900 hover:text-brand-blue md:hidden"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mi perfil
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-left py-2 text-sm font-medium text-gray-900 hover:text-brand-blue md:hidden"
                >
                  Salir
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
