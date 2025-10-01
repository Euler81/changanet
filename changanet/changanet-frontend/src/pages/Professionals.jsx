// src/pages/Professionals.jsx
import { useState, useEffect } from 'react';
import ProfessionalCard from '../components/ProfessionalCard';
import { useLocation } from 'react-router-dom';

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/professionals${location.search}`);
        const data = await response.json();
        if (response.ok) {
          setProfessionals(data);
        } else {
          console.error('Error al buscar profesionales:', data.error);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchProfessionals();
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resultados de Búsqueda</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Filtros</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Precio por Hora</label>
                <input type="range" min="1000" max="5000" className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$1000</span>
                  <span>$5000</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Calificación</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> 4+ Estrellas
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" /> 5 Estrellas
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-3/4">
          {professionals.length > 0 ? (
            professionals.map(professional => (
              <ProfessionalCard key={professional.usuario_id} professional={professional} />
            ))
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-600">No se encontraron profesionales con los filtros aplicados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Professionals;