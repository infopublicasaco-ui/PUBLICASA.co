import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  const googleEnabled = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Inicia sesión</h1>
      <p className="mt-1 text-sm text-gray-500">Bienvenido de vuelta a PUBLICASA.co</p>

      <div className="mt-6">
        <LoginForm googleEnabled={googleEnabled} />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-medium text-gray-900 hover:underline">
          Regístrate
        </Link>
      </p>
    </main>
  );
}
