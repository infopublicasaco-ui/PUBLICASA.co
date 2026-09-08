import Link from "next/link";
import { RegistroForm } from "@/components/auth/RegistroForm";

export default function RegistroPage() {
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Crea tu cuenta</h1>
      <p className="mt-1 text-sm text-gray-500">Toma menos de un minuto.</p>

      <div className="mt-6">
        <RegistroForm googleEnabled={googleEnabled} />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-medium text-gray-900 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </main>
  );
}
