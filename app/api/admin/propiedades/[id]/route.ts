import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { Role } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Debes iniciar sesión." }, { status: 401 });
  }
  if (session.user.rol !== Role.ADMIN) {
    return NextResponse.json({ error: "Solo un administrador puede moderar." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const accion = (body as { accion?: unknown } | null)?.accion;
  const motivo = (body as { motivo?: unknown } | null)?.motivo;

  if (accion !== "aprobar" && accion !== "rechazar") {
    return NextResponse.json({ error: "Acción inválida." }, { status: 400 });
  }
  if (accion === "rechazar" && (typeof motivo !== "string" || !motivo.trim())) {
    return NextResponse.json(
      { error: "Indica el motivo del rechazo para que el propietario sepa qué corregir." },
      { status: 400 }
    );
  }

  const property = await prisma.property.findUnique({ where: { id: params.id } });
  if (!property) {
    return NextResponse.json({ error: "Inmueble no encontrado." }, { status: 404 });
  }

  const updated = await prisma.property.update({
    where: { id: params.id },
    data:
      accion === "aprobar"
        ? { estado: "ACTIVO", motivoRechazo: null }
        : { estado: "RECHAZADO", motivoRechazo: (motivo as string).trim() },
  });

  revalidatePath(`/propiedades/${params.id}`);

  return NextResponse.json({ id: updated.id, estado: updated.estado });
}
