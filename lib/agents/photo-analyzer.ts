import Anthropic from "@anthropic-ai/sdk";

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

export interface PhotoAnalysis {
  tipoInmueble: string;
  calidad: "excelente" | "buena" | "regular" | "pobre";
  luminosidad: "muy buena" | "buena" | "regular" | "pobre";
  estado: string;
  caracteristicasVisibles: string[];
  sugerenciasUso: string[];
}

async function imageToBase64(imageUrl: string): Promise<string | null> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return null;
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString("base64");
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

export async function analyzePropertyPhoto(imageUrl: string): Promise<PhotoAnalysis | null> {
  if (!anthropic) return null;

  const base64 = await imageToBase64(imageUrl);
  if (!base64) return null;

  try {
    const message = await anthropic.messages.create({
      model: "claude-opus-5",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: base64,
              },
            },
            {
              type: "text",
              text: `Analiza esta foto de inmueble. Responde en JSON puro (sin markdown):
{
  "tipoInmueble": "casa|apartamento|local|lote|otro",
  "calidad": "excelente|buena|regular|pobre",
  "luminosidad": "muy buena|buena|regular|pobre",
  "estado": "descripción breve del estado general del espacio",
  "caracteristicasVisibles": ["característica1", "característica2", ...],
  "sugerenciasUso": ["sugerencia1", "sugerencia2", ...]
}

Enfócate en:
- Calidad constructiva y acabados
- Luminosidad natural
- Orden y limpieza
- Elementos decorativos
- Potencial para venta/arriendo

Devuelve SOLO el JSON válido, sin explicaciones.`,
            },
          ],
        },
      ],
    });

    if (message.content[0].type === "text") {
      const text = message.content[0].text.trim();
      // Intenta parsear JSON directo o extraer JSON si hay markdown
      let jsonStr = text;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }

      const parsed = JSON.parse(jsonStr);
      return {
        tipoInmueble: parsed.tipoInmueble || "desconocido",
        calidad: parsed.calidad || "regular",
        luminosidad: parsed.luminosidad || "regular",
        estado: parsed.estado || "",
        caracteristicasVisibles: Array.isArray(parsed.caracteristicasVisibles)
          ? parsed.caracteristicasVisibles
          : [],
        sugerenciasUso: Array.isArray(parsed.sugerenciasUso) ? parsed.sugerenciasUso : [],
      };
    }
    return null;
  } catch (error) {
    console.error("Error analyzing photo:", error);
    return null;
  }
}

export async function analyzePropertyPhotos(
  imageUrls: string[]
): Promise<{ analisis: PhotoAnalysis[]; resumen: string } | null> {
  if (!anthropic || imageUrls.length === 0) return null;

  const analisis = await Promise.all(imageUrls.map((url) => analyzePropertyPhoto(url)));
  const validAnalysis = analisis.filter((a): a is PhotoAnalysis => a !== null);

  if (validAnalysis.length === 0) return null;

  // Crear resumen consolidado
  const calidadPromedio =
    validAnalysis.reduce((acc, a) => acc + (a.calidad === "excelente" ? 4 : a.calidad === "buena" ? 3 : a.calidad === "regular" ? 2 : 1), 0) /
    validAnalysis.length;
  const todasLasCaracteristicas = [...new Set(validAnalysis.flatMap((a) => a.caracteristicasVisibles))];

  const resumen = `Fotos analizadas: ${validAnalysis.length}. Calidad promedio: ${
    calidadPromedio >= 3.5 ? "excelente" : calidadPromedio >= 2.5 ? "buena" : "regular"
  }. Características destacadas: ${todasLasCaracteristicas.slice(0, 5).join(", ")}`;

  return { analisis: validAnalysis, resumen };
}
