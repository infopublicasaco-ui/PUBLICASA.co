import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Role } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { formatCOP, OPERACION_LABEL, TIPO_LABEL } from "@/lib/format";
import { ModerationActions } from "@/components/admin/ModerationActions";

export const metadata = {
  title: "Moderación | PUBLICASA.co",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/admin");
  // 404 en vez de 403: no revela la existencia del panel a quien no es admin.
  if (session.user.rol !== Role.ADMIN) notFound();

  const [pendientes, rechazadas] = await Promise.all([
    prisma.property.findMany({
      where: { estado: "PENDIENTE_REVISION" },
      include: { fotos: { orderBy: { orden: "asc" }, take: 1 }, propietario: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.property.findMany({
      where: { estado: "RECHAZADO" },
      include: { fotos: { orderBy: { orden: "asc" }, take: 1 }, propietario: true },
      orderBy: { updatedAt: "desc" },
      take: 10,
    }),
  ]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Moderación</h1>
      <p className="mt-1 text-sm text-gray-500">
        {pendientes.length === 0
          ? "No hay inmuebles esperando revisión."
          : `${pendientes.length} inmueble${pendientes.length === 1 ? "" : "s"} esperando revisión.`}
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {pendientes.map((p) => (
          <article key={p.id} className="rounded-xl border border-gray-200 p-4">
            <div className="flex gap-4">
              {p.fotos[0] ? (
                <Image
                  src={p.fotos[0].url}
                  alt=""
                  width={140}
                  height={100}
                  className="h-[100px] w-[140px] shrink-0 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-[100px] w-[140px] shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                  Sin fotos
                </div>
              )}

              <div className="min-w-0 flex-1">
                <Link
                  href={`/propiedades/${p.id}`}
                  className="font-semibold text-gray-900 hover:underline"
                >
                  {p.titulo}
                </Link>
                <p className="mt-0.5 text-sm text-gray-500">
                  {TIPO_LABEL[p.tipo]} · {OPERACION_LABEL[p.operacion]} ·{" "}
                  {formatCOP(p.precio.toNumber())}
                </p>
                <p className="text-sm text-gray-500">
                  {p.barrio}, {p.ciudad}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{p.descripcion}</p>
                <p className="mt-2 text-xs text-gray-400">
                  Publicado por {p.propietario.nombre} · {p.propietario.email}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <ModerationActions propertyId={p.id} />
            </div>
          </article>
        ))}
      </div>

      {rechazadas.length > 0 && (
        <>
          <h2 className="mt-12 text-lg font-semibold text-gray-900">Rechazados recientemente</h2>
          <div className="mt-4 flex flex-col gap-3">
            {rechazadas.map((p) => (
              <article key={p.id} className="rounded-lg border border-gray-200 px-4 py-3">
                <Link
                  href={`/propiedades/${p.id}`}
                  className="font-medium text-gray-900 hover:underline"
                >
                  {p.titulo}
                </Link>
                <p className="text-sm text-gray-500">
                  {p.barrio}, {p.ciudad} · {p.propietario.email}
                </p>
                {p.motivoRechazo && (
                  <p className="mt-1 text-sm text-red-700">Motivo: {p.motivoRechazo}</p>
                )}
                <div className="mt-3">
                  <ModerationActions propertyId={p.id} />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
