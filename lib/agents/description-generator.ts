import { generateWithClaude } from "./ai-provider";
import type { PropertyType, OperationType } from "@prisma/client";

interface PropertyDetails {
  titulo: string;
  descripcion: string;
  tipo: PropertyType;
  operacion: OperationType;
  ciudad: string;
  barrio: string;
  habitaciones?: number;
  banos?: number;
  areaConstruidaM2?: number;
  estrato?: number;
  precio: number;
}

export async function generatePropertyDescription(details: PropertyDetails): Promise<string | null> {
  const operacionLabel = details.operacion === "VENTA" ? "en venta" : "en arriendo";
  const tipoLabel = details.tipo.toLowerCase();

  const prompt = `Eres un copywriter inmobiliario colombiano experto. Tu tarea es mejorar y enriquecer una descripción de inmueble.

INMUEBLE ACTUAL:
- Tipo: ${details.tipo}
- Operación: ${operacionLabel}
- Ubicación: ${details.barrio}, ${details.ciudad}
- Descripción existente: "${details.descripcion}"
${details.habitaciones ? `- Habitaciones: ${details.habitaciones}` : ""}
${details.banos ? `- Baños: ${details.banos}` : ""}
${details.areaConstruidaM2 ? `- Área: ${details.areaConstruidaM2} m²` : ""}
${details.estrato ? `- Estrato: ${details.estrato}` : ""}
- Precio: $${details.precio.toLocaleString("es-CO")}

INSTRUCCIONES:
1. Mantén el tono profesional y atractivo, orientado a compradores/arrendatarios
2. Destaca características clave del inmueble
3. Menciona ventajas de la ubicación (si es obvio de la ciudad/barrio)
4. Sé conciso: máximo 150 palabras
5. Usa verbos activos y lenguaje emocional positivo
6. No inventes características que no están mencionadas

RESPONDE SOLO CON LA DESCRIPCIÓN MEJORADA, SIN EXPLICACIONES ADICIONALES.`;

  const result = await generateWithClaude(prompt);
  return result;
}

export async function generatePropertyTitle(
  tipo: PropertyType,
  ciudad: string,
  barrio: string,
  operacion: OperationType
): Promise<string | null> {
  const operacionLabel = operacion === "VENTA" ? "en venta" : "en arriendo";

  const prompt = `Genera un título corto y atractivo para un inmueble ${tipo.toLowerCase()} ${operacionLabel} en ${barrio}, ${ciudad}.

Requisitos:
- Máximo 60 caracteres
- Debe incluir tipo de inmueble y ubicación
- Atractivo para compradores/arrendatarios
- Usa lenguaje positivo

RESPONDE SOLO CON EL TÍTULO, SIN EXPLICACIONES.`;

  const result = await generateWithClaude(prompt);
  return result;
}
