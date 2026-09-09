import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { EditarForm } from "@/components/propiedades/EditarForm";

export default async function EditarPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const propiedad = await prisma.property.findUnique({
    where: { id: params.id },
    include: { fotos: true },
  });

  if (!propiedad) notFound();

  if (propiedad.propietarioId !== session.user.id) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Editar inmueble</h1>
      <p className="mt-1 text-sm text-gray-500">
        {propiedad.estado === "RECHAZADO" && (
          <>
            Este inmueble fue rechazado. Al guardar, volverá a estar en revisión.
          </>
        )}
        {propiedad.estado === "ACTIVO" && (
          <>
            Actualiza la información. Los cambios se guardarán inmediatamente.
          </>
        )}
        {!["RECHAZADO", "ACTIVO"].includes(propiedad.estado) && (
          <>
            Completa la información. Los campos marcados con * son obligatorios.
          </>
        )}
      </p>

      <div className="mt-8">
        <EditarForm propiedad={propiedad} />
      </div>
    </main>
  );
}
