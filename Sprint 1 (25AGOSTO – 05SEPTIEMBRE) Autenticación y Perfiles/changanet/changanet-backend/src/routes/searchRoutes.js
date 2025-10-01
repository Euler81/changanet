// src/routes/searchRoutes.js
// FUNCIÓN: Define el endpoint público para la búsqueda y filtrado de profesionales.
// RELACIÓN PRD: REQ-11 (Búsqueda por palabra clave), REQ-12 (Filtros), REQ-13 (Rango de precio), REQ-14 (Ordenamiento), REQ-15 (Vista de resultados).
// TARJETA BACKEND: Tarjeta 3: [Backend] Implementar API de Búsqueda de Profesionales.
// SPRINT: Sprint 1 (Primera Entrega) - "Implementación del producto de software".

const express = require('express');
// Importar el controlador que contiene la lógica de negocio para la búsqueda.
const { searchProfessionals } = require('../controllers/searchController');

// Crear un enrutador de Express para agrupar las rutas relacionadas con la búsqueda.
const router = express.Router();

// Definir la ruta GET para buscar profesionales.
// REQ-11: El cliente enviará una solicitud GET a /api/professionals con parámetros de consulta (query params) como ?especialidad=plomero&zona_cobertura=Buenos+Aires.
// Esta ruta es pública y no requiere autenticación, permitiendo que cualquier visitante explore los servicios.
router.get('/', searchProfessionals);

// Exportar el enrutador para que pueda ser usado por el servidor principal (server.js).
module.exports = router;