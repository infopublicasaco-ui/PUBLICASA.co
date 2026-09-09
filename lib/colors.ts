export const STAT_COLORS = [
  { bg: "bg-brand-blue", text: "text-brand-blue" },
  { bg: "bg-brand-green", text: "text-brand-green" },
  { bg: "bg-brand-orange", text: "text-brand-orange" },
  { bg: "bg-brand-cyan", text: "text-brand-cyan" },
] as const;

export function getStatColor(index: number) {
  return STAT_COLORS[index % STAT_COLORS.length];
}

export const ROLE_BADGE_COLORS: Record<string, { bg: string; text: string }> = {
  ADMIN: { bg: "bg-brand-blue", text: "text-brand-blue" },
  PROPIETARIO: { bg: "bg-brand-green", text: "text-brand-green" },
  COMPRADOR: { bg: "bg-brand-cyan", text: "text-brand-cyan" },
};
