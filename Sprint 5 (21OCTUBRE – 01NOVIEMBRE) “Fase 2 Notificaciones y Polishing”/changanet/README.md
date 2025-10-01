# 🚀 CÓMO EJECUTAR EL SPRINT 5

> **Resumen:** Guía paso a paso para desplegar y probar los cambios del Sprint 5 en entorno local.

---

## Requisitos previos

* Node.js y npm instalados.
* Acceso al repositorio / archivos nuevos del Backend y Frontend.
* Puerto por defecto del frontend: `5173`.
* Prisma configurado y base de datos conectada.
* Credenciales de correo (para Nodemailer).

---

## Paso 1: Asegúrate de que el Backend está Actualizado

1. Detén el backend si está corriendo (presiona `Ctrl + C` en la terminal donde corre).
2. Reemplaza los archivos del backend con los nuevos archivos proporcionados.
3. Instala las nuevas dependencias:

```bash
npm install nodemailer
```

4. Actualiza la base de datos:

```bash
npx prisma generate
```

5. Configura las variables de entorno en el archivo `.env`:

```env
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-o-app-password
FRONTEND_URL=http://localhost:5173
```

6. Inicia el backend:

```bash
npm install    # por si hay dependencias nuevas adicionales
npm run dev
```

> Nota: revisa la salida de consola para confirmar que Nodemailer esté inicializado y que Prisma reconozca la conexión a la base de datos.

---

## Paso 2: Actualiza el Frontend

1. Detén el frontend si está corriendo (presiona `Ctrl + C` en la terminal donde corre).
2. Reemplaza los archivos del frontend con los nuevos archivos proporcionados.
3. Inicia el frontend:

```bash
npm install    # por si hay nuevas dependencias
npm run dev
```

---

## Paso 3: ¡Probar!

1. Abre tu navegador en: `http://localhost:5173`.
2. Inicia sesión y realiza alguna acción que genere notificaciones (ej.: enviar mensaje, solicitar presupuesto, etc.).
3. Verifica que las notificaciones se muestren en la **campana** con contador.
4. Prueba las **animaciones y transiciones** mejoradas.

---

## 🎯 RESULTADO ESPERADO

Al finalizar el Sprint 5, tendrás:

* **Backend:** Sistema de notificaciones completo (email, push, in-app).
* **Frontend:** Centro de notificaciones, campana con contador, y componentes de UI mejorados.
* **Experiencia de Usuario:** Interfaz más pulida, con animaciones y feedback visual.

---

## Comprobaciones rápidas / Troubleshooting

* Si no llegan los emails: revisa credenciales `EMAIL_USER` y `EMAIL_PASS` en `.env`.
* Si Prisma falla: confirma la cadena de conexión en `.env` y vuelve a correr `npx prisma generate`.
* Si el frontend no refleja cambios: limpiar cache (`Ctrl + Shift + R`) o borrar carpeta `node_modules` y reinstalar.
* Verifica que el backend y frontend estén corriendo en los puertos correctos.

---

## Buenas prácticas

* Nunca subas el archivo `.env` a GitHub ni a repositorios públicos.
* Mantén abiertos los logs para revisar errores en tiempo real.
* Documenta los errores reproducibles y comparte con el equipo para seguimiento.
