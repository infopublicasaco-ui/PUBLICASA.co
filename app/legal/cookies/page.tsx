import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Políticas de Cookies | PUBLICASA.co" };

export default function CookiesPage() {
  return <LegalPlaceholder title="Políticas de Cookies" />;
}
