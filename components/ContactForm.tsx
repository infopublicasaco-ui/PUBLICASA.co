"use client";

import { useSession } from "next-auth/react";
import { useState, useRef } from "react";

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
  const [mensaje, setMensaje] = useState("Hola, encontré esta propiedad en Publicasa.co y me gustaría más información.");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);
  const [erroresValidacion, setErroresValidacion] = useState<Record<string, string>>({});

  const nombreFinal = session?.user?.name ?? nombre;
  const emailFinal = session?.user?.email ?? email;

  // Validar email
  function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Validar teléfono (solo números, espacios, guiones, paréntesis, +)
  function validarTelefono(tel: string): boolean {
    const regex = /^[\d\s\-\+\(\)]+$/;
    return tel.length >= 7 && regex.test(tel);
  }

  function validarFormulario(): boolean {
    const errores: Record<string, string> = {};

    if (!nombreFinal || nombreFinal.trim().length < 2) {
      errores.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    if (!emailFinal || !validarEmail(emailFinal)) {
      errores.email = "El email no es válido (ejemplo: usuario@dominio.com)";
    }

    if (!telefono || !validarTelefono(telefono)) {
      errores.telefono = "El teléfono debe tener al menos 7 dígitos y solo números, espacios o caracteres válidos";
    }

    if (!aceptaTerminos) {
      errores.terminos = "Debes aceptar los términos y condiciones";
    }

    setErroresValidacion(errores);
    return Object.keys(errores).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Validar formulario antes de enviar
    if (!validarFormulario()) {
      return;
    }

    // Protección contra bots: si honeypot tiene valor, silenciosamente retornar éxito
    if (honeypot.trim() !== "") {
      setEnviado(true);
      return;
    }

    setEnviando(true);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          nombre: nombreFinal,
          email: emailFinal,
          telefono,
          mensaje,
          consentimiento: aceptaTerminos,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "No se pudo enviar el mensaje.");
        setEnviando(false);
        return;
      }

      setEnviado(true);
      setEnviando(false);
    } catch (err) {
      setError("Error al procesar la solicitud. Intenta más tarde.");
      setEnviando(false);
    }
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
      {/* Honeypot - campo oculto anti-bot */}
      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Nombre y Apellido */}
      {!session?.user && (
        <>
          <div>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre y Apellido*"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${
                erroresValidacion.nombre
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
              }`}
            />
            {erroresValidacion.nombre && (
              <p className="mt-1 text-xs text-red-600">{erroresValidacion.nombre}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email*"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${
                erroresValidacion.email
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
              }`}
            />
            {erroresValidacion.email && (
              <p className="mt-1 text-xs text-red-600">{erroresValidacion.email}</p>
            )}
          </div>
        </>
      )}

      {/* País + Teléfono */}
      <div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2.5 bg-white">
            <span className="text-lg">🇨🇴</span>
            <span className="text-sm font-medium text-gray-700">+57</span>
          </div>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value.replace(/[^\d\s\-\+\(\)]/g, ""))}
            placeholder="Teléfono*"
            className={`flex-1 rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${
              erroresValidacion.telefono
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-brand-blue focus:ring-brand-blue"
            }`}
          />
        </div>
        {erroresValidacion.telefono && (
          <p className="mt-1 text-xs text-red-600">{erroresValidacion.telefono}</p>
        )}
      </div>

      {/* Mensaje */}
      <textarea
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Tu mensaje..."
        rows={4}
        maxLength={1000}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
      />

      {/* Términos y Condiciones */}
      <div>
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
        {erroresValidacion.terminos && (
          <p className="mt-1 text-xs text-red-600">{erroresValidacion.terminos}</p>
        )}
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      {/* Botón Contactar */}
      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-lg bg-brand-green px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        <span>✉️</span>
        {enviando ? "Enviando…" : "Contactar"}
      </button>
    </form>
  );
}
