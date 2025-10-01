-- CreateEnum
CREATE TYPE "public"."EstadoCotización" AS ENUM ('pendiente', 'aceptado', 'rechazado');

-- AlterTable
ALTER TABLE "public"."perfiles_profesionales" ADD COLUMN     "url_documento_verificacion" TEXT;

-- CreateTable
CREATE TABLE "public"."cotizaciones" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "profesional_id" TEXT NOT NULL,
    "descripción" TEXT NOT NULL,
    "estado" "public"."EstadoCotización" NOT NULL DEFAULT 'pendiente',
    "precio" DOUBLE PRECISION NOT NULL,
    "comentario" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aceptado_en" TIMESTAMP(3),
    "rechazado_en" TIMESTAMP(3),

    CONSTRAINT "cotizaciones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."cotizaciones" ADD CONSTRAINT "cotizaciones_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."cotizaciones" ADD CONSTRAINT "cotizaciones_profesional_id_fkey" FOREIGN KEY ("profesional_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
