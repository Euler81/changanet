// src/components/ProfessionalCard.jsx
import { Link } from 'react-router-dom';

const ProfessionalCard = ({ professional }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden group">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-turquoise-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative flex flex-col md:flex-row">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <div className="relative">
            <img
              src={professional.url_foto_perfil || 'https://placehold.co/120x120?text=👷'}
              alt={professional.usuario.nombre}
              className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
            />
            {professional.estado_verificación === 'verificado' && (
              <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow-lg">
                <span className="text-sm">✓</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-emerald-700 transition-colors duration-300">
                {professional.usuario.nombre}
              </h2>
              <p className="text-emerald-600 font-medium text-lg">{professional.especialidad}</p>
              <p className="text-gray-500 flex items-center mt-1">
                <span className="mr-1">📍</span>
                {professional.zona_cobertura}
              </p>
            </div>

            <div className="mt-3 md:mt-0 md:text-right">
              <div className="flex items-center justify-start md:justify-end mb-2">
                <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                  <span className="text-amber-400 text-lg mr-1">⭐</span>
                  <span className="font-bold text-gray-800">4.8</span>
                  <span className="text-gray-500 ml-1">(52)</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                ${professional.tarifa_hora}
                <span className="text-sm font-normal text-gray-500">/hora</span>
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {professional.estado_verificación === 'verificado' && (
              <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-medium flex items-center">
                <span className="mr-1">✅</span> Verificado
              </span>
            )}
            <span className="bg-turquoise-100 text-turquoise-800 text-xs px-3 py-1 rounded-full font-medium flex items-center">
              <span className="mr-1">🏆</span> Top Profesional
            </span>
            <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-medium flex items-center">
              <span className="mr-1">⏱️</span> Respuesta Rápida
            </span>
          </div>

          {/* Triple Impacto indicators */}
          <div className="flex space-x-4 mb-4 text-sm">
            <div className="flex items-center text-gray-600">
              <span className="mr-1">🤝</span>
              <span>Inclusión Social</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="mr-1">🌱</span>
              <span>Eco-friendly</span>
            </div>
          </div>
        </div>

        <div className="md:ml-6 flex flex-col justify-between space-y-3">
          <Link
            to={`/profesional/${professional.usuario_id}`}
            className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200 flex items-center group/link"
          >
            <span>Ver Perfil Completo</span>
            <span className="ml-1 group-hover/link:translate-x-1 transition-transform duration-200">→</span>
          </Link>
          <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-amber-500 hover:to-orange-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105">
            Solicitar Presupuesto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
