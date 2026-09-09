import Link from "next/link";

export function ModerationBanner() {
  return (
    <div className="rounded-lg bg-brand-blue px-6 py-4 text-white">
      <h2 className="text-lg font-semibold">Panel de moderación</h2>
      <p className="mt-1 text-sm text-blue-100">
        Revisa publicaciones pendientes, aprueba o rechaza inmuebles con motivo.
      </p>
      <Link
        href="/admin"
        className="mt-3 inline-block rounded-lg bg-white px-4 py-2 text-sm font-medium text-brand-blue hover:bg-blue-50"
      >
        Ir al panel →
      </Link>
    </div>
  );
}
