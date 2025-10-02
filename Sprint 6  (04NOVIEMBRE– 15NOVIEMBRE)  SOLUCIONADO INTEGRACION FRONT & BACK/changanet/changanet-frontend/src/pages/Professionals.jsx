// src/pages/Professionals.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfessionalCard from '../components/ProfessionalCard';

const Professionals = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Cargando profesionales...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Resultados de Búsqueda</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionals.map(professional => (
          <ProfessionalCard key={professional.usuario_id} professional={professional} />
        ))}
      </div>
    </div>
  );
};

export default Professionals;
