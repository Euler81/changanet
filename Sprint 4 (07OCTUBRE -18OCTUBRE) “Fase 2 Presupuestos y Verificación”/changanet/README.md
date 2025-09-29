# 🚀 CÓMO EJECUTAR EL SPRINT 4

> **Resumen:** Guía paso a paso para desplegar y probar los cambios del Sprint 4 en entorno local.

---

## Requisitos previos

* Node.js y npm instalados.
* Acceso al repositorio / archivos nuevos del Backend y Frontend.
* Puerto por defecto del frontend: `5173`.
* Prisma instalado y configurado para la base de datos.

---

## Paso 1: Asegúrate de que el Backend está Actualizado

1. Detén el backend si está corriendo (presiona `Ctrl + C` en la terminal donde corre).
2. Reemplaza los archivos del backend con los nuevos archivos proporcionados.
3. Actualiza la base de datos:

```bash
# Ejecutar migraciones y generar cliente de Prisma
npx prisma migrate dev --name add_quotes_and_verification
npx prisma generate
```

4. Inicia el backend:

```bash
# Desde la carpeta del backend
npm install    # (si hay paquetes nuevos)
npm run dev
```

> Nota: revisa que el servidor arranque sin errores y que Prisma esté conectado a la base de datos correctamente.

---

## Paso 2: Actualiza el Frontend

1. Detén el frontend si está corriendo (presiona `Ctrl + C` en la terminal donde corre).
2. Reemplaza los archivos del frontend con los nuevos archivos proporcionados.
3. Inicia el frontend:

```bash
# Desde la carpeta del frontend
npm install    # (si hay paquetes nuevos)
npm run dev
```

---

## Paso 3: ¡Probar!

1. Abre tu navegador en: `http://localhost:5173`.
2. Inicia sesión como **cliente** y solicita un presupuesto.
3. Inicia sesión como **profesional** y responde a la solicitud.
4. Inicia sesión como **profesional** y ve a **"Verificar Identidad"** para enviar documentos.

---

## 🎯 RESULTADO ESPERADO

Al finalizar el Sprint 4, tendrás:

* **Backend:** APIs de cotizaciones y verificación funcionando.
* **Frontend:** Interfaces para solicitar y responder cotizaciones, y para verificar identidad.
* **Conexión Real:** El frontend se comunica con el backend para gestionar todo el flujo de cotizaciones.

---

## Comprobaciones rápidas / Troubleshooting

* Si Prisma da error: revisa tu archivo `.env` con la cadena de conexión a la base de datos.
* Si el frontend no carga: revisa que el backend esté corriendo y que el frontend apunte al endpoint correcto.
* Si hay errores CORS: habilitar CORS temporalmente en el backend o configurar proxy en el frontend.
* Si faltan dependencias: ejecutar `npm install` en backend/frontend.
* Si el puerto `5173` está ocupado: cambiar puerto o detener el proceso que lo use.

---

## Buenas prácticas

* Antes de reemplazar archivos, hacer un `git status` y `git stash` si tenés cambios locales.
* Mantener abiertos los logs de backend y frontend.
* Documentar errores reproducibles y sus soluciones para el equipo.
