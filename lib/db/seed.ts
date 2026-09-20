import { PrismaClient, Role, PropertyType, OperationType, PropertyStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

async function main() {
  // Orden de borrado respeta las relaciones (hijos antes que padres).
  await prisma.contactRequest.deleteMany();
  await prisma.message.deleteMany();
  await prisma.propertyPhoto.deleteMany();
  await prisma.savedSearch.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  const defaultPassword = await hashPassword("Password123!");

  const [camila, andres, laura, carlos] = await Promise.all([
    prisma.user.create({
      data: {
        email: "camila.propietaria@example.com",
        password: defaultPassword,
        nombre: "Camila Rojas",
        telefono: "3001234567",
        whatsapp: "3001234567",
        rol: Role.PROPIETARIO,
      },
    }),
    prisma.user.create({
      data: {
        email: "andres.propietario@example.com",
        password: defaultPassword,
        nombre: "Andrés Gómez",
        telefono: "3009876543",
        whatsapp: "3009876543",
        rol: Role.PROPIETARIO,
      },
    }),
    prisma.user.create({
      data: {
        email: "laura.compradora@example.com",
        password: defaultPassword,
        nombre: "Laura Martínez",
        telefono: "3012223344",
        rol: Role.COMPRADOR,
      },
    }),
    prisma.user.create({
      data: {
        email: "carlos.comprador@example.com",
        password: defaultPassword,
        nombre: "Carlos López",
        telefono: "3015556666",
        rol: Role.COMPRADOR,
      },
    }),
  ]);

  // Admin user
  const admin = await prisma.user.create({
    data: {
      email: "admin@publicasa.co",
      password: defaultPassword,
      nombre: "Admin PUBLICASA",
      telefono: "6018841816",
      rol: Role.ADMIN,
    },
  });

  console.log("✅ Users created successfully");
  console.log(`Default password for all users: Password123!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
