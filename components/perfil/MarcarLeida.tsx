"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function MarcarLeida({ solicitudId }: { solicitudId: string }) {
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);

  async function marcar() {
    setEnviando(true);
    const res = await fetch(`/api/contacto/${solicitudId}`, { method: "PATCH" });
    if (res.ok) router.refresh();
    else setEnviando(false);
  }

  return (
    <button
      onClick={marcar}
      disabled={enviando}
      className="text-xs font-medium text-brand-blue hover:underline disabled:opacity-50"
    >
      {enviando ? "Marcando…" : "Marcar como leída"}
    </button>
  );
}
