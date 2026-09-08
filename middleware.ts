import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/config";

// Middleware corre en Edge Runtime: usa solo la config sin Prisma/bcrypt.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/perfil/:path*", "/publicar/:path*"],
};
