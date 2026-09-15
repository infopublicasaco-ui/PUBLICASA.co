"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ContactForm } from "./ContactForm";
import { SellerContactInfo } from "./SellerContactInfo";

type Foto = { id: string; url: string };

export function PropertyGallery({
  fotos,
  titulo,
  precioLabel,
  specsLabel,
  ubicacionLabel,
  propertyId,
  vendedorNombre,
  vendedorImagen,
}: {
  fotos: Foto[];
  titulo: string;
  precioLabel: string;
  specsLabel: string;
  ubicacionLabel: string;
  propertyId: string;
  vendedorNombre: string;
  vendedorImagen?: string | null;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const portada = fotos[0];
  const restoFotos = fotos.slice(1, 4);
  const fotosOcultas = fotos.length - 4;

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % fotos.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + fotos.length) % fotos.length));
    }
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, fotos.length]);

  async function handleShare() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: titulo, url }).catch(() => {});
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  if (fotos.length === 0) return null;

  return (
    <>
      <div className="mb-6 grid grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setOpenIndex(0)}
          className="relative col-span-4 h-80 w-full overflow-hidden rounded-xl sm:col-span-3"
        >
          <Image
            src={portada.url}
            alt={titulo}
            fill
            sizes="(min-width: 640px) 75vw, 100vw"
            className="object-cover"
            priority
          />
        </button>
        <div className="col-span-4 grid grid-cols-4 gap-2 sm:col-span-1 sm:grid-cols-1">
          {restoFotos.map((foto, i) => {
            const isLastVisible = i === restoFotos.length - 1 && fotosOcultas > 0;
            return (
              <button
                type="button"
                key={foto.id}
                onClick={() => setOpenIndex(i + 1)}
                className="relative h-20 w-full overflow-hidden rounded-lg sm:h-24"
              >
                <Image src={foto.url} alt="" fill sizes="200px" className="object-cover" />
                {isLastVisible && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-semibold text-white">
                    +{fotosOcultas}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {openIndex !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-gray-950">
          <div className="flex flex-wrap items-start justify-between gap-3 bg-gray-950/95 px-4 py-3 text-white sm:px-6">
            <div>
              <p className="text-lg font-bold sm:text-xl">
                {precioLabel}
                {specsLabel && <span className="ml-2 text-sm font-normal text-gray-300">| {specsLabel}</span>}
              </p>
              <p className="text-sm text-gray-400">{ubicacionLabel}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
              >
                {copiado ? "¡Enlace copiado!" : "Compartir"}
              </button>
              <button
                type="button"
                onClick={() => setShowContact((v) => !v)}
                className="rounded-lg bg-brand-green px-4 py-2 text-sm font-semibold hover:opacity-90"
              >
                Contactar
              </button>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Cerrar galería"
                className="rounded-lg bg-white/10 p-2 hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden">
            <div className="relative h-full w-full max-w-5xl">
              <Image
                src={fotos[openIndex].url}
                alt={`${titulo} - foto ${openIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            {fotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setOpenIndex((i) => (i === null ? i : (i - 1 + fotos.length) % fotos.length))}
                  aria-label="Foto anterior"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-6"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setOpenIndex((i) => (i === null ? i : (i + 1) % fotos.length))}
                  aria-label="Foto siguiente"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-6"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {openIndex + 1} / {fotos.length}
            </span>
          </div>

          {showContact && (
            <div className="fixed inset-0 z-10 flex items-end bg-black/50 sm:items-stretch sm:justify-end">
              <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-white p-5 sm:h-full sm:max-h-none sm:w-96 sm:rounded-none">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Contactar al vendedor</h2>
                  <button
                    type="button"
                    onClick={() => setShowContact(false)}
                    aria-label="Cerrar formulario"
                    className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>
                <SellerContactInfo
                  nombre={vendedorNombre}
                  imageUrl={vendedorImagen}
                  showDirectButtons={false}
                />
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <ContactForm propertyId={propertyId} tituloInmueble={titulo} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
