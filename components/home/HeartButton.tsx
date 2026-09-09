"use client";

import { useState } from "react";

export function HeartButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setSaved((v) => !v);
      }}
      aria-label={saved ? "Quitar de favoritos" : "Guardar en favoritos"}
      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow hover:bg-white"
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${saved ? "text-red-500" : "text-gray-400"}`}
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20s-7-4.4-9.5-8.8C.8 8 2 4.5 5.3 3.6c2-.5 4 .3 5 2 1-1.7 3-2.5 5-2 3.3.9 4.5 4.4 2.8 7.6C19 15.6 12 20 12 20Z"
        />
      </svg>
    </button>
  );
}
