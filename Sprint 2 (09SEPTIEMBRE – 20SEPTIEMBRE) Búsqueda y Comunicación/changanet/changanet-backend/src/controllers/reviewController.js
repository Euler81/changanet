// src/controllers/reviewController.js
// FUNCIÓN: Implementa la lógica para que un cliente deje una reseña verificada tras la finalización de un servicio.
// RELACIÓN PRD: REQ-21 (Calificación), REQ-22 (Comentario), REQ-23 (Foto), REQ-24 (Calificación promedio), REQ-25 (Solo tras servicio completado), RB-02 (Las reseñas solo se pueden dejar tras la finalización del servicio).
// TARJETA BACKEND: Tarjeta 5: [Backend] Implementar API de Reseñas Verificadas.
// SPRINT: Sprint 2 (Segunda Entrega) - "Consolidar y mejorar el producto".

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controlador para Crear Reseña (POST /api/reviews)
exports.createReview = async (req, res) => {
  // El ID del cliente autenticado viene del middleware de autenticación (req.user.id)
  const { id: userId } = req.user;
  // REQ-21, REQ-22, REQ-23: Extraer los datos de la reseña del cuerpo de la solicitud.
  const { servicio_id, calificación, comentario, url_foto } = req.body;

  try {
    // REQ-25 y RB-02: Verificar tres condiciones críticas antes de permitir la reseña:
    // 1. El servicio debe existir.
    // 2. El servicio debe estar en estado 'completado'.
    // 3. El usuario autenticado debe ser el cliente que contrató el servicio.
    const service = await prisma.servicios.findUnique({ where: { id: servicio_id } });
    if (!service || service.estado !== 'completado' || service.cliente_id !== userId) {
      return res.status(403).json({ error: 'No puedes dejar una reseña para este servicio.' });
    }

    // Crear la reseña en la tabla 'reseñas'.
    // REQ-21: Convertir la calificación a entero para asegurar el tipo de dato correcto.
    const review = await prisma.reseñas.create({
      data: {
        servicio_id: parseInt(servicio_id),
        calificación: parseInt(calificación),
        comentario,
        url_foto // REQ-23: URL de la foto adjunta al servicio
      }
    });

    // REQ-24: Actualizar la calificación promedio del profesional en su perfil.
    // 1. Obtener todas las reseñas asociadas al profesional del servicio.
    const reviews = await prisma.reseñas.findMany({
      where: {
        servicio: {
          profesional_id: service.profesional_id
        }
      }
    });
    // 2. Calcular el promedio de las calificaciones.
    const avgRating = reviews.reduce((sum, r) => sum + r.calificación, 0) / reviews.length;
    // 3. Actualizar el campo 'calificación_promedio' en el perfil del profesional.
    await prisma.perfiles_profesionales.update({
      where: { usuario_id: service.profesional_id },
      data: { calificación_promedio: avgRating }
    });

    // RESPUESTA: Devolver la reseña creada con código 201 (Created).
    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la reseña.' });
  }
};