import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PublicAsa.co | Marketplace inmobiliario",
  description:
    "Encuentra, publica y gestiona inmuebles en PublicAsa.co, el marketplace inmobiliario potenciado con agentes de IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
