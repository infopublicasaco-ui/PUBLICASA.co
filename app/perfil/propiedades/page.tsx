import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Mis Propiedades | PUBLICASA.co",
};

export default async function PropertiesPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      propiedades: {
        orderBy: { createdAt: "desc" },
        include: { fotos: true },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const propiedades = user.propiedades;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Propiedades</h1>
          <p className="text-gray-600 mt-2">Tienes {propiedades.length} inmueble{propiedades.length !== 1 ? 's' : ''} publicado{propiedades.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/publicar"
          className="px-4 py-2 bg-brand-green text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          + Publicar
        </Link>
      </div>

      {propiedades.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">🏠</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No tienes propiedades publicadas</h2>
          <p className="text-gray-600 mb-6">Comienza a publicar tus inmuebles para que los interesados puedan contactarte</p>
          <Link
            href="/publicar"
            className="inline-block px-6 py-3 bg-brand-green text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            Publicar tu primer inmueble
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {propiedades.map((prop) => {
            const statusBgColor = {
              ACTIVO: "bg-green-100 text-green-800",
              PENDIENTE_REVISION: "bg-yellow-100 text-yellow-800",
              RECHAZADO: "bg-red-100 text-red-800",
              PAUSADO: "bg-gray-100 text-gray-800",
              VENDIDO: "bg-blue-100 text-blue-800",
              ARRENDADO: "bg-blue-100 text-blue-800",
            }[prop.estado] || "bg-gray-100 text-gray-800";

            const statusLabel = {
              ACTIVO: "Activo",
              PENDIENTE_REVISION: "Pendiente de revisión",
              RECHAZADO: "Rechazado",
              PAUSADO: "Pausado",
              VENDIDO: "Vendido",
              ARRENDADO: "Arrendado",
            }[prop.estado];

            return (
              <div
                key={prop.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
              >
                <div className="flex gap-4 p-4">
                  {/* Image */}
                  <div className="flex-shrink-0 w-40 h-32 bg-gray-200 rounded-lg overflow-hidden">
                    {prop.fotos[0]?.url && (
                      <img
                        src={prop.fotos[0].url}
                        alt={prop.titulo}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{prop.titulo}</h3>
                        <p className="text-sm text-gray-600">{prop.direccion}, {prop.barrio}</p>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBgColor}`}>
                        {statusLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-600">Precio</p>
                        <p className="font-bold text-gray-900">${prop.precio.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tipo</p>
                        <p className="font-bold text-gray-900">{prop.tipo}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Operación</p>
                        <p className="font-bold text-gray-900">{prop.operacion}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Fotos</p>
                        <p className="font-bold text-gray-900">{prop.fotos.length}</p>
                      </div>
                    </div>

                    {prop.estado === "RECHAZADO" && prop.motivoRechazo && (
                      <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                        <p className="font-semibold">Motivo del rechazo:</p>
                        <p>{prop.motivoRechazo}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link
                        href={`/propiedades/${prop.id}`}
                        className="text-sm text-brand-green font-semibold hover:underline"
                      >
                        Ver inmueble →
                      </Link>
                      <Link
                        href={`/propiedades/${prop.id}/editar`}
                        className="text-sm text-brand-green font-semibold hover:underline"
                      >
                        Editar →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
