"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const TIPOS = [
  { value: "CASA", label: "Casas" },
  { value: "APARTAMENTO", label: "Apartamentos" },
  { value: "LOTE", label: "Lotes" },
  { value: "LOCAL", label: "Local/Oficina" },
];

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [operacion, setOperacion] = useState<"VENTA" | "ARRIENDO">("VENTA");
  const [tipo, setTipo] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("operacion", operacion);
    if (tipo) params.set("tipo", tipo);
    router.push(`/inmuebles?${params.toString()}`);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 rounded-2xl bg-[#f2f2ea] p-2 sm:flex-row sm:items-center"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ciudad, barrio o dirección"
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-gray-800 placeholder:text-gray-500 focus:outline-none"
        />
        <div className="hidden h-8 w-px shrink-0 bg-gray-300 sm:block" />
        <select
          value={operacion}
          onChange={(e) => setOperacion(e.target.value as "VENTA" | "ARRIENDO")}
          className="shrink-0 bg-transparent px-4 py-3 font-semibold text-gray-800 focus:outline-none"
        >
          <option value="VENTA">Comprar</option>
          <option value="ARRIENDO">Arrendar</option>
        </select>
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-brand-blue px-8 py-3 font-bold uppercase tracking-wide text-white hover:opacity-90"
        >
          Buscar
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-3">
        {TIPOS.map((t) => {
          const active = tipo === t.value;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setTipo(active ? null : t.value)}
              className={`rounded-lg px-5 py-2 text-sm font-bold uppercase tracking-wide ${
                active
                  ? "bg-brand-green text-white"
                  : "border border-gray-300 bg-white text-gray-700 hover:border-brand-blue"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
