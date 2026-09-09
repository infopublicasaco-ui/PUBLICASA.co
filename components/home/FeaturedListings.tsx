import Link from "next/link";
import { getFeaturedProperties } from "@/lib/db/properties";
import { FeaturedPropertyCard } from "./FeaturedPropertyCard";

export async function FeaturedListings() {
  const properties = await getFeaturedProperties(3);

  if (properties.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">Inmuebles destacados</h2>

        <div className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {properties.map((property) => (
            <div key={property.id} className="w-[85%] shrink-0 sm:w-[45%] lg:w-auto">
              <FeaturedPropertyCard property={property} />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/inmuebles"
            className="inline-block rounded-xl bg-brand-blue px-8 py-3 font-bold uppercase tracking-wide text-white hover:opacity-90"
          >
            Ver todas las propiedades
          </Link>
        </div>
      </div>
    </section>
  );
}
