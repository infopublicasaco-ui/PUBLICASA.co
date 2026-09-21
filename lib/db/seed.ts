import { PrismaClient, Role, PropertyType, OperationType, PropertyStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

const CONFIRM_FLAG = "--confirmo-que-borro-produccion";

async function main() {
  if (!process.argv.includes(CONFIRM_FLAG)) {
    console.error(
      "\n⚠️  ESTE SCRIPT BORRA TODOS LOS DATOS (usuarios, inmuebles, fotos, mensajes) de la\n" +
        "base de datos configurada en DATABASE_URL — y hoy en día esa base es la MISMA que\n" +
        "usa publicasa.co en producción. No hay un ambiente de desarrollo separado.\n\n" +
        "Si de verdad quieres reemplazar todo por los datos de ejemplo, corre:\n" +
        `  npm run db:seed -- ${CONFIRM_FLAG}\n`
    );
    process.exit(1);
  }

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
        email: "camila.rojas@publicasa.co",
        password: defaultPassword,
        nombre: "Camila Rojas",
        telefono: "3001234567",
        whatsapp: "3001234567",
        rol: Role.PROPIETARIO,
      },
    }),
    prisma.user.create({
      data: {
        email: "andres.gomez@publicasa.co",
        password: defaultPassword,
        nombre: "Andrés Gómez",
        telefono: "3009876543",
        whatsapp: "3009876543",
        rol: Role.PROPIETARIO,
      },
    }),
    prisma.user.create({
      data: {
        email: "laura.martinez@publicasa.co",
        password: defaultPassword,
        nombre: "Laura Martínez",
        telefono: "3012223344",
        rol: Role.COMPRADOR,
      },
    }),
    prisma.user.create({
      data: {
        email: "carlos.lopez@publicasa.co",
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
        titulo: "Apartamento Naranjo",
        descripcion: "Hermoso apartamento en zona residencial.",
        tipo: PropertyType.APARTAMENTO,
        operacion: OperationType.VENTA,
        estado: PropertyStatus.ACTIVO,
        precio: new Decimal("350000000"),
        areaPrivadaM2: 90,
        ciudad: "Bogotá",
        barrio: "Naranjo",
        direccion: "Carrera 5 #50-20",
        latitud: 4.6520,
        longitud: -74.0780,
        telefonoContacto: "3043975245",
        propietarioId: camila.id,
      },
      {
        titulo: "Casa en arriendo - Usaquén",
        descripcion: "Casa de 3 habitaciones con garaje.",
        tipo: PropertyType.CASA,
        operacion: OperationType.ARRIENDO,
        estado: PropertyStatus.ACTIVO,
        precio: new Decimal("3500000"),
        areaPrivadaM2: 150,
        ciudad: "Bogotá",
        barrio: "Usaquén",
        direccion: "Calle 120 #15-40",
        latitud: 4.6901,
        longitud: -74.0235,
        telefonoContacto: "3043975245",
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
