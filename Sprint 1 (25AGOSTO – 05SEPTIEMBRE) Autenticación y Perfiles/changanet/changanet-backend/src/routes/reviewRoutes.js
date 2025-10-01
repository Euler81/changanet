// src/routes/reviewRoutes.js
// FUNCIÓN: Define el endpoint para que un cliente autenticado deje una reseña verificada tras un servicio completado.
// RELACIÓN PRD: REQ-21 (Calificación), REQ-22 (Comentario), REQ-23 (Foto), REQ-24 (Calificación promedio), REQ-25 (Solo tras servicio completado), RB-02 (Las reseñas solo se pueden dejar tras la finalización del servicio).
// TARJETA BACKEND: Tarjeta 5: [Backend] Implementar API de Reseñas Verificadas.
// SPRINT: Sprint 2 (Segunda Entrega) - "Consolidar y mejorar el producto".

const express = require('express');
// Importar el controlador que contiene la lógica de negocio para crear una reseña.
const { createReview } = require('../controllers/reviewController');

// Crear un enrutador de Express para agrupar las rutas relacionadas con las reseñas.
const router = express.Router();

// Definir la ruta POST para crear una nueva reseña.
// REQ-21, REQ-22, REQ-23: El cliente enviará una solicitud POST a /api/reviews con la calificación, comentario y URL de la foto en el cuerpo.
// Esta ruta está protegida por el middleware de autenticación (ver server.js), por lo que solo un cliente logueado puede dejar una reseña.
router.post('/', createReview);

// Exportar el enrutador para que pueda ser usado por el servidor principal (server.js).
module.exports = router;