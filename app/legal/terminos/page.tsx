import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Términos y Condiciones | PUBLICASA.co" };

export default function TerminosPage() {
  return <LegalPlaceholder title="Términos y Condiciones" />;
}
