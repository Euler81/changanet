// src/controllers/profileController.js
// FUNCIÓN: Implementa la creación, lectura y actualización de perfiles de profesionales.
// RELACIÓN PRD: REQ-06 (Foto), REQ-07 (Especialidad), REQ-08 (Experiencia), REQ-09 (Zona), REQ-10 (Tarifas).
// TARJETA BACKEND: Tarjeta 2: [Backend] Implementar API para Gestión de Perfiles Profesionales.
// SPRINT: Sprint 1 (Primera Entrega) - "Implementación del producto de software".

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controlador para Obtener Perfil (GET /api/profile/:professionalId)
exports.getProfile = async (req, res) => {
  // Extraer el ID del profesional de los parámetros de la URL (ej: /api/profile/123)
  const { professionalId } = req.params;

  try {
    // REQ-06, REQ-07, REQ-09: Buscar el perfil del profesional por su usuario_id y
    // incluir datos básicos del usuario (nombre, email) para mostrar en la vista pública.
    const profile = await prisma.perfiles_profesionales.findUnique({
      where: { usuario_id: professionalId },
      include: { 
        usuario: { 
          select: { 
            nombre: true, // REQ-07: Nombre del profesional
            email: true   // REQ-06: Email para contacto (aunque el chat es interno)
          } 
        } 
      },
    });

    // Si no se encuentra el perfil, devolver error 404.
    if (!profile) return res.status(404).json({ error: 'Perfil no encontrado.' });
    // RESPUESTA: Devolver el perfil completo con los datos del usuario.
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el perfil.' });
  }
};

// Controlador para Actualizar Perfil (PUT /api/profile)
exports.updateProfile = async (req, res) => {
  // El ID del usuario autenticado viene del middleware de autenticación (req.user.id)
  const { id } = req.user;
  // REQ-08, REQ-10: Extraer los datos del cuerpo de la solicitud que el profesional quiere actualizar.
  const { especialidad, años_experiencia, zona_cobertura, tarifa_hora, descripción, url_foto_perfil } = req.body;

  try {
    // Verificar que el usuario autenticado es un profesional (RB-01).
    // Esto evita que un cliente intente actualizar un perfil de profesional.
    const user = await prisma.usuarios.findUnique({ where: { id } });
    if (user.rol !== 'profesional') {
      return res.status(403).json({ error: 'Solo los profesionales pueden actualizar un perfil.' });
    }

    // Buscar si ya existe un perfil para este profesional.
    let profile = await prisma.perfiles_profesionales.findUnique({ where: { usuario_id: id } });

    if (profile) {
      // Si el perfil existe, actualizarlo con los nuevos datos.
      // REQ-10: Convertir tarifa_hora a número para asegurar el tipo de dato correcto en la base de datos.
      profile = await prisma.perfiles_profesionales.update({
        where: { usuario_id: id },
        data: { 
          especialidad, 
          años_experiencia, 
          zona_cobertura, 
          tarifa_hora: parseFloat(tarifa_hora), 
          descripción, 
          url_foto_perfil 
        },
      });
    } else {
      // Si el perfil no existe, crear uno nuevo para el profesional.
      profile = await prisma.perfiles_profesionales.create({
        data: { 
          usuario_id: id, 
          especialidad, 
          años_experiencia, 
          zona_cobertura, 
          tarifa_hora: parseFloat(tarifa_hora), 
          descripción, 
          url_foto_perfil 
        },
      });
    }

    // RESPUESTA: Devolver el perfil actualizado o creado.
    res.status(200).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el perfil.' });
  }
};