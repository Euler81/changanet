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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="bg-white border-b border-emerald-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-turquoise-600 bg-clip-text text-transparent hover:from-emerald-700 hover:to-turquoise-700 transition-all duration-300 flex items-center space-x-2">
            <span className="text-3xl">🌟</span>
            <span>Changánet</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 relative group">
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-turquoise-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/profesionales" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 relative group">
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-turquoise-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/profesionales" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 relative group">
              Para Profesionales
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-turquoise-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <NotificationBell />
                <span className="text-gray-700 hidden lg:inline font-medium">Hola, {user.name}</span>
                <button
                  onClick={() => navigate('/mi-cuenta')}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-emerald-50"
                >
                  Mi Cuenta
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-emerald-50"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
                >
                  Publicar Servicio
                </button>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-emerald-600 p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-emerald-100 shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link to="/" className="block text-gray-700 hover:text-emerald-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Inicio
              </Link>
              <Link to="/profesionales" className="block text-gray-700 hover:text-emerald-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Servicios
              </Link>
              <Link to="/profesionales" className="block text-gray-700 hover:text-emerald-600 font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Para Profesionales
              </Link>
            </nav>
          </div>
        )}
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
