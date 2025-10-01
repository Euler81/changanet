-- CreateEnum
CREATE TYPE "public"."Rol" AS ENUM ('cliente', 'profesional');

-- CreateEnum
CREATE TYPE "public"."EstadoVerificación" AS ENUM ('pendiente', 'verificado', 'rechazado');

-- CreateEnum
CREATE TYPE "public"."EstadoServicio" AS ENUM ('pendiente', 'agendado', 'completado', 'cancelado');

-- CreateEnum
CREATE TYPE "public"."TipoNotificación" AS ENUM ('nuevo_mensaje', 'nueva_cotización', 'servicio_agendado', 'reseña_recibida', 'pago_liberado');

-- CreateTable
CREATE TABLE "public"."usuarios" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash_contraseña" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "teléfono" TEXT,
    "rol" "public"."Rol" NOT NULL DEFAULT 'cliente',
    "está_verificado" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."perfiles_profesionales" (
    "usuario_id" TEXT NOT NULL,
    "especialidad" TEXT NOT NULL,
    "años_experiencia" INTEGER,
    "zona_cobertura" TEXT NOT NULL,
    "tarifa_hora" DOUBLE PRECISION NOT NULL,
    "descripción" TEXT,
    "url_foto_perfil" TEXT,
    "estado_verificación" "public"."EstadoVerificación" NOT NULL DEFAULT 'pendiente',
    "verificado_en" TIMESTAMP(3),

    CONSTRAINT "perfiles_profesionales_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "public"."servicios" (
    "id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "profesional_id" TEXT NOT NULL,
    "descripción" TEXT NOT NULL,
    "estado" "public"."EstadoServicio" NOT NULL DEFAULT 'pendiente',
    "fecha_agendada" TIMESTAMP(3),
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completado_en" TIMESTAMP(3),

    CONSTRAINT "servicios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reseñas" (
    "id" TEXT NOT NULL,
    "servicio_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,
    "calificación" INTEGER NOT NULL,
    "comentario" TEXT,
    "url_foto" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reseñas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."mensajes" (
    "id" TEXT NOT NULL,
    "remitente_id" TEXT NOT NULL,
    "destinatario_id" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "url_imagen" TEXT,
    "está_leído" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."disponibilidad" (
    "id" TEXT NOT NULL,
    "profesional_id" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fin" TIMESTAMP(3) NOT NULL,
    "está_disponible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "disponibilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notificaciones" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "tipo" "public"."TipoNotificación" NOT NULL,
    "mensaje" TEXT NOT NULL,
    "está_leído" BOOLEAN NOT NULL DEFAULT false,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "public"."usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reseñas_servicio_id_key" ON "public"."reseñas"("servicio_id");

-- AddForeignKey
ALTER TABLE "public"."perfiles_profesionales" ADD CONSTRAINT "perfiles_profesionales_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."servicios" ADD CONSTRAINT "servicios_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."servicios" ADD CONSTRAINT "servicios_profesional_id_fkey" FOREIGN KEY ("profesional_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reseñas" ADD CONSTRAINT "reseñas_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "public"."servicios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reseñas" ADD CONSTRAINT "reseñas_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mensajes" ADD CONSTRAINT "mensajes_remitente_id_fkey" FOREIGN KEY ("remitente_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mensajes" ADD CONSTRAINT "mensajes_destinatario_id_fkey" FOREIGN KEY ("destinatario_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."disponibilidad" ADD CONSTRAINT "disponibilidad_profesional_id_fkey" FOREIGN KEY ("profesional_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notificaciones" ADD CONSTRAINT "notificaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
