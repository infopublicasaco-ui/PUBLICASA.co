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
  const [mensaje, setMensaje] = useState(
    `Hola, me interesa "${tituloInmueble}". ¿Podemos agendar una visita?`
  );
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  // El usuario logueado no reescribe sus datos: se toman de la sesión.
  const nombreFinal = session?.user?.name ?? nombre;
  const emailFinal = session?.user?.email ?? email;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError(null);

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
      <div className="rounded-lg bg-brand-green/10 p-3">
        <p className="text-sm font-medium text-gray-900">Mensaje enviado</p>
        <p className="mt-1 text-sm text-gray-600">
          El propietario recibió tu solicitud y podrá responderte al contacto que dejaste.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {!session?.user && (
        <div className="grid gap-3">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu email"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none"
          />
        </div>
      )}

      <input
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        placeholder="Tu teléfono (opcional si dejas email)"
        className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none"
      />

      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        rows={4}
        className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none"
      />

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="mt-3 w-full rounded-lg bg-brand-blue px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
      >
        {enviando ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
