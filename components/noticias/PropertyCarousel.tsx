"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import type { Property, PropertyPhoto } from "@prisma/client";

type PropertyWithPhotos = Property & { fotos: PropertyPhoto[] };

export function PropertyCarousel({ properties }: { properties: PropertyWithPhotos[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 0);
      setCanScrollRight(
        carouselRef.current.scrollLeft <
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
      );
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.querySelector(".prop-card")?.clientWidth || 260;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -cardWidth * 2 : cardWidth * 2,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="mt-20 pt-12 border-t border-gray-200">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Inmuebles destacados</h2>
          <p className="text-gray-600 mt-1">Propiedades publicadas recientemente en nuestra plataforma</p>
        </div>
        <Link href="/" className="text-brand-green font-semibold text-sm whitespace-nowrap hover:gap-1 flex items-center gap-0 transition-all">
          Ver todos los inmuebles →
        </Link>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 mb-4 scrollbar-hide"
      >
        {properties.map((property) => {
          const photo = property.fotos[0];
          const typeLabel =
            property.tipo === "CASA"
              ? "Casa"
              : property.tipo === "APARTAMENTO"
                ? "Apartamento"
                : property.tipo === "LOTE"
                  ? "Lote"
                  : "Local";

          return (
            <Link
              key={property.id}
              href={`/propiedades/${property.id}`}
              className="prop-card flex-shrink-0 w-60 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {/* Image */}
              <div className="relative w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden group">
                {photo?.url ? (
                  <img
                    src={photo.url}
                    alt={property.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin foto
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {typeLabel}
                </div>
                {property.estado === "ACTIVO" && (
                  <div className="absolute top-3 right-3 bg-brand-green text-white text-xs font-bold px-2 py-1 rounded-full">
                    ✓ Activo
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <div className="text-xl font-bold text-gray-900">
                  ${property.precio.toLocaleString("es-CO")}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  📍 {property.barrio}, {property.ciudad}
                </div>
                <div className="flex gap-2 text-xs text-gray-500 pt-2">
                  {property.areaPrivadaM2 && (
                    <>
                      <span>📐 {property.areaPrivadaM2} m²</span>
                      <span>•</span>
                    </>
                  )}
                  {property.habitaciones && (
                    <>
                      <span>🛏 {property.habitaciones} hab.</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-brand-green/10 hover:border-brand-green hover:text-brand-green disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Anterior"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:bg-brand-green/10 hover:border-brand-green hover:text-brand-green disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Siguiente"
        >
          →
        </button>
      </div>
    </section>
  );
}
