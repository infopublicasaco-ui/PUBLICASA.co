import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function PublicarPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-gray-900">Publicar un inmueble</h1>
      <p className="mt-2 text-gray-500">
        El formulario de publicación llega en el siguiente paso. Por ahora esta página confirma que
        el acceso está protegido: solo la ves porque iniciaste sesión.
      </p>
    </main>
  );
}
