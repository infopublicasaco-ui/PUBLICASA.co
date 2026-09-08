-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PROPIETARIO', 'COMPRADOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('CASA', 'APARTAMENTO', 'LOTE', 'LOCAL');

-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('VENTA', 'ARRIENDO');

-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('PENDIENTE_REVISION', 'ACTIVO', 'PAUSADO', 'VENDIDO', 'ARRENDADO');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "whatsapp" TEXT,
    "rol" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" "PropertyType" NOT NULL,
    "operacion" "OperationType" NOT NULL,
    "precio" DECIMAL(14,2) NOT NULL,
    "precio_sugerido" DECIMAL(14,2),
    "area_construida_m2" DOUBLE PRECISION,
    "area_privada_m2" DOUBLE PRECISION,
    "habitaciones" INTEGER,
    "banos" INTEGER,
    "parqueaderos" INTEGER,
    "estrato" INTEGER,
    "antiguedad_anios" INTEGER,
    "piso" INTEGER,
    "total_pisos" INTEGER,
    "ascensor" BOOLEAN NOT NULL DEFAULT false,
    "amoblado" BOOLEAN NOT NULL DEFAULT false,
    "tiene_balcon" BOOLEAN NOT NULL DEFAULT false,
    "tiene_terraza" BOOLEAN NOT NULL DEFAULT false,
    "tiene_patio" BOOLEAN NOT NULL DEFAULT false,
    "tiene_estudio" BOOLEAN NOT NULL DEFAULT false,
    "tiene_deposito" BOOLEAN NOT NULL DEFAULT false,
    "tiene_zona_lavanderia" BOOLEAN NOT NULL DEFAULT false,
    "administracion" DECIMAL(12,2),
    "ciudad" TEXT NOT NULL,
    "departamento" TEXT,
    "localidad" TEXT,
    "barrio" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "caracteristicas_sector" JSONB,
    "caracteristicas_adicionales" JSONB,
    "estado" "PropertyStatus" NOT NULL DEFAULT 'PENDIENTE_REVISION',
    "score_ubicacion" DOUBLE PRECISION,
    "propietarioId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_photos" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "es_portada" BOOLEAN NOT NULL DEFAULT false,
    "propertyId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_requests" (
    "id" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "telefono" TEXT,
    "email" TEXT,
    "propertyId" TEXT NOT NULL,
    "interesadoId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_searches" (
    "id" TEXT NOT NULL,
    "nombre" TEXT,
    "filtros" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saved_searches_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "properties_tipo_idx" ON "properties"("tipo");

-- CreateIndex
CREATE INDEX "properties_operacion_idx" ON "properties"("operacion");

-- CreateIndex
CREATE INDEX "properties_estado_idx" ON "properties"("estado");

-- CreateIndex
CREATE INDEX "properties_ciudad_idx" ON "properties"("ciudad");

-- CreateIndex
CREATE INDEX "properties_barrio_idx" ON "properties"("barrio");

-- CreateIndex
CREATE INDEX "properties_precio_idx" ON "properties"("precio");

-- CreateIndex
CREATE INDEX "properties_propietarioId_idx" ON "properties"("propietarioId");

-- CreateIndex
CREATE INDEX "properties_created_at_idx" ON "properties"("created_at");

-- CreateIndex
CREATE INDEX "properties_latitud_longitud_idx" ON "properties"("latitud", "longitud");

-- CreateIndex
CREATE INDEX "property_photos_propertyId_idx" ON "property_photos"("propertyId");

-- CreateIndex
CREATE INDEX "contact_requests_propertyId_idx" ON "contact_requests"("propertyId");

-- CreateIndex
CREATE INDEX "contact_requests_interesadoId_idx" ON "contact_requests"("interesadoId");

-- CreateIndex
CREATE INDEX "contact_requests_created_at_idx" ON "contact_requests"("created_at");

-- CreateIndex
CREATE INDEX "saved_searches_userId_idx" ON "saved_searches"("userId");

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_propietarioId_fkey" FOREIGN KEY ("propietarioId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_photos" ADD CONSTRAINT "property_photos_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_requests" ADD CONSTRAINT "contact_requests_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contact_requests" ADD CONSTRAINT "contact_requests_interesadoId_fkey" FOREIGN KEY ("interesadoId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_searches" ADD CONSTRAINT "saved_searches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
