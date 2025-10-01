/*
  Warnings:

  - You are about to drop the column `descripción` on the `cotizaciones` table. All the data in the column will be lost.
  - The `estado` column on the `cotizaciones` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `está_disponible` on the `disponibilidad` table. All the data in the column will be lost.
  - You are about to drop the column `está_leído` on the `mensajes` table. All the data in the column will be lost.
  - You are about to drop the column `está_leído` on the `notificaciones` table. All the data in the column will be lost.
  - You are about to drop the column `años_experiencia` on the `perfiles_profesionales` table. All the data in the column will be lost.
  - You are about to drop the column `descripción` on the `perfiles_profesionales` table. All the data in the column will be lost.
  - You are about to drop the column `estado_verificación` on the `perfiles_profesionales` table. All the data in the column will be lost.
  - You are about to drop the column `descripción` on the `servicios` table. All the data in the column will be lost.
  - You are about to drop the column `está_verificado` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `hash_contraseña` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `teléfono` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `reseñas` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `descripcion` to the `cotizaciones` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipo` on the `notificaciones` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `descripcion` to the `servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hash_contrasena` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EstadoVerificacion" AS ENUM ('pendiente', 'verificado', 'rechazado');

-- CreateEnum
CREATE TYPE "TipoNotificacion" AS ENUM ('nuevo_mensaje', 'nueva_cotizacion', 'servicio_agendado', 'resena_recibida', 'pago_liberado');

-- CreateEnum
CREATE TYPE "EstadoCotizacion" AS ENUM ('pendiente', 'aceptado', 'rechazado');

-- DropForeignKey
ALTER TABLE "reseñas" DROP CONSTRAINT "reseñas_cliente_id_fkey";

-- DropForeignKey
ALTER TABLE "reseñas" DROP CONSTRAINT "reseñas_servicio_id_fkey";

-- AlterTable
ALTER TABLE "cotizaciones" DROP COLUMN "descripción",
ADD COLUMN     "descripcion" TEXT NOT NULL,
DROP COLUMN "estado",
ADD COLUMN     "estado" "EstadoCotizacion" NOT NULL DEFAULT 'pendiente';

-- AlterTable
ALTER TABLE "disponibilidad" DROP COLUMN "está_disponible",
ADD COLUMN     "esta_disponible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "mensajes" DROP COLUMN "está_leído",
ADD COLUMN     "esta_leido" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "notificaciones" DROP COLUMN "está_leído",
ADD COLUMN     "esta_leido" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoNotificacion" NOT NULL;

-- AlterTable
ALTER TABLE "perfiles_profesionales" DROP COLUMN "años_experiencia",
DROP COLUMN "descripción",
DROP COLUMN "estado_verificación",
ADD COLUMN     "anos_experiencia" INTEGER,
ADD COLUMN     "descripcion" TEXT,
ADD COLUMN     "estado_verificacion" "EstadoVerificacion" NOT NULL DEFAULT 'pendiente';

-- AlterTable
ALTER TABLE "servicios" DROP COLUMN "descripción",
ADD COLUMN     "descripcion" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "está_verificado",
DROP COLUMN "hash_contraseña",
DROP COLUMN "teléfono",
ADD COLUMN     "esta_verificado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hash_contrasena" TEXT NOT NULL,
ADD COLUMN     "telefono" TEXT;

-- DropTable
DROP TABLE "reseñas";

-- DropEnum
DROP TYPE "EstadoCotización";

-- DropEnum
DROP TYPE "EstadoVerificación";

-- DropEnum
DROP TYPE "TipoNotificación";

-- CreateTable
CREATE TABLE "resenas" (
    "id" TEXT NOT NULL,
    "servicio_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "comentario" TEXT,
    "url_foto" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "resenas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resenas_servicio_id_key" ON "resenas"("servicio_id");

-- AddForeignKey
ALTER TABLE "resenas" ADD CONSTRAINT "resenas_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "servicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resenas" ADD CONSTRAINT "resenas_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
