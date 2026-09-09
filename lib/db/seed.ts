import { PrismaClient, Role, PropertyType, OperationType, PropertyStatus } from "@prisma/client";
import { createHash } from "node:crypto";

const prisma = new PrismaClient();

// Placeholder de hashing solo para datos de prueba: la autenticación real
// (bcrypt/argon2) llegará junto con el flujo de registro/login.
function fakeHash(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

async function main() {
  // Orden de borrado respeta las relaciones (hijos antes que padres).
  await prisma.contactRequest.deleteMany();
  await prisma.propertyPhoto.deleteMany();
  await prisma.savedSearch.deleteMany();
  await prisma.property.deleteMany();
  await prisma.user.deleteMany();

  const [camila, andres, laura, carlos] = await Promise.all([
    prisma.user.create({
      data: {
        email: "camila.propietaria@example.com",
        password: fakeHash("Password123!"),
        nombre: "Camila Rojas",
        telefono: "3001234567",
        whatsapp: "3001234567",
        rol: Role.PROPIETARIO,
      },
    }),
    prisma.user.create({
      data: {
        email: "andres.propietario@example.com",
        password: fakeHash("Password123!"),
        nombre: "Andrés Gómez",
        telefono: "3009876543",
        whatsapp: "3009876543",
        rol: Role.PROPIETARIO,
      },
    }),
    prisma.user.create({
      data: {
        email: "laura.compradora@example.com",
        password: fakeHash("Password123!"),
        nombre: "Laura Martínez",
        telefono: "3012223344",
        rol: Role.COMPRADOR,
      },
    }),
    prisma.user.create({
      data: {
        email: "carlos.comprador@example.com",
        password: fakeHash("Password123!"),
        nombre: "Carlos Pérez",
        telefono: "3023334455",
        rol: Role.COMPRADOR,
      },
    }),
  ]);

  await prisma.user.create({
    data: {
      email: "admin@publicasa.co",
      password: fakeHash("Password123!"),
      nombre: "Admin PUBLICASA.co",
      rol: Role.ADMIN,
    },
  });

  const apartamentoChapinero = await prisma.property.create({
    data: {
      titulo: "Apartamento moderno en Chapinero con vista a la ciudad",
      descripcion:
        "Amplio apartamento de 3 habitaciones en torre con vigilancia 24 horas, a pocas cuadras de la Zona G. Excelente iluminación natural y acabados de lujo.",
      tipo: PropertyType.APARTAMENTO,
      operacion: OperationType.VENTA,
      precio: 480000000,
      areaConstruidaM2: 95,
      areaPrivadaM2: 88,
      habitaciones: 3,
      banos: 2,
      parqueaderos: 1,
      estrato: 5,
      antiguedadAnios: 8,
      piso: 7,
      totalPisos: 12,
      ascensor: true,
      tieneBalcon: true,
      administracion: 350000,
      ciudad: "Bogotá",
      departamento: "Cundinamarca",
      localidad: "Chapinero",
      barrio: "Chapinero Alto",
      direccion: "Calle 63 # 9-30",
      latitud: 4.6485,
      longitud: -74.0648,
      caracteristicasSector: {
        transporte_publico: true,
        colegios_cercanos: true,
        supermercados_cercanos: true,
        parques_cercanos: true,
        seguridad: "alta",
        descripcion_sector: "Zona residencial y comercial, cerca a la Zona G y parques.",
      },
      caracteristicasAdicionales: {
        cocina_integral: true,
        vigilancia: true,
        conjunto_cerrado: true,
        gimnasio: true,
      },
      estado: PropertyStatus.ACTIVO,
      propietarioId: camila.id,
      fotos: {
        create: [
          { url: "https://picsum.photos/seed/publicasa-apto-chapinero-1/1200/800", orden: 0, esPortada: true },
          { url: "https://picsum.photos/seed/publicasa-apto-chapinero-2/1200/800", orden: 1 },
          { url: "https://picsum.photos/seed/publicasa-apto-chapinero-3/1200/800", orden: 2 },
        ],
      },
    },
  });

  const casaLaureles = await prisma.property.create({
    data: {
      titulo: "Casa campestre en Laureles, ideal para familia",
      descripcion:
        "Casa de dos plantas con amplio patio y zona de BBQ, ubicada en sector arborizado cerca a universidades y parques de Laureles.",
      tipo: PropertyType.CASA,
      operacion: OperationType.ARRIENDO,
      precio: 3800000,
      areaConstruidaM2: 180,
      areaPrivadaM2: 160,
      habitaciones: 4,
      banos: 3,
      parqueaderos: 2,
      estrato: 5,
      antiguedadAnios: 15,
      tieneTerraza: true,
      tienePatio: true,
      tieneEstudio: true,
      tieneDeposito: true,
      tieneZonaLavanderia: true,
      ciudad: "Medellín",
      departamento: "Antioquia",
      barrio: "Laureles",
      direccion: "Cra 76 # 34B-20",
      latitud: 6.2447,
      longitud: -75.5916,
      caracteristicasSector: {
        transporte_publico: true,
        colegios_cercanos: true,
        universidades_cercanas: true,
        parques_cercanos: true,
        seguridad: "media-alta",
        descripcion_sector: "Sector arborizado, cerca a la Universidad Pontificia Bolivariana.",
      },
      caracteristicasAdicionales: {
        zona_bbq: true,
        jacuzzi: false,
        piscina: false,
      },
      estado: PropertyStatus.ACTIVO,
      propietarioId: andres.id,
      fotos: {
        create: [
          { url: "https://picsum.photos/seed/publicasa-casa-laureles-1/1200/800", orden: 0, esPortada: true },
          { url: "https://picsum.photos/seed/publicasa-casa-laureles-2/1200/800", orden: 1 },
          { url: "https://picsum.photos/seed/publicasa-casa-laureles-3/1200/800", orden: 2 },
        ],
      },
    },
  });

  const loteCartagena = await prisma.property.create({
    data: {
      titulo: "Lote urbanizable cerca a la playa en Cartagena",
      descripcion:
        "Lote plano de 500 m2 en zona de expansión turística, ideal para proyecto residencial u hotelero. A 10 minutos de la playa.",
      tipo: PropertyType.LOTE,
      operacion: OperationType.VENTA,
      precio: 650000000,
      // En un lote no aplica área construida; el área total se registra en areaPrivadaM2.
      areaPrivadaM2: 500,
      estrato: 4,
      ciudad: "Cartagena",
      departamento: "Bolívar",
      barrio: "Manzanillo del Mar",
      direccion: "Vía a Manzanillo del Mar Km 8",
      latitud: 10.46,
      longitud: -75.488,
      caracteristicasSector: {
        vias_principales: true,
        seguridad: "media",
        zonas_verdes: true,
        descripcion_sector:
          "Zona en desarrollo cerca a la playa, ideal para proyectos residenciales o turísticos.",
      },
      caracteristicasAdicionales: {
        cerca_playa: true,
        terreno_plano: true,
      },
      estado: PropertyStatus.ACTIVO,
      propietarioId: camila.id,
      fotos: {
        create: [
          { url: "https://picsum.photos/seed/publicasa-lote-cartagena-1/1200/800", orden: 0, esPortada: true },
          { url: "https://picsum.photos/seed/publicasa-lote-cartagena-2/1200/800", orden: 1 },
        ],
      },
    },
  });

  const localCali = await prisma.property.create({
    data: {
      titulo: "Local comercial en el centro de Cali, alto flujo peatonal",
      descripcion:
        "Local de 60 m2 en primer piso, ideal para comercio o servicios. Ubicado en zona de alto tráfico peatonal y vehicular.",
      tipo: PropertyType.LOCAL,
      operacion: OperationType.ARRIENDO,
      precio: 2500000,
      areaConstruidaM2: 60,
      areaPrivadaM2: 55,
      banos: 1,
      estrato: 3,
      antiguedadAnios: 25,
      piso: 1,
      totalPisos: 3,
      tieneDeposito: true,
      administracion: 150000,
      ciudad: "Cali",
      departamento: "Valle del Cauca",
      barrio: "Centro",
      direccion: "Cra 4 # 12-30",
      latitud: 3.4516,
      longitud: -76.532,
      caracteristicasSector: {
        transporte_publico: true,
        vias_principales: true,
        seguridad: "media",
        descripcion_sector: "Zona comercial de alto tráfico peatonal y vehicular.",
      },
      caracteristicasAdicionales: {
        vitrina_amplia: true,
        bodega: true,
      },
      estado: PropertyStatus.PAUSADO,
      propietarioId: andres.id,
      fotos: {
        create: [
          { url: "https://picsum.photos/seed/publicasa-local-cali-1/1200/800", orden: 0, esPortada: true },
          { url: "https://picsum.photos/seed/publicasa-local-cali-2/1200/800", orden: 1 },
          { url: "https://picsum.photos/seed/publicasa-local-cali-3/1200/800", orden: 2 },
        ],
      },
    },
  });

  const apartaestudioUsaquen = await prisma.property.create({
    data: {
      titulo: "Apartaestudio moderno en Usaquén, cerca a parques y restaurantes",
      descripcion:
        "Apartaestudio amoblado en sector exclusivo de Usaquén, a pocas cuadras del Parque de Usaquén y su oferta gastronómica.",
      tipo: PropertyType.APARTAMENTO,
      operacion: OperationType.ARRIENDO,
      precio: 1900000,
      areaConstruidaM2: 45,
      areaPrivadaM2: 42,
      habitaciones: 1,
      banos: 1,
      parqueaderos: 1,
      estrato: 5,
      antiguedadAnios: 3,
      piso: 4,
      totalPisos: 10,
      ascensor: true,
      amoblado: true,
      tieneBalcon: true,
      tieneZonaLavanderia: true,
      administracion: 220000,
      ciudad: "Bogotá",
      departamento: "Cundinamarca",
      localidad: "Usaquén",
      barrio: "Santa Bárbara",
      direccion: "Cra 19 # 116-40",
      latitud: 4.6946,
      longitud: -74.0307,
      caracteristicasSector: {
        transporte_publico: true,
        colegios_cercanos: true,
        centros_comerciales_cercanos: true,
        restaurantes_cercanos: true,
        seguridad: "alta",
        descripcion_sector: "Sector exclusivo con gran oferta gastronómica y comercial.",
      },
      caracteristicasAdicionales: {
        cocina_integral: true,
        closets: true,
      },
      estado: PropertyStatus.PENDIENTE_REVISION,
      propietarioId: camila.id,
      fotos: {
        create: [
          { url: "https://picsum.photos/seed/publicasa-apto-usaquen-1/1200/800", orden: 0, esPortada: true },
          { url: "https://picsum.photos/seed/publicasa-apto-usaquen-2/1200/800", orden: 1 },
          { url: "https://picsum.photos/seed/publicasa-apto-usaquen-3/1200/800", orden: 2 },
          { url: "https://picsum.photos/seed/publicasa-apto-usaquen-4/1200/800", orden: 3 },
        ],
      },
    },
  });

  const apartamentoChiaSerralta = await prisma.property.create({
    data: {
      titulo: "Apartamento en Chía, Cundinamarca - Conjunto Serralta",
      descripcion:
        "Excelente apartamento: hermoso, de alta rentabilidad y a un precio insuperable. Ubicación estratégica en la Variante Chía - Cota. Tu próximo hogar en Chía lo tiene TODO. Conjunto residencial de alta calidad con seguridad 24 horas.",
      tipo: PropertyType.APARTAMENTO,
      operacion: OperationType.VENTA,
      precio: 255000000,
      areaConstruidaM2: 41,
      areaPrivadaM2: 41,
      habitaciones: 1,
      banos: 1,
      parqueaderos: 1,
      estrato: 4,
      antiguedadAnios: 2,
      piso: 3,
      totalPisos: 8,
      ascensor: true,
      administracion: 201000,
      ciudad: "Chía",
      departamento: "Cundinamarca",
      barrio: "Serralta",
      direccion: "Variante Chía - Cota, Conjunto Serralta",
      latitud: 4.8608,
      longitud: -74.0548,
      caracteristicasSector: {
        transporte_publico: true,
        colegios_cercanos: true,
        centros_comerciales_cercanos: true,
        seguridad: "alta",
        descripcion_sector:
          "Zona residencial en desarrollo con excelente ubicación en la Variante Chía. Cercano a centros comerciales, colegios y servicios.",
      },
      caracteristicasAdicionales: {
        cocina_integral: true,
        closets: true,
        conjunto_cerrado: true,
      },
      estado: PropertyStatus.ACTIVO,
      propietarioId: laura.id,
      fotos: {
        create: [
          { url: "https://picsum.photos/seed/publicasa-apto-chia-serralta-1/1200/800", orden: 0, esPortada: true },
          { url: "https://picsum.photos/seed/publicasa-apto-chia-serralta-2/1200/800", orden: 1 },
        ],
      },
    },
  });

  const apartaestudioChiaLauraVicuna = await prisma.property.create({
    data: {
      titulo: "Apartaestudio en Chía, Cundinamarca - Laura Vicuña",
      descripcion:
        "El apartamento cuenta con un área de 40 m² distribuidos de manera moderna y funcional. Dispone de un espacio principal tipo sala-comedor-cocina en concepto abierto, que brinda amplitud e integración, una zona de descanso con área de cama y clóset integrado, y un baño completo. Ubicación estratégica en Laura Vicuña, Chía.",
      tipo: PropertyType.APARTAMENTO,
      operacion: OperationType.VENTA,
      precio: 249900000,
      areaConstruidaM2: 40,
      areaPrivadaM2: 40,
      habitaciones: 1,
      banos: 1,
      parqueaderos: 1,
      estrato: 4,
      antiguedadAnios: 1,
      piso: 2,
      totalPisos: 6,
      ascensor: true,
      administracion: 180000,
      ciudad: "Chía",
      departamento: "Cundinamarca",
      barrio: "Laura Vicuña",
      direccion: "Laura Vicuña, Chía",
      latitud: 4.862,
      longitud: -74.053,
      caracteristicasSector: {
        transporte_publico: true,
        colegios_cercanos: true,
        seguridad: "alta",
        descripcion_sector: "Barrio residencial en Chía con buena accesibilidad y servicios completos.",
      },
      caracteristicasAdicionales: {
        cocina_integral: true,
        closets: true,
      },
      estado: PropertyStatus.ACTIVO,
      propietarioId: andres.id,
      fotos: {
        create: [
          { url: "https://picsum.photos/seed/publicasa-apto-chia-laura-1/1200/800", orden: 0, esPortada: true },
          { url: "https://picsum.photos/seed/publicasa-apto-chia-laura-2/1200/800", orden: 1 },
        ],
      },
    },
  });

  const apartaestudioChiaDelicias = await prisma.property.create({
    data: {
      titulo: "Apartaestudio en arriendo en Chía - Delicias Norte",
      descripcion:
        "¿Buscas arrendar un apartamento en Chía? Disfruta de 29,84 m² en un práctico monoambiente que integra 1 habitación, un baño, cocina integral y parqueadero privado descubierto. Diseñado para brindarte comodidad y funcionalidad en cada metro cuadrado. Ubicación privilegiada en el centro de Chía dentro de la Agrupación Residencial Campus Club, con acceso inmediato a gran variedad de servicios. Contrato mínimo 1 año.",
      tipo: PropertyType.APARTAMENTO,
      operacion: OperationType.ARRIENDO,
      precio: 1350000,
      areaConstruidaM2: 29,
      areaPrivadaM2: 29,
      habitaciones: 1,
      banos: 1,
      parqueaderos: 1,
      estrato: 4,
      antiguedadAnios: 3,
      piso: 2,
      totalPisos: 4,
      administracion: 180000,
      ciudad: "Chía",
      departamento: "Cundinamarca",
      barrio: "Delicias Norte",
      direccion: "Campus Club, Delicias Norte, Chía",
      latitud: 4.865,
      longitud: -74.055,
      caracteristicasSector: {
        transporte_publico: true,
        colegios_cercanos: true,
        centros_comerciales_cercanos: true,
        seguridad: "alta",
        descripcion_sector:
          "Centro de Chía con excelente dinámica urbana. Acceso inmediato a servicios, compras y entretenimiento.",
      },
      caracteristicasAdicionales: {
        cocina_integral: true,
        parqueadero_privado: true,
      },
      estado: PropertyStatus.ACTIVO,
      propietarioId: carlos.id,
      fotos: {
        create: [
          { url: "https://picsum.photos/seed/publicasa-apto-chia-delicias-1/1200/800", orden: 0, esPortada: true },
          { url: "https://picsum.photos/seed/publicasa-apto-chia-delicias-2/1200/800", orden: 1 },
        ],
      },
    },
  });

  await prisma.contactRequest.create({
    data: {
      mensaje: "Hola, me interesa agendar una visita este fin de semana.",
      telefono: laura.telefono,
      email: laura.email,
      propertyId: apartamentoChapinero.id,
      interesadoId: laura.id,
    },
  });

  await prisma.contactRequest.create({
    data: {
      mensaje: "¿La casa acepta mascotas? Estoy interesado en arrendarla.",
      telefono: "3109998877",
      email: "visitante.anonimo@example.com",
      propertyId: casaLaureles.id,
      // Sin interesadoId: visitante no registrado.
    },
  });

  await prisma.contactRequest.create({
    data: {
      mensaje: "Quisiera más información sobre linderos y servicios públicos del lote.",
      telefono: carlos.telefono,
      email: carlos.email,
      propertyId: loteCartagena.id,
      interesadoId: carlos.id,
    },
  });

  await prisma.savedSearch.create({
    data: {
      userId: laura.id,
      nombre: "Apartamentos en Bogotá hasta 500M",
      filtros: {
        operacion: "VENTA",
        tipo: "APARTAMENTO",
        ciudad: "Bogotá",
        precioMax: 500000000,
        habitacionesMin: 2,
        areaMin: 60,
      },
    },
  });

  await prisma.savedSearch.create({
    data: {
      userId: carlos.id,
      nombre: "Arriendo en Medellín o Cali",
      filtros: {
        operacion: "ARRIENDO",
        ciudad: ["Medellín", "Cali"],
        precioMax: 4000000,
        parqueaderosMin: 1,
      },
    },
  });

  const [usersCount, propertiesCount, photosCount, contactRequestsCount, savedSearchesCount] =
    await Promise.all([
      prisma.user.count(),
      prisma.property.count(),
      prisma.propertyPhoto.count(),
      prisma.contactRequest.count(),
      prisma.savedSearch.count(),
    ]);

  console.log("Seed completado:");
  console.log(`  Usuarios: ${usersCount}`);
  console.log(`  Propiedades: ${propertiesCount}`);
  console.log(`  Fotos: ${photosCount}`);
  console.log(`  Solicitudes de contacto: ${contactRequestsCount}`);
  console.log(`  Búsquedas guardadas: ${savedSearchesCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
