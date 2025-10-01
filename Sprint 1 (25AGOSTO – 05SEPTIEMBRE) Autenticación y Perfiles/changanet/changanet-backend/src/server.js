// src/server.js
// FUNCIÓN: Punto de entrada del backend. Configura Express, Socket.IO y todas las rutas.
// RELACIÓN PRD: Define la arquitectura general del sistema (Sección 6: Entorno Operativo).
// TARJETA BACKEND: N/A (Integración de todas las tarjetas).
// SPRINT: Sprint 1 (Primera Entrega) - "Implementación del producto de software".

require('dotenv').config(); // Cargar variables de entorno desde el archivo .env
const express = require('express');
const http = require('http'); // Necesario para Socket.IO (REQ-16: Chat en tiempo real)
const cors = require('cors'); // Permite que el frontend (React) se comunique con este backend.
const { Server } = require('socket.io'); // Librería para chat en tiempo real.
const { PrismaClient } = require('@prisma/client'); // Cliente para interactuar con PostgreSQL.

// Importar todas las rutas (cada una representa una funcionalidad del MVP)
const authRoutes = require('./routes/authRoutes'); // Tarjeta 1: Registro y Login (REQ-01, REQ-02, REQ-03)
const profileRoutes = require('./routes/profileRoutes'); // Tarjeta 2: Gestión de Perfiles (REQ-06 a REQ-10)
const searchRoutes = require('./routes/searchRoutes'); // Tarjeta 3: Búsqueda de Profesionales (REQ-11 a REQ-15)
const messageRoutes = require('./routes/messageRoutes'); // Tarjeta 4: Chat (REQ-16 a REQ-20)
const reviewRoutes = require('./routes/reviewRoutes'); // Tarjeta 5: Reseñas (REQ-21 a REQ-25)
const availabilityRoutes = require('./routes/availabilityRoutes'); // Tarjeta 6: Disponibilidad (REQ-26 a REQ-30)

// Importar middleware de autenticación (protege rutas que requieren login)
const { authenticateToken } = require('./middleware/authenticate');
// Importar servicio de notificaciones (para el chat y otras alertas)
const { sendNotification } = require('./services/notificationService');

// Inicializar Prisma y Express
const prisma = new PrismaClient(); // Cliente para hacer consultas a la base de datos.
const app = express();
const server = http.createServer(app); // Crear servidor HTTP para Socket.IO.
const io = new Server(server, {
  cors: {
    origin: "*", // Permitir conexiones desde cualquier origen (frontend en desarrollo)
    methods: ["GET", "POST"]
  }
});

// Middleware global
app.use(cors()); // Habilitar CORS (REQ-10: Diseño responsive, accesible desde cualquier dispositivo)
app.use(express.json()); // Parsear el cuerpo de las solicitudes JSON (REQ-01: Registro con datos en JSON)

// DEFINIR RUTAS DE LA API
// Rutas públicas (no requieren autenticación)
app.use('/api/auth', authRoutes); // Endpoint: POST /api/auth/register, POST /api/auth/login

// Rutas protegidas (requieren token JWT) - Solo usuarios autenticados
app.use('/api/profile', authenticateToken, profileRoutes); // PUT /api/profile, GET /api/profile/:id
app.use('/api/messages', authenticateToken, messageRoutes); // GET /api/messages (historial)
app.use('/api/reviews', authenticateToken, reviewRoutes); // POST /api/reviews (dejar reseña)
app.use('/api/availability', authenticateToken, availabilityRoutes); // POST /api/availability (gestionar agenda)

// Ruta pública de búsqueda
app.use('/api/professionals', searchRoutes); // GET /api/professionals?specialty=plomero (REQ-11)

// CONFIGURACIÓN DE SOCKET.IO PARA EL CHAT EN TIEMPO REAL (Tarjeta 4 - REQ-16 a REQ-20)
io.on('connection', (socket) => {
  console.log('🚀 Usuario conectado:', socket.id);

  // Escuchar evento 'sendMessage' desde el frontend (cliente o profesional)
  socket.on('sendMessage', async (data) => {
    // REQ-17: El mensaje debe incluir remitente_id, destinatario_id, contenido, url_imagen (opcional)
    const { remitente_id, destinatario_id, contenido, url_imagen } = data;

    try {
      // Guardar el mensaje en la base de datos (tabla 'mensajes')
      const message = await prisma.mensajes.create({
        data: {
          remitente_id,
          destinatario_id,
          contenido,
          url_imagen,
          está_leído: false, // REQ-20: El mensaje se marca como no leído por defecto
        },
      });

      // REQ-19: Enviar notificación al destinatario (email o push)
      await sendNotification(destinatario_id, 'nuevo_mensaje', `Nuevo mensaje de ${remitente_id}`);

      // Emitir el mensaje al destinatario en tiempo real (Socket.IO)
      io.to(destinatario_id).emit('receiveMessage', message);
      // Emitir confirmación al remitente
      io.to(remitente_id).emit('messageSent', message);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      socket.emit('error', { message: 'No se pudo enviar el mensaje.' });
    }
  });

  // Manejar desconexión del socket
  socket.on('disconnect', () => {
    console.log('👋 Usuario desconectado:', socket.id);
  });
});

// Iniciar el servidor en el puerto 3002 (REQ-10: Diseño responsive, backend en un puerto estándar)
const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`🚀 Backend y Socket.IO corriendo en http://localhost:${PORT}`);
  console.log(`✅ MVP de Changánet listo para probar. Funcionalidades: Registro, Login, Perfiles, Búsqueda, Chat, Reseñas.`);
});