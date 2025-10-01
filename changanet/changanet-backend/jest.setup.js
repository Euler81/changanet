// jest.setup.js
const { PrismaClient } = require('@prisma/client');

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockUsers = {};

  const mockPrismaClient = {
    usuarios: {
      create: jest.fn((data) => {
        const user = {
          id: 'mock-user-id',
          ...data.data,
          creado_en: new Date(),
          actualizado_en: null,
        };
        mockUsers[data.data.email] = user;
        return user;
      }),
      findUnique: jest.fn(({ where }) => {
        return mockUsers[where.email] || null;
      }),
      findMany: jest.fn(),
      update: jest.fn(({ where, data }) => {
        if (mockUsers[where.email]) {
          mockUsers[where.email] = { ...mockUsers[where.email], ...data };
          return mockUsers[where.email];
        }
        return null;
      }),
      delete: jest.fn(),
      deleteMany: jest.fn(() => {
        Object.keys(mockUsers).forEach(key => delete mockUsers[key]);
      }),
    },
    perfiles_profesionales: {
      create: jest.fn(),
      findUnique: jest.fn(({ where }) => {
        // Mock a profile for the user
        if (where.usuario_id === 'mock-user-id') {
          return {
            usuario_id: 'mock-user-id',
            especialidad: 'plomero',
            años_experiencia: 5,
            zona_cobertura: 'Buenos Aires',
            tarifa_hora: 50,
            descripción: 'Experienced plumber',
            url_foto_perfil: null,
            estado_verificación: 'pendiente',
            verificado_en: null,
            url_documento_verificacion: null,
            usuario: {
              nombre: 'Test User',
              email: 'test@example.com'
            }
          };
        }
        return null;
      }),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    servicios: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    reseñas: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    mensajes: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    disponibilidad: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    notificaciones: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    cotizaciones: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $disconnect: jest.fn(),
  };

  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});