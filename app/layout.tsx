import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { SessionProvider } from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "PUBLICASA.co | Marketplace inmobiliario",
  description:
    "Encuentra, publica y gestiona inmuebles en PUBLICASA.co, el marketplace inmobiliario potenciado con agentes de IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <Nav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
