import { prisma } from "@/lib/db/prisma";
import { generatePropertyDescription, generatePropertyTitle } from "@/lib/agents/description-generator";
import { suggestPrice } from "@/lib/agents/pricing-suggester";
import { analyzePropertyPhotos } from "@/lib/agents/photo-analyzer";

export async function POST(request: Request) {
  try {
    const { propertyId } = await request.json();

    if (!propertyId) {
      return Response.json({ error: "propertyId es requerido" }, { status: 400 });
    }

    // Buscar la propiedad
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { fotos: { orderBy: { orden: "asc" } } },
    });

    if (!property) {
      return Response.json({ error: "Propiedad no encontrada" }, { status: 404 });
    }

    // Generar descripción mejorada
    const improvedDescription = await generatePropertyDescription({
      titulo: property.titulo,
      descripcion: property.descripcion,
      tipo: property.tipo,
      operacion: property.operacion,
      ciudad: property.ciudad,
      barrio: property.barrio,
      habitaciones: property.habitaciones || undefined,
      banos: property.banos || undefined,
      areaConstruidaM2: property.areaConstruidaM2 || undefined,
      estrato: property.estrato || undefined,
      precio: property.precio.toNumber(),
    });

    // Sugerir precio
    const suggestedPrice = await suggestPrice({
      tipo: property.tipo,
      operacion: property.operacion,
      ciudad: property.ciudad,
      barrio: property.barrio,
      habitaciones: property.habitaciones || undefined,
      banos: property.banos || undefined,
      areaConstruidaM2: property.areaConstruidaM2 || undefined,
      estrato: property.estrato || undefined,
      antiguedadAnios: property.antiguedadAnios || undefined,
      precioActual: property.precio.toNumber(),
    });

    // Analizar fotos
    const photoUrls = property.fotos.map((f) => f.url);
    const photoAnalysis = photoUrls.length > 0 ? await analyzePropertyPhotos(photoUrls) : null;

    // Actualizar propiedad con datos mejorados
    const updates: Record<string, any> = {};

    if (improvedDescription) {
      updates.descripcion = improvedDescription;
    }

    if (suggestedPrice) {
      updates.precioSugerido = suggestedPrice;
    }

    if (photoAnalysis) {
      updates.analisisVisual = photoAnalysis;
    }

    // Solo actualizar si hay cambios
    if (Object.keys(updates).length > 0) {
      await prisma.property.update({
        where: { id: propertyId },
        data: updates,
      });
    }

    return Response.json({
      success: true,
      propertyId,
      updates: {
        descripcionMejorada: !!improvedDescription,
        precioSuggerido: suggestedPrice || null,
        fotosAnalizadas: photoAnalysis ? photoAnalysis.analisis.length : 0,
        resumenFotos: photoAnalysis?.resumen || null,
      },
    });
  } catch (error) {
    console.error("Error procesando propiedad:", error);
    return Response.json(
      { error: "Error al procesar la propiedad con IA" },
      { status: 500 }
    );
  }
}
