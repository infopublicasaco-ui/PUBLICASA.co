import { getFilteredProperties } from "@/lib/db/properties";
import { PropertyCard } from "@/components/PropertyCard";
import { FilterBar } from "@/components/FilterBar";
import { PropertyMapLoader } from "@/components/PropertyMapLoader";
import type { OperationType, PropertyType } from "@prisma/client";
import type { MapProperty } from "@/components/PropertyMap";

// Listado con filtros en tiempo real: al leer `searchParams`, Next.js renderiza
// esta página en SSR puro (sin ISR) en cada visita — Googlebot recibe siempre
// el HTML ya filtrado, nunca un estado de carga.

type InmueblesProps = {
  searchParams: {
    operacion?: string;
    tipo?: string;
    q?: string;
    precioMin?: string;
    precioMax?: string;
    sortBy?: string;
  };
};

export default async function InmueblesPage({ searchParams }: InmueblesProps) {
  const properties = await getFilteredProperties({
    operacion: searchParams.operacion as OperationType | undefined,
    tipo: searchParams.tipo
      ? (searchParams.tipo.split(",") as PropertyType[])
      : undefined,
    q: searchParams.q,
    precioMin: searchParams.precioMin ? Number(searchParams.precioMin) : undefined,
    precioMax: searchParams.precioMax ? Number(searchParams.precioMax) : undefined,
    sortBy: searchParams.sortBy as any,
  });

  const mapProperties: MapProperty[] = properties.map((property) => {
    const portada = property.fotos.find((f) => f.esPortada) ?? property.fotos[0];
    return {
      id: property.id,
      titulo: property.titulo,
      precio: property.precio.toNumber(),
      latitud: property.latitud,
      longitud: property.longitud,
      barrio: property.barrio,
      ciudad: property.ciudad,
      fotoUrl: portada?.url ?? null,
    };
  });

  return (
    <main className="flex h-[calc(100vh-5rem)] flex-col">
      <FilterBar />

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="order-2 flex-1 overflow-y-auto p-4 lg:order-1 lg:max-w-xl">
          <p className="mb-4 text-sm text-gray-600">
            {properties.length} inmuebles encontrados
          </p>

          {properties.length === 0 ? (
            <p className="text-gray-500">
              No encontramos inmuebles con esos filtros. Intenta ajustarlos.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>

        <div className="order-1 h-64 shrink-0 lg:order-2 lg:h-auto lg:flex-1">
          <PropertyMapLoader properties={mapProperties} />
        </div>
      </div>
    </main>
  );
}
