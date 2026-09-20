import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { Provider } from "next-auth/providers";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { authConfig } from "./config";

const providers: Provider[] = [
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Contraseña", type: "password" },
    },
    async authorize(credentials) {
      const email = credentials?.email;
      const password = credentials?.password;
      if (typeof email !== "string" || typeof password !== "string") return null;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user?.password) return null; // cuenta sin password = solo Google

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return null;

      return { id: user.id, email: user.email, name: user.nombre, image: user.image, rol: user.rol };
    },
  }),
];

// Google es opcional: solo se activa si hay credenciales configuradas, para
// que el login por email/password funcione igual sin depender de Google Cloud.
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  // Requerido por NextAuth cuando se combina un Credentials provider con un
  // adapter: las sesiones de credenciales no pueden persistirse en la tabla
  // Session, así que toda la app usa JWT.
  session: { strategy: "jwt" },
  providers,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.rol = user.rol;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.rol = token.rol as Role;
      }
      return session;
    },
  },
});
