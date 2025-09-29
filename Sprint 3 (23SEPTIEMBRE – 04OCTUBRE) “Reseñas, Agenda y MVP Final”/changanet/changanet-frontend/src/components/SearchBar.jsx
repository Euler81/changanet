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
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
      <input
        type="text"
        placeholder="¿Qué necesitas? (Plomero, Electricista...)"
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="flex-grow px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        placeholder="¿Dónde? (Buenos Aires, CABA...)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-grow px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="bg-secondary text-white px-6 py-3 rounded-md hover:bg-orange-500 transition font-medium"
      >
        Buscar Profesionales
      </button>
    </form>
  );
};

export default SearchBar;