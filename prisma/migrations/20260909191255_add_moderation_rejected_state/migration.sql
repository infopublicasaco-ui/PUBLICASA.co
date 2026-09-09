-- AlterEnum
ALTER TYPE "PropertyStatus" ADD VALUE 'RECHAZADO';

-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "motivo_rechazo" TEXT;
