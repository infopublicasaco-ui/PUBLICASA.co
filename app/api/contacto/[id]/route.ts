import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function PATCH(_request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Debes iniciar sesión." }, { status: 401 });
  }

  const solicitud = await prisma.contactRequest.findUnique({
    where: { id: params.id },
    select: { id: true, property: { select: { propietarioId: true } } },
  });
  if (!solicitud) {
    return NextResponse.json({ error: "Solicitud no encontrada." }, { status: 404 });
  }
  if (solicitud.property.propietarioId !== session.user.id) {
    return NextResponse.json({ error: "No es tu inmueble." }, { status: 403 });
  }

  await prisma.contactRequest.update({
    where: { id: params.id },
    data: { leida: true },
  });

  return NextResponse.json({ ok: true });
}
