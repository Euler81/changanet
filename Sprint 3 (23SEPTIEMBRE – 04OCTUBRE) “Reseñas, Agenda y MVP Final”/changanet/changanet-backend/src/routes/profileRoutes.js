// src/routes/profileRoutes.js
// FUNCIÓN: Define los endpoints para la visualización y actualización de perfiles de profesionales.
// RELACIÓN PRD: REQ-06 (Foto), REQ-07 (Especialidad), REQ-08 (Experiencia), REQ-09 (Zona), REQ-10 (Tarifas).
// TARJETA BACKEND: Tarjeta 2: [Backend] Implementar API para Gestión de Perfiles Profesionales.
// SPRINT: Sprint 1 (Primera Entrega) - "Implementación del producto de software".

const express = require('express');
// Importar los controladores que contienen la lógica de negocio para obtener y actualizar perfiles.
const { getProfile, updateProfile } = require('../controllers/profileController');

// Crear un enrutador de Express para agrupar las rutas relacionadas con los perfiles.
const router = express.Router();

// Definir la ruta GET para obtener el perfil público de un profesional.
// REQ-07, REQ-09: El cliente enviará una solicitud GET a /api/profile/123, donde "123" es el ID del profesional.
// Esta ruta es pública y no requiere autenticación.
router.get('/:professionalId', getProfile);

// Definir la ruta PUT para que un profesional autenticado actualice su propio perfil.
// REQ-08, REQ-10: El profesional enviará una solicitud PUT a /api/profile con los datos actualizados en el cuerpo.
// Esta ruta está protegida por el middleware de autenticación (ver server.js).
router.put('/', updateProfile);

// Exportar el enrutador para que pueda ser usado por el servidor principal (server.js).
module.exports = router;