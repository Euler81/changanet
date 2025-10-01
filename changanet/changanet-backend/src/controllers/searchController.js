// src/controllers/searchController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.searchProfessionals = async (req, res) => {
  const { especialidad, zona_cobertura, tarifa_min, tarifa_max } = req.query;

  try {
    const where = {
      usuario: {
        rol: 'profesional',
      },
    };

    if (especialidad) {
      where.especialidad = { contains: especialidad, mode: 'insensitive' };
    }

    if (zona_cobertura) {
      where.zona_cobertura = { contains: zona_cobertura, mode: 'insensitive' };
    }

    if (tarifa_min || tarifa_max) {
      where.tarifa_hora = {};
      if (tarifa_min) where.tarifa_hora.gte = parseFloat(tarifa_min);
      if (tarifa_max) where.tarifa_hora.lte = parseFloat(tarifa_max);
    }

    const professionals = await prisma.perfiles_profesionales.findMany({
      where,
      include: {
        usuario: {
          select: { id: true, nombre: true, email: true },
        },
      },
    });

    res.status(200).json(professionals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar profesionales.' });
  }
};