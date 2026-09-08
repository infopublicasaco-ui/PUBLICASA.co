import type { NextAuthConfig } from "next-auth";

const PROTECTED_PATHS = ["/perfil", "/publicar"];

// Config "edge-safe": sin Prisma ni bcrypt, para poder correr en el
// middleware (Edge Runtime). La config completa vive en lib/auth/index.ts.
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = Boolean(auth?.user);
      const isProtected = PROTECTED_PATHS.some((path) =>
        request.nextUrl.pathname.startsWith(path)
      );
      return !isProtected || isLoggedIn;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
