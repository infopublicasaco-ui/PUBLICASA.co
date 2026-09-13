-- CreateEnum
CREATE TYPE "ContactRequestStatus" AS ENUM ('NUEVO', 'CONTACTADO', 'EN_NEGOCIACION', 'CERRADO', 'DESCARTADO');

-- UpdateData: fill null values before making columns NOT NULL
UPDATE "contact_requests" SET "nombre" = '' WHERE "nombre" IS NULL;
UPDATE "contact_requests" SET "email" = 'sin-email@publicasa.co' WHERE "email" IS NULL;
UPDATE "contact_requests" SET "telefono" = '' WHERE "telefono" IS NULL;

-- AlterTable
ALTER TABLE "contact_requests" ADD COLUMN     "consentimiento_datos" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "estado" "ContactRequestStatus" NOT NULL DEFAULT 'NUEVO',
ADD COLUMN     "ip_address" TEXT,
ADD COLUMN     "origen" TEXT NOT NULL DEFAULT 'formulario_web',
ALTER COLUMN "telefono" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "nombre" SET DEFAULT '';

-- CreateIndex
CREATE INDEX "contact_requests_estado_idx" ON "contact_requests"("estado");
