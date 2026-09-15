import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata = {
  title: "Olvidé mi contraseña | PUBLICASA.co",
  description: "Recupera acceso a tu cuenta ingresando tu correo electrónico",
};

export default function ForgotPasswordPage() {
  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Olvidé mi contraseña</h1>
      <p className="mt-1 text-sm text-gray-500">
        Ingresa tu correo electrónico y te enviaremos un enlace para resetear tu contraseña
      </p>

      <div className="mt-6">
        <ForgotPasswordForm />
      </div>

      <p className="mt-4 text-sm text-gray-500">
        <Link href="/login" className="font-medium text-gray-900 hover:underline">
          Volver a inicio de sesión
        </Link>
      </p>
    </main>
  );
}
