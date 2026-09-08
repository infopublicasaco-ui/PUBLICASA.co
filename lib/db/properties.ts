import { prisma } from "./prisma";

export function getActiveProperties() {
  return prisma.property.findMany({
    where: { estado: "ACTIVO" },
    include: { fotos: { orderBy: { orden: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}

export function getPropertyById(id: string) {
  return prisma.property.findUnique({
    where: { id },
    include: {
      fotos: { orderBy: { orden: "asc" } },
      propietario: true,
    },
  });
}
