import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { nombre, email, password, telefono, rol } = (body ?? {}) as {
    nombre?: string;
    email?: string;
    password?: string;
    telefono?: string;
    rol?: string;
  };

  if (!nombre || !email || !password) {
    return NextResponse.json(
      { error: "Nombre, email y contraseña son obligatorios." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 8 caracteres." },
      { status: 400 }
    );
  }

  if (rol !== Role.PROPIETARIO && rol !== Role.COMPRADOR) {
    return NextResponse.json({ error: "Rol inválido." }, { status: 400 });
  }

  const existente = await prisma.user.findUnique({ where: { email } });
  if (existente) {
    return NextResponse.json(
      { error: "Ya existe una cuenta registrada con ese email." },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      nombre,
      email,
      password: passwordHash,
      telefono: telefono || null,
      whatsapp: telefono || null,
      rol,
    },
  });

  return NextResponse.json({ ok: true });
}
