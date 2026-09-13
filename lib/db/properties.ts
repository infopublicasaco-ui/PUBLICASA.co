import type { OperationType, Prisma, PropertyType } from "@prisma/client";
import { prisma } from "./prisma";

export type PropertyFilters = {
  operacion?: OperationType;
  tipo?: PropertyType;
  q?: string; // busca en ciudad y barrio
  precioMin?: number;
  precioMax?: number;
};

export function getFilteredProperties(filters: PropertyFilters = {}) {
  const where: Prisma.PropertyWhereInput = { estado: "ACTIVO" };

  if (filters.operacion) where.operacion = filters.operacion;
  if (filters.tipo) where.tipo = filters.tipo;
  if (filters.q) {
    where.OR = [
      { ciudad: { contains: filters.q, mode: "insensitive" } },
      { barrio: { contains: filters.q, mode: "insensitive" } },
    ];
  }
  if (filters.precioMin != null || filters.precioMax != null) {
    where.precio = {
      ...(filters.precioMin != null ? { gte: filters.precioMin } : {}),
      ...(filters.precioMax != null ? { lte: filters.precioMax } : {}),
    };
  }

  return prisma.property.findMany({
    where,
    include: { fotos: { orderBy: { orden: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
}

export function getFeaturedProperties(limit = 3) {
  return prisma.property.findMany({
    where: { estado: "ACTIVO" },
    include: { fotos: { orderBy: { orden: "asc" } } },
    orderBy: { createdAt: "desc" },
    take: limit,
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

export function getSimilarProperties(
  propertyId: string,
  { tipo, operacion, ciudad, limit = 4 }: { tipo: PropertyType; operacion: OperationType; ciudad: string; limit?: number }
) {
  return prisma.property.findMany({
    where: {
      id: { not: propertyId },
      estado: "ACTIVO",
      tipo,
      operacion,
      ciudad,
    },
    include: { fotos: { orderBy: { orden: "asc" } } },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
