import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cliente');
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    const result = await signup(name, email, password, role);
    if (result.success) {
      alert(result.message);
      onSwitchToLogin();
    } else {
      setError(result.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Crear Cuenta</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Nombre Completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Soy un:</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="cliente"
                    checked={role === 'cliente'}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2"
                  />
                  Cliente
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="profesional"
                    checked={role === 'profesional'}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2"
                  />
                  Profesional
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-emerald-600 transition"
            >
              Registrarse
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <button 
                onClick={onSwitchToLogin}
                className="text-primary font-medium hover:underline"
              >
                Inicia Sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
