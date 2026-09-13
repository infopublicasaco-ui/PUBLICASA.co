import Link from "next/link";
import Image from "next/image";
import { formatCOP, OPERACION_LABEL, TIPO_LABEL } from "@/lib/format";

interface Property {
  id: string;
  titulo: string;
  tipo: string;
  operacion: string;
  precio: any;
  fotos: Array<{ url: string }>;
  barrio: string;
  ciudad: string;
}

interface SimilarPropertiesProps {
  properties: Property[];
}

export function SimilarProperties({ properties }: SimilarPropertiesProps) {
  if (properties.length === 0) return null;

  return (
    <section className="mt-16 py-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Propiedades similares</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {properties.map((property) => {
          const portada = property.fotos[0];
          return (
            <Link
              key={property.id}
              href={`/propiedades/${property.id}`}
              className="group rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {portada && (
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={portada.url}
                    alt={property.titulo}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              )}
              <div className="p-3">
                <p className="font-bold text-gray-900">{formatCOP(property.precio.toNumber())}</p>
                <p className="truncate text-sm text-gray-600">{property.titulo}</p>
                <p className="text-xs text-gray-500">
                  {property.barrio}, {property.ciudad}
                </p>
                <div className="mt-2 flex gap-1">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                    {TIPO_LABEL[property.tipo as keyof typeof TIPO_LABEL]}
                  </span>
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                    {OPERACION_LABEL[property.operacion as keyof typeof OPERACION_LABEL]}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
