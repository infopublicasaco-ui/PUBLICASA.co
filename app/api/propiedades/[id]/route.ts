import { NextResponse } from "next/server";
import { OperationType, PropertyType } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Debes iniciar sesión." }, { status: 401 });
  }

  const property = await prisma.property.findUnique({
    where: { id: params.id },
  });

  if (!property) {
    return NextResponse.json({ error: "Inmueble no encontrado." }, { status: 404 });
  }

  if (property.propietarioId !== session.user.id) {
    return NextResponse.json({ error: "No es tu inmueble." }, { status: 403 });
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
    typeof longitud !== "number"
  ) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios (título, descripción, precio, ciudad, barrio, dirección o ubicación)." },
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

  const nuevoEstado = property.estado === "RECHAZADO" ? "PENDIENTE_REVISION" : property.estado;

  const updateData: any = {
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
    departamento: departamento as string | null,
    localidad: localidad as string | null,
    barrio: barrio as string,
    direccion: direccion as string,
    latitud: latitud as number,
    longitud: longitud as number,
    estado: nuevoEstado,
    motivoRechazo: null,
  };

  if (caracteristicasSector) updateData.caracteristicasSector = caracteristicasSector;
  if (caracteristicasAdicionales) updateData.caracteristicasAdicionales = caracteristicasAdicionales;

  await prisma.$transaction([
    prisma.property.update({
      where: { id: params.id },
      data: updateData,
    }),
    prisma.propertyPhoto.deleteMany({
      where: { propertyId: params.id },
    }),
    ...urls.map((url, i) =>
      prisma.propertyPhoto.create({
        data: {
          propertyId: params.id,
          url,
          orden: i,
          esPortada: i === 0,
        },
      })
    ),
  ]);

  revalidatePath(`/propiedades/${params.id}`);
  revalidatePath("/");
  revalidatePath("/perfil");

  return NextResponse.json({ id: params.id, estado: nuevoEstado });
}
