import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PerfilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      propiedades: true,
      solicitudesContacto: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  // Count messages separately
  const mensajesRecibidos = await prisma.message.count({
    where: { destinatario_id: user.id },
  });

  const stats = {
    propiedades: user.propiedades.length,
    activas: user.propiedades.filter((p) => p.estado === "ACTIVO").length,
    solicitudes: user.solicitudesContacto.length,
    mensajes: mensajesRecibidos,
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 p-6 sticky top-0 h-screen overflow-y-auto shadow-sm">
        {/* User Header */}
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mb-4">
            <span className="text-3xl">{user.nombre.charAt(0)}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user.nombre}</h2>
          <p className="text-sm text-gray-600 mt-1">{user.email}</p>
          <p className="text-xs text-brand-green font-semibold mt-2 uppercase">
            {user.rol}
          </p>
        </div>

        {/* Stats */}
        <div className="space-y-3 mb-8 pb-8 border-b border-gray-200">
          <div className="bg-gradient-to-br from-brand-green/5 to-emerald-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-brand-green">{stats.propiedades}</p>
            <p className="text-xs text-gray-600 mt-1">Mis propiedades</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{stats.activas}</p>
            <p className="text-xs text-gray-600 mt-1">Propiedades activas</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-amber-600">{stats.solicitudes}</p>
            <p className="text-xs text-gray-600 mt-1">Solicitudes recibidas</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{stats.mensajes}</p>
            <p className="text-xs text-gray-600 mt-1">Mensajes recibidos</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <Link
            href="/perfil"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-green/5 transition font-medium text-sm"
          >
            <span>📊</span> Dashboard
          </Link>
          <Link
            href="/perfil/mensajes"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-green/5 transition font-medium text-sm"
          >
            <span>💬</span> Mis Mensajes
          </Link>
          <Link
            href="/perfil/propiedades"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-green/5 transition font-medium text-sm"
          >
            <span>🏠</span> Mis Propiedades
          </Link>
          <Link
            href="/publicar"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-brand-green/5 transition font-medium text-sm"
          >
            <span>➕</span> Publicar
          </Link>
        </nav>

        {/* Logout */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium text-sm hover:bg-red-100 transition"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
