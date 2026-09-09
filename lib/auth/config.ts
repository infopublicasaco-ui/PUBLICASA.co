import type { NextAuthConfig } from "next-auth";

// El rol ADMIN de /admin no se valida aquí: el middleware corre en Edge y solo
// garantiza sesión. La comprobación de rol vive en la página y en los API
// routes de /api/admin (Node runtime), que son la autoridad real.
const PROTECTED_PATHS = ["/perfil", "/publicar", "/admin"];

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
