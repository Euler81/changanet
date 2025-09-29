# 🚀 CÓMO EJECUTAR EL SPRINT 3

> **Resumen:** Guía paso a paso para desplegar y probar los cambios del Sprint 3 en entorno local.

---

## Requisitos previos

* Node.js y npm instalados.
* Acceso al repositorio / archivos nuevos del Backend y Frontend.
* Puerto por defecto del frontend: `5173`.

---

## Paso 1: Asegúrate de que el Backend está Actualizado

1. Detén el backend si está corriendo (presiona `Ctrl + C` en la terminal donde corre).
2. Reemplaza los archivos del backend con los nuevos archivos proporcionados (copiar/pegar o extraer el zip en la carpeta del proyecto).
3. Inicia el backend:

```bash
# Desde la carpeta del backend
npm install    # (si hay paquetes nuevos)
npm run dev
```

> Nota: verifica la salida en consola para confirmar que el servidor arrancó correctamente y sin errores.

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

> Nota: algunos proyectos usan Vite, Next o Create React App. Ajusta el comando si corresponde.

---

## Paso 3: ¡Probar!

1. Abre tu navegador en: `http://localhost:5173`.
2. Inicia sesión como **cliente** y contrata un servicio (simulado).
3. Marca el servicio como completado (puede ser desde la UI o actualizando la base de datos / mediante una API simulada).
4. Ve a la página del **profesional** y deja una reseña.
5. Inicia sesión como **profesional** y gestiona tu agenda.

---

## Comprobaciones rápidas / Troubleshooting

* Si el frontend no carga: revisa que el backend esté corriendo y que el frontend apunte al endpoint correcto (revisar `ENV` o `config`).
* Si hay errores CORS: habilitar CORS temporalmente en el backend o configurar proxy en el frontend durante pruebas.
* Si faltan dependencias: ejecutar `npm install` en backend/frontend.
* Si el puerto `5173` está ocupado: cambiar puerto o detener el proceso que usa ese puerto.



--


