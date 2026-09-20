import { PrismaClient, Role, PropertyType, OperationType, PropertyStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";

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

  // Create sample properties
  await prisma.property.createMany({
    data: [
      {
        titulo: "Apartamento de lujo en Rosales",
        descripcion: "Hermoso apartamento moderno con vista a la ciudad, piscina y gimnasio.",
        tipo: PropertyType.APARTAMENTO,
        operacion: OperationType.VENTA,
        estado: PropertyStatus.ACTIVO,
        precio: new Decimal("850000000"),
        areaPrivadaM2: 120,
        ciudad: "Bogotá",
        barrio: "Rosales",
        direccion: "Carrera 7 #115-50",
        latitud: 4.6596,
        longitud: -74.0447,
        propietarioId: camila.id,
      },
      {
        titulo: "Casa campestre en Zipaquirá",
        descripcion: "Casa con 3 habitaciones, piscina y terreno de 500m².",
        tipo: PropertyType.CASA,
        operacion: OperationType.VENTA,
        estado: PropertyStatus.ACTIVO,
        precio: new Decimal("450000000"),
        areaPrivadaM2: 180,
        ciudad: "Zipaquirá",
        barrio: "Vereda Alta",
        direccion: "Calle 3 #5-10",
        latitud: 5.0265,
        longitud: -74.3446,
        propietarioId: andres.id,
      },
      {
        titulo: "Apartamento en arriendo - Chapinero",
        descripcion: "Apartamento de 2 habitaciones, totalmente amueblado.",
        tipo: PropertyType.APARTAMENTO,
        operacion: OperationType.ARRIENDO,
        estado: PropertyStatus.ACTIVO,
        precio: new Decimal("2500000"),
        areaPrivadaM2: 85,
        ciudad: "Bogotá",
        barrio: "Chapinero",
        direccion: "Calle 72 #8-45",
        latitud: 4.6426,
        longitud: -74.0553,
        propietarioId: camila.id,
      },
      {
        titulo: "Local comercial en Centro",
        descripcion: "Local ideal para tienda o consultorio.",
        tipo: PropertyType.LOCAL,
        operacion: OperationType.ARRIENDO,
        estado: PropertyStatus.ACTIVO,
        precio: new Decimal("3000000"),
        areaPrivadaM2: 50,
        ciudad: "Bogotá",
        barrio: "Centro",
        direccion: "Carrera 7 #20-30",
        latitud: 4.5981,
        longitud: -74.0758,
        propietarioId: andres.id,
      },
    ],
  });

  console.log("✅ Properties created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
