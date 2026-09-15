import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { prisma } from "@/lib/db/prisma";

export const metadata = {
  title: "Resetear contraseña | PUBLICASA.co",
  description: "Establece una nueva contraseña para tu cuenta",
};

export default async function ResetPasswordPage({ params }: { params: { token: string } }) {
  const { token } = params;

  // Verificar que el token existe y no ha expirado
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  const isValid = resetToken && resetToken.expires > new Date();

  return (
    <main className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold text-gray-900">Resetear contraseña</h1>
      <p className="mt-1 text-sm text-gray-500">Ingresa tu nueva contraseña</p>

      <div className="mt-6">
        {isValid ? (
          <ResetPasswordForm token={token} email={resetToken.email} />
        ) : (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm font-medium text-red-900">
              ✗ Enlace expirado o inválido
            </p>
            <p className="mt-2 text-sm text-red-800">
              Por favor solicita un nuevo enlace de recuperación en la página de inicio de sesión.
            </p>
            <a
              href="/forgot-password"
              className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Solicitar nuevo enlace
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
