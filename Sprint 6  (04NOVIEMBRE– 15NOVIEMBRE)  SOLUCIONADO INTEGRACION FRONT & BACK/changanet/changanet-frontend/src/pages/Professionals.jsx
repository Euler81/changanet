// src/pages/Professionals.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfessionalCard from '../components/ProfessionalCard';

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('rating');
  const [filterVerified, setFilterVerified] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      try {
        // INTEGRACIÓN CON BACKEND: Buscar profesionales con filtros
        const response = await fetch(`/api/professionals${location.search}`);
        const data = await response.json();
        if (response.ok) {
          setProfessionals(data.professionals);
        } else {
          console.error('Error al buscar profesionales:', data.error);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [location.search]);

  const sortedProfessionals = [...professionals].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'price':
        return a.tarifa_hora - b.tarifa_hora;
      case 'name':
        return a.usuario.nombre.localeCompare(b.usuario.nombre);
      default:
        return 0;
    }
  });

  const filteredProfessionals = filterVerified
    ? sortedProfessionals.filter(p => p.estado_verificación === 'verificado')
    : sortedProfessionals;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-turquoise-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Buscando los mejores profesionales...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-turquoise-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-turquoise-600 bg-clip-text text-transparent">
            Profesionales Disponibles
          </h1>
          <p className="text-gray-600 text-lg">
            {filteredProfessionals.length} profesionales encontrados
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterVerified}
                  onChange={(e) => setFilterVerified(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                />
                <span className="text-gray-700 font-medium">Solo verificados</span>
                <span className="text-emerald-600">✅</span>
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="rating">⭐ Mejor calificación</option>
                <option value="price">💰 Precio más bajo</option>
                <option value="name">📝 Nombre (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredProfessionals.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No encontramos profesionales</h2>
            <p className="text-gray-600 mb-6">Intenta ajustar tus filtros o búsqueda</p>
            <button
              onClick={() => window.history.back()}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
            >
              ← Volver a buscar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard key={professional.usuario_id} professional={professional} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {filteredProfessionals.length > 0 && filteredProfessionals.length % 12 === 0 && (
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-emerald-500 to-turquoise-600 text-white px-8 py-4 rounded-full hover:from-emerald-600 hover:to-turquoise-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
              Cargar más profesionales
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Professionals;
