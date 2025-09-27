// src/controllers/messageController.js
// FUNCIÓN: Implementa la lógica para recuperar el historial de mensajes entre dos usuarios (cliente y profesional).
// RELACIÓN PRD: REQ-20 (Historial de conversaciones archivado).
// TARJETA BACKEND: Tarjeta 4: [Backend] Implementar API de Chat en Tiempo Real.
// SPRINT: Sprint 1 (Primera Entrega) - "Implementación del producto de software".

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controlador para Obtener Historial de Mensajes (GET /api/messages)
exports.getMessageHistory = async (req, res) => {
  // El ID del usuario autenticado viene del middleware de autenticación (req.user.id)
  const { id: userId } = req.user;
  // REQ-20: El ID del otro usuario (con quien se quiere ver la conversación) se pasa como parámetro de consulta (query param) 'with'.
  const { with: otherUserId } = req.query;

  try {
    // REQ-20: Buscar todos los mensajes donde el usuario autenticado y el otro usuario son los participantes,
    // independientemente de quién fue el remitente o el destinatario.
    const messages = await prisma.mensajes.findMany({
      where: {
        OR: [
          // Caso 1: El usuario autenticado es el remitente y el otro usuario es el destinatario.
          { remitente_id: userId, destinatario_id: otherUserId },
          // Caso 2: El otro usuario es el remitente y el usuario autenticado es el destinatario.
          { remitente_id: otherUserId, destinatario_id: userId },
        ],
      },
      // REQ-20: Ordenar los mensajes de forma cronológica (del más antiguo al más reciente).
      orderBy: { creado_en: 'asc' },
    });

    // RESPUESTA: Devolver la lista completa de mensajes de la conversación.
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el historial.' });
  }
};