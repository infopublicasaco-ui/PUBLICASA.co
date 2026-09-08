import { getActiveProperties } from "@/lib/db/properties";
import { PropertyCard } from "@/components/PropertyCard";

export const revalidate = 60;

export default async function Home() {
  const properties = await getActiveProperties();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">PublicAsa.co</h1>
        <p className="mt-1 text-gray-600">{properties.length} inmuebles disponibles</p>
      </header>

      {properties.length === 0 ? (
        <p className="text-gray-500">Todavía no hay inmuebles publicados.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </main>
  );
}
