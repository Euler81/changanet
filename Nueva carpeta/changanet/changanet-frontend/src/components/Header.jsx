import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './modals/LoginModal';
import SignupModal from './modals/SignupModal';
import NotificationBell from './NotificationBell';

const Header = () => {
  const { user, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary flex items-center">
            <span>Changánet</span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary">Inicio</Link>
            <Link to="/profesionales" className="text-gray-700 hover:text-primary">Servicios</Link>
            <Link to="/profesionales" className="text-gray-700 hover:text-primary">Para Profesionales</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <NotificationBell />
                <span className="text-gray-700 hidden md:inline">Hola, {user.name}</span>
                <button
                  onClick={() => navigate('/mi-cuenta')}
                  className="text-gray-700 hover:text-primary"
                >
                  Mi Cuenta
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setShowLogin(true)}
                  className="text-gray-700 hover:text-primary"
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={() => setShowSignup(true)}
                  className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-orange-500 transition"
                >
                  Publicar Servicio
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        onSwitchToSignup={() => {
          setShowLogin(false);
          setShowSignup(true);
        }} 
      />
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)} 
        onSwitchToLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }} 
      />
    </>
  );
};

export default Header;