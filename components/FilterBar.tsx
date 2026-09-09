"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { TIPO_LABEL } from "@/lib/format";

const PRESUPUESTOS = [
  { label: "Cualquier presupuesto", min: undefined, max: undefined },
  { label: "Hasta $300M", min: undefined, max: 300_000_000 },
  { label: "$300M - $700M", min: 300_000_000, max: 700_000_000 },
  { label: "$700M - $1.500M", min: 700_000_000, max: 1_500_000_000 },
  { label: "Más de $1.500M", min: 1_500_000_000, max: undefined },
];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const operacion = searchParams.get("operacion") ?? "VENTA";
  const tipo = searchParams.get("tipo") ?? "";
  const presupuestoIndex = Number(searchParams.get("presupuesto") ?? 0);

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`/inmuebles?${params.toString()}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParams({ q: q || undefined });
  }

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-4 py-3">
        <form onSubmit={handleSubmit} className="flex min-w-[220px] flex-1 items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ciudad o barrio, ej: Bogotá"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Buscar
          </button>
        </form>

        <div className="flex overflow-hidden rounded-lg border border-gray-300 text-sm">
          {(["VENTA", "ARRIENDO"] as const).map((op) => (
            <button
              key={op}
              onClick={() => updateParams({ operacion: op })}
              className={`px-3 py-2 font-medium ${
                operacion === op ? "bg-gray-900 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {op === "VENTA" ? "Comprar" : "Arrendar"}
            </button>
          ))}
        </div>

        <select
          value={tipo}
          onChange={(e) => updateParams({ tipo: e.target.value || undefined })}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        >
          <option value="">Tipo de inmueble</option>
          {Object.entries(TIPO_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={presupuestoIndex}
          onChange={(e) => {
            const idx = Number(e.target.value);
            const preset = PRESUPUESTOS[idx];
            updateParams({
              presupuesto: idx ? String(idx) : undefined,
              precioMin: preset.min ? String(preset.min) : undefined,
              precioMax: preset.max ? String(preset.max) : undefined,
            });
          }}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
        >
          {PRESUPUESTOS.map((preset, idx) => (
            <option key={preset.label} value={idx}>
              {preset.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
