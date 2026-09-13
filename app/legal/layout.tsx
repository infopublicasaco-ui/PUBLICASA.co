import Link from "next/link";

const LEGAL_LINKS = [
  { label: "Aviso Legal", href: "/legal/aviso-legal" },
  { label: "Términos y Condiciones", href: "/legal/terminos" },
  { label: "Política de Datos Personales", href: "/legal/datos-personales" },
  { label: "Política de Cookies", href: "/legal/cookies" },
  { label: "Recomendaciones", href: "/legal/recomendaciones" },
];

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="sticky top-0 w-64 bg-gray-900 text-white p-6 h-screen overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white">PUBLICASA.co</h2>
          <p className="text-xs text-gray-400 mt-1">Centro legal y normativo</p>
        </div>

        <nav className="space-y-2">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 rounded text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-12 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-400">
            Última actualización<br />
            <strong className="text-gray-300">Septiembre 2026</strong>
          </p>
        </div>
      </aside>

      <main className="flex-1 px-12 py-8 max-w-3xl">{children}</main>
    </div>
  );
}
