import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { formatCOP, OPERACION_LABEL, TIPO_LABEL } from "@/lib/format";

const ROL_LABEL: Record<string, string> = {
  PROPIETARIO: "Propietario",
  COMPRADOR: "Comprador",
  ADMIN: "Administrador",
};

export default async function PerfilPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const usuario = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { propiedades: { orderBy: { createdAt: "desc" } } },
  });

  if (!usuario) redirect("/login");

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
      </div>

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
              <div>
                <p className="font-medium text-gray-900">{p.titulo}</p>
                <p className="text-sm text-gray-500">
                  {TIPO_LABEL[p.tipo]} · {OPERACION_LABEL[p.operacion]} · {formatCOP(p.precio.toNumber())}
                </p>
              </div>
              <span className="text-xs uppercase text-gray-400">{p.estado}</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
