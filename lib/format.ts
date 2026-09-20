export function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

// Formato compacto para las burbujas de precio del mapa, ej: $930M, $2.190M
export function formatCOPCompact(value: number) {
  const millones = value / 1_000_000;
  const redondeado =
    millones >= 100 ? Math.round(millones) : Math.round(millones * 10) / 10;
  return `$${redondeado.toLocaleString("es-CO")}M`;
}

export const OPERACION_LABEL: Record<string, string> = {
  VENTA: "Venta",
  ARRIENDO: "Arriendo",
};

export const TIPO_LABEL: Record<string, string> = {
  CASA: "Casa",
  APARTAMENTO: "Apartamento",
  LOTE: "Lote",
  LOCAL: "Local/Oficina",
};
