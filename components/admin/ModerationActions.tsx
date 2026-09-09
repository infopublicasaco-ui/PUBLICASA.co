"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ModerationActions({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const [modoRechazo, setModoRechazo] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function moderar(accion: "aprobar" | "rechazar") {
    setEnviando(true);
    setError(null);

    const res = await fetch(`/api/admin/propiedades/${propertyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accion, motivo }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "No se pudo completar la acción.");
      setEnviando(false);
      return;
    }

    router.refresh();
  }

  if (modoRechazo) {
    return (
      <div className="space-y-2">
        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          rows={3}
          autoFocus
          placeholder="Motivo del rechazo (lo verá el propietario)"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-2">
          <button
            onClick={() => moderar("rechazar")}
            disabled={enviando || !motivo.trim()}
            className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {enviando ? "Rechazando…" : "Confirmar rechazo"}
          </button>
          <button
            onClick={() => {
              setModoRechazo(false);
              setError(null);
            }}
            disabled={enviando}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          onClick={() => moderar("aprobar")}
          disabled={enviando}
          className="rounded-lg bg-brand-blue px-4 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {enviando ? "Aprobando…" : "Aprobar"}
        </button>
        <button
          onClick={() => setModoRechazo(true)}
          disabled={enviando}
          className="rounded-lg border border-gray-300 px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
