import Link from "next/link";
import Image from "next/image";
import type { Property, PropertyPhoto } from "@prisma/client";
import { formatCOP, OPERACION_LABEL, TIPO_LABEL } from "@/lib/format";

type PropertyWithFotos = Property & { fotos: PropertyPhoto[] };

export function PropertyCard({ property }: { property: PropertyWithFotos }) {
  const portada = property.fotos.find((f) => f.esPortada) ?? property.fotos[0];

  return (
    <Link
      href={`/propiedades/${property.id}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
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
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-gray-800">
          {OPERACION_LABEL[property.operacion]}
        </span>
      </div>
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-900">{formatCOP(property.precio.toNumber())}</p>
        <h3 className="mt-1 truncate text-sm font-medium text-gray-800">{property.titulo}</h3>
        <p className="mt-1 text-sm text-gray-500">
          {property.barrio}, {property.ciudad}
        </p>
        <div className="mt-3 flex gap-3 text-sm text-gray-600">
          {property.habitaciones != null && <span>{property.habitaciones} hab.</span>}
          {property.banos != null && <span>{property.banos} baños</span>}
          {property.areaConstruidaM2 != null && <span>{property.areaConstruidaM2} m²</span>}
        </div>
        <p className="mt-2 text-xs uppercase tracking-wide text-gray-400">{TIPO_LABEL[property.tipo]}</p>
      </div>
    </Link>
  );
}
