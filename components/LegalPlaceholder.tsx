export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="text-2xl font-extrabold text-brand-blue">{title}</h1>
      <p className="mt-3 text-gray-600">Este documento se publicará próximamente.</p>
    </main>
  );
}
