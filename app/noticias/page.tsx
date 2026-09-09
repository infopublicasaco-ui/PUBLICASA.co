import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noticias | PUBLICASA.co",
};

export default function NoticiasPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold text-brand-blue">Noticias</h1>
      <p className="mt-3 text-gray-600">Muy pronto vas a encontrar aquí noticias del sector inmobiliario.</p>
    </main>
  );
}
