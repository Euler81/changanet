// src/controllers/reviewController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createReview = async (req, res) => {
  const { id: userId } = req.user;
  const { servicio_id, calificacion, comentario, url_foto } = req.body;

  try {
    const service = await prisma.servicios.findUnique({ where: { id: servicio_id } });
    if (!service || service.estado !== 'completado' || service.cliente_id !== userId) {
      return res.status(403).json({ error: 'No puedes dejar una reseña para este servicio.' });
    }

    const review = await prisma.resenas.create({
      data: {
        servicio_id,
        calificacion: parseInt(calificacion),
        comentario,
        url_foto
      }
    });

    // ACTUALIZAR CALIFICACIÓN PROMEDIO DEL PROFESIONAL
    const reviews = await prisma.resenas.findMany({ where: { servicio: { profesional_id: service.profesional_id } } });
    const avgRating = reviews.reduce((sum, r) => sum + r.calificacion, 0) / reviews.length;

    await prisma.perfiles_profesionales.update({
      where: { usuario_id: service.profesional_id },
      data: { calificacion_promedio: avgRating }
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la reseña.' });
  }
};

exports.getReviewsByProfessional = async (req, res) => {
  const { professionalId } = req.params;

  try {
    const reviews = await prisma.resenas.findMany({
      where: {
        servicio: {
          profesional_id: professionalId
        }
      },
      include: {
        servicio: true,
        cliente: {
          select: {
            nombre: true,
            email: true
          }
        }
      },
      orderBy: {
        creado_en: 'desc'
      }
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las reseñas.' });
  }
};