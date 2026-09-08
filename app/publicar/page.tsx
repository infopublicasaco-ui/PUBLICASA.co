import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { PublicarForm } from "@/components/publicar/PublicarForm";

export default async function PublicarPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">Publicar un inmueble</h1>
      <p className="mt-1 text-sm text-gray-500">
        Completa la información. Los campos marcados con * son obligatorios.
      </p>

      <div className="mt-8">
        <PublicarForm />
      </div>
    </main>
  );
}
