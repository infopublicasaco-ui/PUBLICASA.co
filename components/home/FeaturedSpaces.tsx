export function FeaturedSpaces() {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-2xl bg-brand-bg p-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-couple.png"
          alt="Pareja revisando inmuebles destacados desde el sofá"
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-brand-blue">Espacios destacados</h3>
      <p className="mt-1 text-sm uppercase text-gray-700">
        Para ti inmuebles con diseños, ubicaciones o características únicas, como tú.
      </p>
    </div>
  );
}
