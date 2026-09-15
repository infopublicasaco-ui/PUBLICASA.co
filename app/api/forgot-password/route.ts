import { prisma } from "@/lib/db/prisma";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return Response.json(
        { error: "Email es requerido" },
        { status: 400 }
      );
    }

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return Response.json(
        { error: "No encontramos una cuenta con ese email" },
        { status: 404 }
      );
    }

    // Si el usuario solo usa Google (sin password), no puede resetear
    if (!user.password) {
      return Response.json(
        { error: "Tu cuenta usa Google para iniciar sesión. No puedes resetear contraseña." },
        { status: 400 }
      );
    }

    // Limpiar tokens anteriores expirados o no
    await prisma.passwordResetToken.deleteMany({
      where: { email: email.toLowerCase() },
    });

    // Generar token único (32 bytes = 64 caracteres hex)
    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // Guardar token en BD
    await prisma.passwordResetToken.create({
      data: {
        token,
        email: email.toLowerCase(),
        expires,
      },
    });

    // Construir link (en producción con dominio real)
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const resetLink = `${baseUrl}/reset-password/${token}`;

    return Response.json({ resetLink }, { status: 200 });
  } catch (error) {
    console.error("Error en forgot-password:", error);
    return Response.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
