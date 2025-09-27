// src/routes/availabilityRoutes.js
// FUNCIÓN: Define los endpoints para que los profesionales gestionen su agenda y los clientes la consulten.
// RELACIÓN PRD: REQ-26 (Calendario editable), REQ-27 (Horarios), REQ-28 (Visibilidad de disponibilidad), REQ-29 (Agendamiento directo).
// TARJETA BACKEND: Tarjeta 6: [Backend] Implementar API de Gestión de Disponibilidad.
// SPRINT: Sprint 2 (Segunda Entrega) - "Consolidar y mejorar el producto".

const express = require('express');
// Importar los controladores que contienen la lógica de negocio para crear y obtener disponibilidad.
const { createAvailability, getAvailability } = require('../controllers/availabilityController');

// Crear un enrutador de Express para agrupar las rutas relacionadas con la disponibilidad.
const router = express.Router();

// Definir la ruta POST para que un profesional autenticado cree un bloque de disponibilidad.
// REQ-27: El profesional enviará una solicitud POST a /api/availability con la fecha, hora de inicio y hora de fin en el cuerpo.
// Esta ruta está protegida por el middleware de autenticación (ver server.js).
router.post('/', createAvailability);

// Definir la ruta GET para que cualquier cliente consulte la disponibilidad de un profesional en una fecha específica.
// REQ-28: El cliente enviará una solicitud GET a /api/availability/123?date=2025-09-15, donde "123" es el ID del profesional y "date" es la fecha a consultar.
// Esta ruta es pública y no requiere autenticación, permitiendo que los clientes exploren la agenda antes de agendar.
router.get('/:professionalId', getAvailability);

// Exportar el enrutador para que pueda ser usado por el servidor principal (server.js).
module.exports = router;