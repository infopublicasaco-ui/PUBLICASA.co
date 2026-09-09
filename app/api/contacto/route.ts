import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const { propertyId, mensaje, nombre, email, telefono } = body as Record<string, unknown>;

  if (typeof propertyId !== "string" || !propertyId) {
    return NextResponse.json({ error: "Falta el inmueble." }, { status: 400 });
  }
  if (typeof mensaje !== "string" || !mensaje.trim()) {
    return NextResponse.json({ error: "Escribe un mensaje." }, { status: 400 });
  }

  const emailLimpio = typeof email === "string" ? email.trim() : "";
  const telefonoLimpio = typeof telefono === "string" ? telefono.trim() : "";
  if (!emailLimpio && !telefonoLimpio) {
    return NextResponse.json(
      { error: "Deja un email o un teléfono para que el propietario pueda responderte." },
      { status: 400 }
    );
  }

  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    select: { id: true, estado: true, propietarioId: true },
  });
  if (!property) {
    return NextResponse.json({ error: "Inmueble no encontrado." }, { status: 404 });
  }
  if (property.estado !== "ACTIVO") {
    return NextResponse.json(
      { error: "Este inmueble no está disponible para contacto." },
      { status: 409 }
    );
  }

  const session = await auth();
  if (session?.user?.id === property.propietarioId) {
    return NextResponse.json({ error: "Este inmueble es tuyo." }, { status: 400 });
  }

  await prisma.contactRequest.create({
    data: {
      propertyId,
      mensaje: mensaje.trim(),
      nombre: typeof nombre === "string" && nombre.trim() ? nombre.trim() : null,
      email: emailLimpio || null,
      telefono: telefonoLimpio || null,
      interesadoId: session?.user?.id ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
