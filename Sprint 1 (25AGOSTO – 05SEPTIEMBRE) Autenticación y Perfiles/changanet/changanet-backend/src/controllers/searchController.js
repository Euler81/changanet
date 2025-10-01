// src/controllers/searchController.js
// FUNCIÓN: Implementa la lógica para buscar y filtrar profesionales según los criterios del cliente.
// RELACIÓN PRD: REQ-11 (Búsqueda por palabra clave), REQ-12 (Filtros por especialidad y ubicación), REQ-13 (Filtro por rango de precio), REQ-14 (Ordenamiento), REQ-15 (Vista de resultados).
// TARJETA BACKEND: Tarjeta 3: [Backend] Implementar API de Búsqueda de Profesionales.
// SPRINT: Sprint 1 (Primera Entrega) - "Implementación del producto de software".

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controlador para Buscar Profesionales (GET /api/professionals)
exports.searchProfessionals = async (req, res) => {
  // REQ-11, REQ-12, REQ-13: Extraer los parámetros de consulta (query params) de la URL.
  // Ejemplo de URL: /api/professionals?especialidad=plomero&zona_cobertura=Buenos+Aires&tarifa_min=1000&tarifa_max=5000
  const { especialidad, zona_cobertura, tarifa_min, tarifa_max } = req.query;

  try {
    // Construir el objeto de condiciones 'where' para la consulta a la base de datos.
    // Inicialmente, se filtra para que solo se muestren usuarios con rol 'profesional'.
    const where = {
      usuario: {
        rol: 'profesional',
      },
    };

    // REQ-12: Aplicar filtro por especialidad si se proporciona.
    // La búsqueda es parcial e insensible a mayúsculas/minúsculas (mode: 'insensitive').
    if (especialidad) {
      where.especialidad = { contains: especialidad, mode: 'insensitive' };
    }

    // REQ-12: Aplicar filtro por zona de cobertura si se proporciona.
    // La búsqueda es parcial e insensible a mayúsculas/minúsculas.
    if (zona_cobertura) {
      where.zona_cobertura = { contains: zona_cobertura, mode: 'insensitive' };
    }

    // REQ-13: Aplicar filtro por rango de precio si se proporciona tarifa_min o tarifa_max.
    if (tarifa_min || tarifa_max) {
      where.tarifa_hora = {};
      // Si se proporciona tarifa_min, se filtra por valores mayores o iguales (gte).
      if (tarifa_min) where.tarifa_hora.gte = parseFloat(tarifa_min);
      // Si se proporciona tarifa_max, se filtra por valores menores o iguales (lte).
      if (tarifa_max) where.tarifa_hora.lte = parseFloat(tarifa_max);
    }

    // REQ-15: Ejecutar la consulta a la base de datos para obtener los profesionales que coincidan con los filtros.
    // Se incluyen los datos del usuario relacionado para mostrar nombre y email en los resultados.
    const professionals = await prisma.perfiles_profesionales.findMany({
      where,
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
          },
        },
      },
      // REQ-14: Ordenar los resultados por calificación promedio de mayor a menor.
      orderBy: {
        calificación_promedio: 'desc',
      },
    });

    // RESPUESTA: Devolver la lista de profesionales encontrados con código 200 (OK).
    res.status(200).json(professionals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar profesionales.' });
  }
};