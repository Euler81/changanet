// src/routes/messageRoutes.js
// FUNCIÓN: Define el endpoint para que un usuario autenticado obtenga el historial de mensajes con otro usuario específico.
// RELACIÓN PRD: REQ-20 (Historial de conversaciones archivado).
// TARJETA BACKEND: Tarjeta 4: [Backend] Implementar API de Chat en Tiempo Real.
// SPRINT: Sprint 1 (Primera Entrega) - "Implementación del producto de software".

const express = require('express');
// Importar el controlador que contiene la lógica de negocio para obtener el historial de mensajes.
const { getMessageHistory } = require('../controllers/messageController');

// Crear un enrutador de Express para agrupar las rutas relacionadas con los mensajes.
const router = express.Router();

// Definir la ruta GET para obtener el historial de una conversación.
// REQ-20: El cliente enviará una solicitud GET a /api/messages con el parámetro de consulta (query param) 'with' que contiene el ID del otro usuario (ej: ?with=123).
// Esta ruta está protegida por el middleware de autenticación (ver server.js), por lo que solo un usuario logueado puede acceder a su propio historial.
router.get('/', getMessageHistory);

// Exportar el enrutador para que pueda ser usado por el servidor principal (server.js).
module.exports = router;