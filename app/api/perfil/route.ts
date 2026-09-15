import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

const perfilSchema = z.object({
  // Vacío o null = quitar el logo/avatar.
  image: z.string().url("La URL de la imagen no es válida").max(2000).nullable(),
});

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const { image } = perfilSchema.parse(body);

    const usuario = await prisma.user.update({
      where: { id: session.user.id },
      data: { image },
      select: { id: true, image: true },
    });

    return NextResponse.json({ success: true, usuario });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Validación fallida" },
        { status: 400 }
      );
    }

    console.error("Error en PATCH /api/perfil:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
