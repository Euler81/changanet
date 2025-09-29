// src/components/ProfessionalCard.jsx
import { Link } from 'react-router-dom';

const ProfessionalCard = ({ professional }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6 flex flex-col md:flex-row">
      <img 
        src={professional.url_foto_perfil || 'https://placehold.co/100'} 
        alt={professional.usuario.nombre} 
        className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
      />
      <div className="flex-grow">
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold">{professional.usuario.nombre}</h2>
            <p className="text-gray-600">{professional.especialidad}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 font-medium">4.8</span>
              <span className="text-gray-500 ml-1">(52)</span>
            </div>
            <p className="text-gray-600">${professional.tarifa_hora}/hora</p>
          </div>
        </div>
        <p className="text-gray-600 mt-2">{professional.zona_cobertura}</p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {professional.estado_verificación === 'verificado' && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">✅ Verificado</span>
          )}
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Top 10</span>
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-between">
        <Link 
          to={`/profesional/${professional.usuario_id}`} 
          className="text-primary hover:underline mb-2"
        >
          Ver Perfil
        </Link>
        <button className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-orange-500 transition">
          Solicitar Presupuesto
        </button>
      </div>
    </div>
  );
};

export default ProfessionalCard;