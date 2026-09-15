import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { formatCOP, OPERACION_LABEL, TIPO_LABEL } from "@/lib/format";
import { ProfileHeaderCard } from "@/components/perfil/ProfileHeaderCard";
import { StatsGrid } from "@/components/perfil/StatsGrid";
import { EmptyState } from "@/components/perfil/EmptyState";
import { ModerationBanner } from "@/components/perfil/ModerationBanner";
import { LeadsTable } from "@/components/perfil/LeadsTable";

export default async function PerfilPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const usuario = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { propiedades: { orderBy: { createdAt: "desc" } } },
  });

  if (!usuario) redirect("/login");

  const rol = usuario.rol || "COMPRADOR";
  const isAdmin = rol === "ADMIN";
  const isPropietario = rol === "PROPIETARIO";
  const isComprador = rol === "COMPRADOR";

  interface Stat {
    label: string;
    value: string | number;
  }

  // Fetch data según rol
  const solicitudes = isPropietario
    ? await prisma.contactRequest.findMany({
        where: { property: { propietarioId: session.user.id } },
        include: {
          property: { select: { id: true, titulo: true } },
          interesado: { select: { nombre: true, email: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    : [];

  const noLeidas = solicitudes.filter((s) => !s.leida).length;

  // Stats según rol
  let stats: Stat[] = [];
  if (isAdmin) {
    const propiedadesActivas = await prisma.property.count({ where: { estado: "ACTIVO" } });
    const usuariosRegistrados = await prisma.user.count();
    const propiedadesPendientes = await prisma.property.count({ where: { estado: "PENDIENTE_REVISION" } });
    const propiedadesRechazadas = await prisma.property.count({ where: { estado: "RECHAZADO" } });

    stats = [
      { label: "Usuarios registrados", value: usuariosRegistrados },
      { label: "Inmuebles activos", value: propiedadesActivas },
      { label: "En revisión", value: propiedadesPendientes },
      { label: "Rechazados", value: propiedadesRechazadas },
    ];
  } else if (isPropietario) {
    const propiedadesActivas = usuario.propiedades.filter((p) => p.estado === "ACTIVO").length;
    stats = [
      { label: "Mis propiedades", value: usuario.propiedades.length },
      { label: "Activas", value: propiedadesActivas },
      { label: "Solicitudes recibidas", value: solicitudes.length },
      { label: "No leídas", value: noLeidas },
    ];
  } else if (isComprador) {
    stats = [
      { label: "Propiedades guardadas", value: "0" },
      { label: "Búsquedas guardadas", value: "0" },
      { label: "Mensajes", value: "0" },
      { label: "Activos", value: "0" },
    ];
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* Header */}
      <div className="mb-10">
        <ProfileHeaderCard
          nombre={usuario.nombre}
          email={usuario.email}
          rol={rol}
          telefono={usuario.telefono}
          imagen={usuario.image}
        />
      </div>

      {/* Admin Banner */}
      {isAdmin && (
        <div className="mb-10">
          <ModerationBanner />
        </div>
      )}

      {/* Stats */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h2>
        <StatsGrid stats={stats} />
      </div>

      {/* Admin: Propiedades de todos */}
      {isAdmin && (
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Ver propiedades</h2>
            <Link
              href="/inmuebles"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Todas las propiedades →
            </Link>
          </div>
        </div>
      )}

      {/* Propietario: Dashboard de Leads */}
      {isPropietario && (
        <div className="mb-10">
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Gestor de contactos</h2>
            {noLeidas > 0 && (
              <span className="rounded-full bg-brand-blue px-2 py-0.5 text-xs font-medium text-white">
                {noLeidas} {noLeidas === 1 ? "nuevo" : "nuevos"}
              </span>
            )}
          </div>

          {solicitudes.length === 0 ? (
            <EmptyState
              icon="💼"
              title="No hay contactos todavía"
              description="Cuando alguien se interese en tus inmuebles, verás sus contactos aquí con estado y detalles"
            />
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
              <LeadsTable leads={solicitudes.map((s) => ({
                id: s.id,
                nombre: s.interesado?.nombre ?? s.nombre ?? "Sin nombre",
                email: s.interesado?.email ?? s.email,
                telefono: s.telefono,
                mensaje: s.mensaje,
                estado: s.estado,
                leida: s.leida,
                createdAt: s.createdAt,
                property: s.property,
              }))} />
            </div>
          )}
        </div>
      )}

      {/* Propietario/Comprador: Mis propiedades */}
      {isPropietario && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mis propiedades</h2>
          {usuario.propiedades.length === 0 ? (
            <EmptyState
              icon="🏠"
              title="Aún no has publicado inmuebles"
              description="Publica tu primer inmueble y empieza a recibir solicitudes"
              ctaText="Publicar inmueble"
              ctaHref="/publicar"
            />
          ) : (
            <div className="space-y-3">
              {usuario.propiedades.map((p) => (
                <Link
                  key={p.id}
                  href={`/propiedades/${p.id}`}
                  className="block rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-900">{p.titulo}</p>
                      <p className="text-sm text-gray-500">
                        {TIPO_LABEL[p.tipo as keyof typeof TIPO_LABEL]} · {OPERACION_LABEL[p.operacion as keyof typeof OPERACION_LABEL]} · {formatCOP(p.precio.toNumber())}
                      </p>
                      {p.estado === "RECHAZADO" && p.motivoRechazo && (
                        <p className="mt-1 text-sm text-red-700">Motivo: {p.motivoRechazo}</p>
                      )}
                    </div>
                    <span className="text-xs font-medium">
                      {p.estado === "ACTIVO" && <span className="text-green-700">Activo</span>}
                      {p.estado === "RECHAZADO" && <span className="text-red-700">Rechazado</span>}
                      {p.estado === "PENDIENTE_REVISION" && <span className="text-amber-700">En revisión</span>}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Comprador: Empty states */}
      {isComprador && (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Propiedades guardadas</h2>
            <EmptyState
              icon="❤️"
              title="No has guardado propiedades"
              description="Guarda tus favoritas para verlas después"
              ctaText="Explorar propiedades"
              ctaHref="/"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Mis mensajes</h2>
            <EmptyState
              icon="💬"
              title="No tienes mensajes"
              description="Cuando los vendedores respondan, verás la conversación aquí"
            />
          </div>
        </div>
      )}
    </main>
  );
}
