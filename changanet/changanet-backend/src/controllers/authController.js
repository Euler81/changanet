// src/controllers/authController.js
// FUNCIÓN: Implementa el registro y login de usuarios, gestionando la creación de cuentas y la generación de tokens de acceso.
// RELACIÓN PRD: REQ-01 (Registro), REQ-02 (Login), REQ-03 (Verificación de email), REQ-04 (Email único), RB-01 (Autenticación obligatoria).
// TARJETA BACKEND: Tarjeta 1: [Backend] Implementar API de Registro y Login.
// SPRINT: Sprint 1 (Primera Entrega) - "Implementación del producto de software".

const bcrypt = require('bcryptjs'); // Librería para hashear contraseñas (REQ-03: Seguridad)
const jwt = require('jsonwebtoken'); // Librería para generar tokens JWT
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controlador para Registro (POST /api/auth/register)
exports.register = async (req, res) => {
  // REQ-01: Recibir email, password, name, role (cliente/profesional) del cuerpo de la solicitud
  const { email, password, name, role } = req.body;

  try {
    // REQ-04: Verificar si el email ya existe en la base de datos para evitar duplicados
    const existingUser = await prisma.usuarios.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Este email ya está registrado.' });
    }

    // Hashear la contraseña antes de guardarla (REQ-03: Nunca guardar contraseñas en texto plano)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la tabla 'usuarios'
    const user = await prisma.usuarios.create({
      data: {
        email,
        hash_contraseña: hashedPassword, // Guardar la contraseña hasheada
        nombre: name,
        rol: role, // 'cliente' o 'profesional' (REQ-01)
        está_verificado: false, // REQ-03: El usuario se crea como no verificado, pendiente de confirmar su email
      },
    });

    // Generar un token JWT de verificación (válido por 1 hora) que se usaría para enviar un email de confirmación
    // (En una implementación completa, este token se incluiría en un enlace de verificación enviado por email)
    const token = jwt.sign({ userId: user.id, role: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // RESPUESTA: Usuario creado exitosamente. Se le indica que debe verificar su email.
    res.status(201).json({ message: 'Usuario creado. Revisa tu email para verificar tu cuenta.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario.' });
  }
};

// Controlador para Login (POST /api/auth/login)
exports.login = async (req, res) => {
  // REQ-02: Recibir email y password del cuerpo de la solicitud
  const { email, password } = req.body;

  try {
    // Buscar al usuario por su email
    const user = await prisma.usuarios.findUnique({ where: { email } });
    // Verificar que el usuario exista y que la contraseña proporcionada coincida con la hasheada en la base de datos
    if (!user || !(await bcrypt.compare(password, user.hash_contraseña))) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // REQ-03 y RB-01: Verificar que el usuario haya completado el proceso de verificación de email
    // Si no está verificado, se le niega el acceso aunque las credenciales sean correctas
    if (!user.está_verificado) {
      return res.status(403).json({ error: 'Debes verificar tu email antes de iniciar sesión.' });
    }

    // Generar un token JWT de acceso (válido por 24 horas) que contendrá el ID y el rol del usuario
    // Este token se enviará en las siguientes solicitudes para autenticar al usuario
    const token = jwt.sign({ userId: user.id, role: user.rol }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // RESPUESTA: Token de acceso y datos básicos del usuario para que el frontend pueda gestionar la sesión
    res.status(200).json({ 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.nombre, 
        role: user.rol 
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};