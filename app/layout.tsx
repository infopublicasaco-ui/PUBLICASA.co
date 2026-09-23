import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
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
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <SessionProvider>
          <Nav />
          <div className="flex-1">{children}</div>
          <Footer />
        </SessionProvider>
      </body>
      {/* Google Analytics es opcional: solo se carga si hay Measurement ID en
          .env. Ver NEXT_PUBLIC_GA_MEASUREMENT_ID en .env.example. */}
      {gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
    </html>
  );
}
