import { MapBackgroundLoader } from "./MapBackgroundLoader";
import { FeaturedSpaces } from "./FeaturedSpaces";
import { HeroSearch } from "./HeroSearch";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <MapBackgroundLoader />
      </div>
      <div className="absolute inset-0 z-10 bg-white/75" />

      <div className="relative z-20 mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:gap-12 lg:px-8 lg:py-16">
        <div className="lg:w-72 lg:shrink-0">
          <FeaturedSpaces />
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-extrabold leading-tight text-brand-blue sm:text-4xl lg:text-5xl">
            Encuentra tu hogar en el mapa
          </h1>
          <p className="mt-3 text-base font-medium uppercase text-gray-700 sm:text-lg">
            Busca casas, apartamentos y lotes por ubicación real, no por lista genérica.
          </p>

          <div className="mt-8 max-w-2xl">
            <HeroSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
