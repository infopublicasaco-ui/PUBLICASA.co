import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { formatCOP, OPERACION_LABEL, TIPO_LABEL } from "@/lib/format";
import { MarcarLeida } from "@/components/perfil/MarcarLeida";

const ESTADO_LABEL: Record<string, string> = {
  PENDIENTE_REVISION: "En revisión",
  ACTIVO: "Activo",
  RECHAZADO: "Rechazado",
  PAUSADO: "Pausado",
  VENDIDO: "Vendido",
  ARRENDADO: "Arrendado",
};

const ROL_LABEL: Record<string, string> = {
  PROPIETARIO: "Propietario",
  COMPRADOR: "Comprador",
  ADMIN: "Administrador",
};

export default async function PerfilPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [usuario, solicitudes] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      include: { propiedades: { orderBy: { createdAt: "desc" } } },
    }),
    prisma.contactRequest.findMany({
      where: { property: { propietarioId: session.user.id } },
      include: {
        property: { select: { id: true, titulo: true } },
        interesado: { select: { nombre: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  if (!usuario) redirect("/login");

  const noLeidas = solicitudes.filter((s) => !s.leida).length;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Mi perfil</h1>

      <div className="mt-6 rounded-xl border border-gray-200 p-5">
        <p className="text-lg font-semibold text-gray-900">{usuario.nombre}</p>
        <p className="text-sm text-gray-500">{usuario.email}</p>
        {usuario.telefono && <p className="mt-1 text-sm text-gray-500">Tel: {usuario.telefono}</p>}
        <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {ROL_LABEL[usuario.rol]}
        </span>
        {usuario.rol === "ADMIN" && (
          <Link
            href="/admin"
            className="mt-3 block text-sm font-medium text-brand-blue hover:underline"
          >
            Ir al panel de moderación →
          </Link>
        )}
      </div>

      <div className="mt-10 flex items-baseline gap-3">
        <h2 className="text-lg font-semibold text-gray-900">Solicitudes recibidas</h2>
        {noLeidas > 0 && (
          <span className="rounded-full bg-brand-blue px-2 py-0.5 text-xs font-medium text-white">
            {noLeidas} {noLeidas === 1 ? "nueva" : "nuevas"}
          </span>
        )}
      </div>

      {solicitudes.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          Todavía nadie te ha escrito por tus inmuebles.
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {solicitudes.map((s) => (
            <article
              key={s.id}
              className={`rounded-lg border p-4 ${
                s.leida ? "border-gray-200" : "border-brand-blue/40 bg-brand-blue/5"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">
                    {s.interesado?.nombre ?? s.nombre ?? "Interesado sin nombre"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {[s.interesado?.email ?? s.email, s.telefono].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <time className="shrink-0 text-xs text-gray-400">
                  {s.createdAt.toLocaleDateString("es-CO")}
                </time>
              </div>

              <p className="mt-3 whitespace-pre-line text-sm text-gray-700">{s.mensaje}</p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <Link
                  href={`/propiedades/${s.property.id}`}
                  className="truncate text-xs text-gray-500 hover:underline"
                >
                  Sobre: {s.property.titulo}
                </Link>
                {!s.leida && <MarcarLeida solicitudId={s.id} />}
              </div>
            </article>
          ))}
        </div>
      )}

      <h2 className="mt-10 text-lg font-semibold text-gray-900">Mis propiedades publicadas</h2>
      {usuario.propiedades.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">
          Aún no has publicado ningún inmueble.{" "}
          <Link href="/publicar" className="font-medium text-gray-900 hover:underline">
            Publica el primero
          </Link>
          .
        </p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {usuario.propiedades.map((p) => (
            <Link
              key={p.id}
              href={`/propiedades/${p.id}`}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50"
            >
              <div className="min-w-0">
                <p className="font-medium text-gray-900">{p.titulo}</p>
                <p className="text-sm text-gray-500">
                  {TIPO_LABEL[p.tipo]} · {OPERACION_LABEL[p.operacion]} · {formatCOP(p.precio.toNumber())}
                </p>
                {p.estado === "RECHAZADO" && p.motivoRechazo && (
                  <p className="mt-1 text-sm text-red-700">Motivo: {p.motivoRechazo}</p>
                )}
              </div>
              <span
                className={`shrink-0 text-xs font-medium ${
                  p.estado === "ACTIVO"
                    ? "text-green-700"
                    : p.estado === "RECHAZADO"
                      ? "text-red-700"
                      : p.estado === "PENDIENTE_REVISION"
                        ? "text-amber-700"
                        : "text-gray-400"
                }`}
              >
                {ESTADO_LABEL[p.estado] ?? p.estado}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
