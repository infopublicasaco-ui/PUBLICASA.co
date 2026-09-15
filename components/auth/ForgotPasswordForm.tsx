"use client";

import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resetLink, setResetLink] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setResetLink(null);

    if (!email.trim()) {
      setError("Por favor ingresa tu correo electrónico");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "No se pudo procesar tu solicitud");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setResetLink(data.resetLink);
      setEmail("");
      setLoading(false);
    } catch (err) {
      setError("Error al procesar la solicitud. Intenta más tarde.");
      setLoading(false);
    }
  }

  if (success && resetLink) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-sm font-medium text-green-900">✓ Enlace de recuperación generado</p>
          <p className="mt-2 text-sm text-green-800">
            Usa el siguiente enlace para resetear tu contraseña (válido por 1 hora):
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-4 break-all">
          <p className="text-xs text-gray-600 mb-2">Copia este enlace:</p>
          <a
            href={resetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline text-sm"
          >
            {resetLink}
          </a>
        </div>

        <button
          onClick={() => {
            setSuccess(false);
            setResetLink(null);
          }}
          className="w-full rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Generar otro enlace
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none focus:ring-1 focus:ring-brand-blue"
        />
      </div>

      {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand-blue px-4 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Enviando…" : "Enviar enlace de recuperación"}
      </button>
    </form>
  );
}
