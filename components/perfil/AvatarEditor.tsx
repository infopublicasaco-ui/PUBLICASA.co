"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/Avatar";

export function AvatarEditor({ nombre, imageUrl }: { nombre: string; imageUrl: string | null }) {
  const router = useRouter();
  const [editando, setEditando] = useState(false);
  const [url, setUrl] = useState(imageUrl ?? "");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function guardar(nuevaImagen: string | null) {
    setGuardando(true);
    setError(null);

    const res = await fetch("/api/perfil", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: nuevaImagen }),
    });

    const data = await res.json().catch(() => ({}));
    setGuardando(false);

    if (!res.ok) {
      setError(data.error ?? "No se pudo guardar el logo.");
      return;
    }

    setEditando(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar nombre={nombre} imageUrl={imageUrl} size="lg" />

      <div>
        {!editando ? (
          <button
            type="button"
            onClick={() => {
              setUrl(imageUrl ?? "");
              setEditando(true);
            }}
            className="text-sm font-medium text-brand-blue hover:underline"
          >
            {imageUrl ? "Cambiar logo" : "Agregar logo o foto de tu empresa"}
          </button>
        ) : (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://ejemplo.com/logo.png"
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm sm:w-72"
            />
            <div className="flex gap-2">
              <button
                type="button"
                disabled={guardando || !url}
                onClick={() => guardar(url)}
                className="rounded-lg bg-brand-green px-3 py-1.5 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {guardando ? "Guardando…" : "Guardar"}
              </button>
              {imageUrl && (
                <button
                  type="button"
                  disabled={guardando}
                  onClick={() => guardar(null)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                >
                  Quitar
                </button>
              )}
              <button
                type="button"
                onClick={() => setEditando(false)}
                className="rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
