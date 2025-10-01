// src/controllers/quoteController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createQuoteRequest = async (req, res) => {
  const { id: userId } = req.user;
  const { descripción, zona_cobertura } = req.body;

  try {
    // Buscar 3 profesionales cercanos (simplificado)
    const professionals = await prisma.perfiles_profesionales.findMany({
      where: {
        zona_cobertura: { contains: zona_cobertura, mode: 'insensitive' },
        usuario: { rol: 'profesional' }
      },
      take: 3
    });

    // Crear una solicitud de cotización para cada profesional
    const quoteRequests = [];
    for (const prof of professionals) {
      const quote = await prisma.cotizaciones.create({
        data: {
          cliente_id: userId,
          profesional_id: prof.usuario_id,
          descripción,
          estado: 'pendiente',
          precio: 0, // Se actualizará cuando el profesional responda
          comentario: null
        }
      });
      quoteRequests.push(quote);
    }

    res.status(201).json(quoteRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la solicitud de cotización.' });
  }
};

exports.respondToQuote = async (req, res) => {
  const { id: userId } = req.user;
  const { quoteId, precio, comentario, action } = req.body;

  try {
    const quote = await prisma.cotizaciones.findUnique({
      where: { id: quoteId },
      include: { profesional: true }
    });

    if (!quote || quote.profesional_id !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para responder a esta cotización.' });
    }

    let estado;
    let aceptado_en = null;
    let rechazado_en = null;

    if (action === 'accept') {
      estado = 'aceptado';
      aceptado_en = new Date();
    } else if (action === 'reject') {
      estado = 'rechazado';
      rechazado_en = new Date();
    } else {
      return res.status(400).json({ error: 'Acción inválida. Usa "accept" o "reject".' });
    }

    const updatedQuote = await prisma.cotizaciones.update({
      where: { id: quoteId },
      data: {
        estado,
        precio: action === 'accept' ? parseFloat(precio) : quote.precio,
        comentario: action === 'accept' ? comentario : quote.comentario,
        aceptado_en,
        rechazado_en
      }
    });

    res.status(200).json(updatedQuote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al responder a la cotización.' });
  }
};

exports.getClientQuotes = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const quotes = await prisma.cotizaciones.findMany({
      where: { cliente_id: userId },
      include: {
        profesional: {
          select: {
            nombre: true,
            email: true
          }
        }
      },
      orderBy: { creado_en: 'desc' }
    });

    res.status(200).json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las cotizaciones.' });
  }
};

exports.getProfessionalQuotes = async (req, res) => {
  const { id: userId } = req.user;

  try {
    const quotes = await prisma.cotizaciones.findMany({
      where: { profesional_id: userId },
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

    res.status(200).json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las cotizaciones.' });
  }
};