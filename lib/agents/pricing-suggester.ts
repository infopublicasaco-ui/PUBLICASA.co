import { generateWithFallback } from "./ai-provider";
import type { PropertyType, OperationType } from "@prisma/client";

interface PropertyForPricing {
  tipo: PropertyType;
  operacion: OperationType;
  ciudad: string;
  barrio: string;
  habitaciones?: number;
  banos?: number;
  areaConstruidaM2?: number;
  estrato?: number;
  antiguedadAnios?: number;
  precioActual: number;
}

export async function suggestPrice(property: PropertyForPricing): Promise<number | null> {
  const operacionLabel = property.operacion === "VENTA" ? "venta" : "arriendo";

  const prompt = `Eres un tasador inmobiliario colombiano con experiencia en ${property.ciudad}.

INMUEBLE A TASACIÓN:
- Tipo: ${property.tipo}
- Operación: ${operacionLabel}
- Ubicación: ${property.barrio}, ${property.ciudad}
${property.habitaciones ? `- Habitaciones: ${property.habitaciones}` : ""}
${property.banos ? `- Baños: ${property.banos}` : ""}
${property.areaConstruidaM2 ? `- Área construida: ${property.areaConstruidaM2} m²` : ""}
${property.estrato ? `- Estrato: ${property.estrato}` : ""}
${property.antiguedadAnios ? `- Antigüedad: ${property.antiguedadAnios} años` : ""}
- Precio actual listado: $${property.precioActual.toLocaleString("es-CO")}

INSTRUCCIONES:
1. Analiza el precio actual vs. precio de mercado en esa zona
2. Considera factores como: ubicación, estrato, características del inmueble
3. Sugiere un precio competitivo (si está muy alto o muy bajo, ajusta)
4. Devuelve SOLO un número (sin símbolos, puntos ni comas)
5. Si no puedes estimar, devuelve el precio actual

RESPONDE SOLO CON EL NÚMERO DEL PRECIO SUGERIDO.`;

  const result = await generateWithFallback(prompt);

  if (result) {
    const parsed = parseInt(result.trim().replace(/\D/g, ""), 10);
    if (!isNaN(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
}

export function calculatePriceDifference(
  currentPrice: number,
  suggestedPrice: number
): { percentage: number; difference: number; recommendation: string } {
  const difference = suggestedPrice - currentPrice;
  const percentage = (difference / currentPrice) * 100;

  let recommendation = "";
  if (percentage > 10) {
    recommendation = "Precio podría ser más competitivo (baja 5-10%)";
  } else if (percentage < -10) {
    recommendation = "Precio está bajo, considere aumentar 5-10%";
  } else {
    recommendation = "Precio es competitivo para la zona";
  }

  return { percentage, difference, recommendation };
}
