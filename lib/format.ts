export function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export const OPERACION_LABEL: Record<string, string> = {
  VENTA: "Venta",
  ARRIENDO: "Arriendo",
};

export const TIPO_LABEL: Record<string, string> = {
  CASA: "Casa",
  APARTAMENTO: "Apartamento",
  LOTE: "Lote",
  LOCAL: "Local",
};
