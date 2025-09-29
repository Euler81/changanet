// src/controllers/reviewController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createReview = async (req, res) => {
  const { id: userId } = req.user;
  const { servicio_id, calificación, comentario, url_foto } = req.body;

  try {
    const service = await prisma.servicios.findUnique({ where: { id: servicio_id } });
    if (!service || service.estado !== 'completado' || service.cliente_id !== userId) {
      return res.status(403).json({ error: 'No puedes dejar una reseña para este servicio.' });
    }

    const review = await prisma.reseñas.create({
      data: {
        servicio_id,
        calificación: parseInt(calificación),
        comentario,
        url_foto
      }
    });

    // Actualizar calificación promedio (simplificado)
    const reviews = await prisma.reseñas.findMany({ where: { servicio: { profesional_id: service.profesional_id } } });
    const avgRating = reviews.reduce((sum, r) => sum + r.calificación, 0) / reviews.length;

    await prisma.perfiles_profesionales.update({
      where: { usuario_id: service.profesional_id },
      data: { calificación_promedio: avgRating }
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
    const reviews = await prisma.reseñas.findMany({
      where: { servicio: { profesional_id: professionalId } },
      include: { 
        cliente: { 
          select: { 
            nombre: true, 
            email: true 
          } 
        } 
      },
      orderBy: { creado_en: 'desc' }
    });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las reseñas.' });
  }
};