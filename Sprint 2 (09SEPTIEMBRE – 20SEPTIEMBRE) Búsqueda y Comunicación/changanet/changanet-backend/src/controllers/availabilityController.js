// src/controllers/availabilityController.js
// FUNCIÓN: Implementa la lógica para que los profesionales gestionen su agenda de disponibilidad y para que los clientes la consulten.
// RELACIÓN PRD: REQ-26 (Calendario editable), REQ-27 (Horarios), REQ-28 (Visibilidad de disponibilidad), REQ-29 (Agendamiento directo), REQ-30 (Confirmación automática).
// TARJETA BACKEND: Tarjeta 6: [Backend] Implementar API de Gestión de Disponibilidad.
// SPRINT: Sprint 2 (Segunda Entrega) - "Consolidar y mejorar el producto".

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controlador para Crear Disponibilidad (POST /api/availability)
exports.createAvailability = async (req, res) => {
  // El ID del usuario autenticado viene del middleware de autenticación (req.user.id)
  const { id: userId } = req.user;
  // REQ-27: Extraer la fecha, hora de inicio y hora de fin del cuerpo de la solicitud.
  const { fecha, hora_inicio, hora_fin } = req.body;

  try {
    // Verificar que el usuario autenticado es un profesional (RB-01).
    // Esto evita que un cliente intente gestionar una agenda.
    const user = await prisma.usuarios.findUnique({ where: { id: userId } });
    if (user.rol !== 'profesional') {
      return res.status(403).json({ error: 'Solo los profesionales pueden gestionar disponibilidad.' });
    }

    // Crear un nuevo bloque de disponibilidad en la tabla 'disponibilidad'.
    // REQ-27: Convertir las cadenas de fecha/hora a objetos Date para asegurar el tipo de dato correcto en la base de datos.
    const availability = await prisma.disponibilidad.create({
      data: {
        profesional_id: userId, // Vincula el bloque al profesional autenticado
        fecha: new Date(fecha),
        hora_inicio: new Date(hora_inicio),
        hora_fin: new Date(hora_fin)
      }
    });

    // RESPUESTA: Devolver el bloque de disponibilidad creado con código 201 (Created).
    res.status(201).json(availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear disponibilidad.' });
  }
};

// Controlador para Obtener Disponibilidad (GET /api/availability/:professionalId)
exports.getAvailability = async (req, res) => {
  // REQ-28: Extraer el ID del profesional de los parámetros de la URL (ej: /api/availability/123)
  const { professionalId } = req.params;
  // REQ-28: Extraer la fecha específica de los parámetros de consulta (query param) 'date' (ej: ?date=2025-09-15)
  const { date } = req.query;

  try {
    // REQ-28: Buscar todos los bloques de disponibilidad para ese profesional en la fecha especificada.
    const availabilities = await prisma.disponibilidad.findMany({
      where: { profesional_id: parseInt(professionalId), fecha: new Date(date) },
    });
    // RESPUESTA: Devolver la lista de bloques de disponibilidad para esa fecha.
    res.status(200).json(availabilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener disponibilidad.' });
  }
};