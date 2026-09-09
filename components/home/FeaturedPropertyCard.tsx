import Link from "next/link";
import Image from "next/image";
import type { Property, PropertyPhoto } from "@prisma/client";
import { formatCOP, OPERACION_LABEL, TIPO_LABEL } from "@/lib/format";
import { HeartButton } from "./HeartButton";

type PropertyWithFotos = Property & { fotos: PropertyPhoto[] };

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-blue" fill="currentColor">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  );
}

export function FeaturedPropertyCard({ property }: { property: PropertyWithFotos }) {
  const portada = property.fotos.find((f) => f.esPortada) ?? property.fotos[0];
  const valorLabel = property.operacion === "VENTA" ? "Valor de compra:" : "Valor de arriendo:";

  const specs = [
    property.areaConstruidaM2 != null ? `${property.areaConstruidaM2} m²` : null,
    property.habitaciones != null ? `Habit. ${property.habitaciones}` : null,
    property.banos != null ? `Baños ${property.banos}` : null,
    property.parqueaderos != null ? `Garaje ${property.parqueaderos}` : null,
  ].filter(Boolean) as string[];

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="group block shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {portada ? (
          <Image
            src={portada.url}
            alt={property.titulo}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">Sin foto</div>
        )}
        <HeartButton />
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500">{valorLabel}</p>
        <p className="mt-1 text-2xl font-extrabold text-gray-900">{formatCOP(property.precio.toNumber())}</p>
        <p className="mt-1 text-sm font-medium text-gray-700">
          {TIPO_LABEL[property.tipo]} en {OPERACION_LABEL[property.operacion]}
        </p>

        <p className="mt-3 flex items-center gap-1.5 text-sm text-gray-600">
          <PinIcon />
          {property.barrio}, {property.ciudad}
        </p>

        {specs.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-gray-100 pt-3 text-xs text-gray-600">
            {specs.map((spec, i) => (
              <span key={spec} className="flex items-center gap-3">
                {i > 0 && <span className="text-gray-300">|</span>}
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
