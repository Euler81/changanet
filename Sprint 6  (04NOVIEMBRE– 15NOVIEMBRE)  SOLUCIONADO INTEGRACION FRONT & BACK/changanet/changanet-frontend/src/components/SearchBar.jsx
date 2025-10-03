// src/components/SearchBar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/profesionales?especialidad=${encodeURIComponent(service)}&zona_cobertura=${encodeURIComponent(location)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
      <div className="flex-1 relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔧
        </div>
        <input
          type="text"
          placeholder="¿Qué necesitas? (Plomero, Electricista...)"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
          required
        />
      </div>

      <div className="flex-1 relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          📍
        </div>
        <input
          type="text"
          placeholder="¿Dónde? (Buenos Aires, CABA...)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm hover:shadow-md"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-emerald-500 to-turquoise-600 text-white px-8 py-4 rounded-xl hover:from-emerald-600 hover:to-turquoise-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
      >
        <span>🔍</span>
        <span>Buscar</span>
      </button>
    </form>
  );
};

export default SearchBar;
