import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Mi Perfil | PUBLICASA.co",
};

export default async function PerfilPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      propiedades: {
        take: 6,
        orderBy: { createdAt: "desc" },
        include: { fotos: true },
      },
      solicitudesContacto: {
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { property: true },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bienvenido, {user.nombre}!</h1>
        <p className="text-gray-600 mt-2">Gestiona tus propiedades, mensajes y solicitudes desde aquí</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/perfil/mensajes"
          className="p-6 bg-white rounded-lg border border-gray-200 hover:border-brand-green hover:shadow-lg transition"
        >
          <div className="text-3xl mb-2">💬</div>
          <h3 className="font-bold text-gray-900">Mis Mensajes</h3>
          <p className="text-sm text-gray-600 mt-1">Comunícate con compradores y arrendatarios</p>
        </Link>

        <Link
          href="/publicar"
          className="p-6 bg-white rounded-lg border border-gray-200 hover:border-brand-green hover:shadow-lg transition"
        >
          <div className="text-3xl mb-2">➕</div>
          <h3 className="font-bold text-gray-900">Publicar Propiedad</h3>
          <p className="text-sm text-gray-600 mt-1">Crea un nuevo anuncio de propiedad</p>
        </Link>

        <Link
          href="/perfil/propiedades"
          className="p-6 bg-white rounded-lg border border-gray-200 hover:border-brand-green hover:shadow-lg transition"
        >
          <div className="text-3xl mb-2">🏠</div>
          <h3 className="font-bold text-gray-900">Mis Propiedades</h3>
          <p className="text-sm text-gray-600 mt-1">Ver y editar todas tus propiedades</p>
        </Link>
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Propiedades Recientes</h2>
          <Link href="/perfil/propiedades" className="text-brand-green font-semibold text-sm hover:underline">
            Ver todas →
          </Link>
        </div>

        {user.propiedades.length === 0 ? (
          <p className="text-gray-600 py-8 text-center">No tienes propiedades publicadas aún</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.propiedades.map((prop) => (
              <Link
                key={prop.id}
                href={`/propiedades/${prop.id}`}
                className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition"
              >
                <div className="bg-gray-200 h-40">
                  {prop.fotos[0]?.url && (
                    <img
                      src={prop.fotos[0].url}
                      alt={prop.titulo}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="font-bold text-gray-900">${prop.precio.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mt-1">{prop.titulo}</p>
                  <div className="flex gap-2 mt-3">
                    <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded">
                      {prop.estado}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recent Contact Requests */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Solicitudes Recientes</h2>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
            {user.solicitudesContacto.length}
          </span>
        </div>

        {user.solicitudesContacto.length === 0 ? (
          <p className="text-gray-600 py-8 text-center">No tienes solicitudes de contacto</p>
        ) : (
          <div className="space-y-3">
            {user.solicitudesContacto.map((solicitud) => (
              <div key={solicitud.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-brand-green transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{solicitud.nombre}</p>
                    <p className="text-sm text-gray-600">{solicitud.email}</p>
                    <p className="text-sm text-gray-600 mt-1">{solicitud.property?.titulo}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    solicitud.leida
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {solicitud.leida ? "Leída" : "Nueva"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
