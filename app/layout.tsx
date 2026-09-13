import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { SessionProvider } from "@/components/SessionProvider";
import { Footer } from "@/components/home/Footer";

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
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <Nav />
          <div className="flex-1">{children}</div>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
