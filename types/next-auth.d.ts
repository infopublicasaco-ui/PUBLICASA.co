import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      rol: Role;
    } & DefaultSession["user"];
  }

  interface User {
    rol?: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    rol?: Role;
  }
}
