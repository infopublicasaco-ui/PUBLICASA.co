import { NextResponse } from "next/server";
import { OperationType, PropertyType } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Debes iniciar sesión." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const {
    titulo,
    descripcion,
    tipo,
    operacion,
    precio,
    areaConstruidaM2,
    areaPrivadaM2,
    habitaciones,
    banos,
    parqueaderos,
    estrato,
    antiguedadAnios,
    piso,
    totalPisos,
    ascensor,
    amoblado,
    tieneBalcon,
    tieneTerraza,
    tienePatio,
    tieneEstudio,
    tieneDeposito,
    tieneZonaLavanderia,
    administracion,
    ciudad,
    departamento,
    localidad,
    barrio,
    direccion,
    latitud,
    longitud,
    caracteristicasSector,
    caracteristicasAdicionales,
    fotos,
    telefono,
    whatsapp,
  } = body as Record<string, unknown>;

  if (
    !titulo ||
    !descripcion ||
    !tipo ||
    !operacion ||
    typeof precio !== "number" ||
    !ciudad ||
    !barrio ||
    !direccion ||
    typeof latitud !== "number" ||
    typeof longitud !== "number" ||
    (!telefono && !whatsapp)
  ) {
    return NextResponse.json(
      {
        error:
          "Faltan campos obligatorios (título, descripción, precio, ciudad, barrio, dirección, ubicación o un teléfono/WhatsApp de contacto).",
      },
      { status: 400 }
    );
  }

  if (!Object.values(PropertyType).includes(tipo as PropertyType)) {
    return NextResponse.json({ error: "Tipo de inmueble inválido." }, { status: 400 });
  }
  if (!Object.values(OperationType).includes(operacion as OperationType)) {
    return NextResponse.json({ error: "Operación inválida." }, { status: 400 });
  }

  const urls = Array.isArray(fotos)
    ? fotos.filter((u): u is string => typeof u === "string" && u.trim().length > 0)
    : [];

  // Guarda el teléfono/WhatsApp en el perfil también, para que quede
  // disponible en futuras publicaciones y en el botón de contacto directo.
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      ...(typeof telefono === "string" && telefono ? { telefono } : {}),
      ...(typeof whatsapp === "string" && whatsapp ? { whatsapp } : {}),
    },
  });

  const property = await prisma.property.create({
    data: {
      titulo: titulo as string,
      descripcion: descripcion as string,
      tipo: tipo as PropertyType,
      operacion: operacion as OperationType,
      precio,
      areaConstruidaM2: typeof areaConstruidaM2 === "number" ? areaConstruidaM2 : null,
      areaPrivadaM2: typeof areaPrivadaM2 === "number" ? areaPrivadaM2 : null,
      habitaciones: typeof habitaciones === "number" ? habitaciones : null,
      banos: typeof banos === "number" ? banos : null,
      parqueaderos: typeof parqueaderos === "number" ? parqueaderos : null,
      estrato: typeof estrato === "number" ? estrato : null,
      antiguedadAnios: typeof antiguedadAnios === "number" ? antiguedadAnios : null,
      piso: typeof piso === "number" ? piso : null,
      totalPisos: typeof totalPisos === "number" ? totalPisos : null,
      ascensor: Boolean(ascensor),
      amoblado: Boolean(amoblado),
      tieneBalcon: Boolean(tieneBalcon),
      tieneTerraza: Boolean(tieneTerraza),
      tienePatio: Boolean(tienePatio),
      tieneEstudio: Boolean(tieneEstudio),
      tieneDeposito: Boolean(tieneDeposito),
      tieneZonaLavanderia: Boolean(tieneZonaLavanderia),
      administracion: typeof administracion === "number" ? administracion : null,
      ciudad: ciudad as string,
      departamento: (departamento as string) || null,
      localidad: (localidad as string) || null,
      barrio: barrio as string,
      direccion: direccion as string,
      latitud,
      longitud,
      caracteristicasSector: caracteristicasSector ?? undefined,
      caracteristicasAdicionales: caracteristicasAdicionales ?? undefined,
      estado: "PENDIENTE_REVISION",
      propietarioId: session.user.id,
      fotos: {
        create: urls.map((url, i) => ({ url, orden: i, esPortada: i === 0 })),
      },
    },
  });

  // Dispara procesamiento de IA en background (no espera respuesta)
  if (process.env.NEXTAUTH_URL) {
    fetch(`${process.env.NEXTAUTH_URL}/api/agents/process-property`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ propertyId: property.id }),
    }).catch((err) => console.error("Error disparando agente:", err));
  }

  return NextResponse.json({ id: property.id });
}
