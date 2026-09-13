"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";

export function ContactForm({
  propertyId,
  tituloInmueble,
}: {
  propertyId: string;
  tituloInmueble: string;
}) {
  const { data: session } = useSession();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState(`Hola, vi esta propiedad en Publicasa.co y me gustaría más información.`);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  const nombreFinal = session?.user?.name ?? nombre;
  const emailFinal = session?.user?.email ?? email;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!aceptaTerminos) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    if (!nombreFinal || !emailFinal || !telefono) {
      setError("Por favor completa todos los campos");
      return;
    }

    setEnviando(true);

    const res = await fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyId,
        mensaje,
        nombre: nombreFinal,
        email: emailFinal,
        telefono,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "No se pudo enviar el mensaje.");
      setEnviando(false);
      return;
    }

    setEnviado(true);
    setEnviando(false);
  }

  if (enviado) {
    return (
      <div className="rounded-lg bg-green-50 p-4 border border-green-200">
        <p className="text-sm font-medium text-green-900">¡Mensaje enviado!</p>
        <p className="mt-2 text-sm text-green-800">
          El propietario ha recibido tu solicitud y te contactará pronto.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nombre y Apellido */}
      {!session?.user && (
        <>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre y Apellido*"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email*"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
          />
        </>
      )}

      {/* País + Teléfono */}
      <div className="flex gap-2">
        <div className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2.5 bg-white">
          <span className="text-lg">🇨🇴</span>
          <span className="text-sm font-medium text-gray-700">+57</span>
        </div>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono*"
          required
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
        />
      </div>

      {/* Mensaje */}
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Tu mensaje..."
        rows={4}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
      />

      {/* Términos y Condiciones */}
      <label className="flex items-start gap-2.5">
        <input
          type="checkbox"
          checked={aceptaTerminos}
          onChange={(e) => setAceptaTerminos(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue cursor-pointer"
        />
        <span className="text-xs text-gray-600">
          Acepto los{" "}
          <a href="/legal/terminos" className="text-brand-blue font-medium hover:underline">
            Términos y condiciones
          </a>{" "}
          y la{" "}
          <a href="/legal/datos-personales" className="text-brand-blue font-medium hover:underline">
            Política de privacidad
          </a>
        </span>
      </label>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      {/* Botón Contactar */}
      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-lg bg-brand-blue px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        <span>✉️</span>
        {enviando ? "Enviando…" : "Contactar"}
      </button>
    </form>
  );
}
