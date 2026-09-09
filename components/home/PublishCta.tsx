export function PublishCta() {
  return (
    <section className="bg-brand-bg py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight text-brand-blue sm:text-4xl">
            La forma más fácil de publicar tu inmueble
          </h2>
          <p className="mt-6 max-w-md text-base uppercase text-gray-700 sm:text-lg">
            Conectamos potenciales clientes y nuevas oportunidades de inversión usando
            tecnología
          </p>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-md">
          <div className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-teal-100" />
          <div className="absolute inset-4 rounded-3xl bg-teal-50" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/publish-man.jpg"
            alt="Propietario satisfecho tras publicar su inmueble en PUBLICASA.co"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
