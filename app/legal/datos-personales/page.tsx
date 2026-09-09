import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

export const metadata: Metadata = { title: "Política de Tratamiento de Datos Personales | PUBLICASA.co" };

export default function DatosPersonalesPage() {
  return <LegalPlaceholder title="Política de Tratamiento de Datos Personales" />;
}
