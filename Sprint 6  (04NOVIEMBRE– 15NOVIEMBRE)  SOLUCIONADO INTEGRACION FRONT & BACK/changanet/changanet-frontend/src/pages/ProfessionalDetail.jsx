// src/pages/ProfessionalDetail.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReviewForm from '../components/ReviewForm';

const ProfessionalDetail = () => {
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);
  const [activeTab, setActiveTab] = useState('about');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/profile/${id}`);
        const data = await response.json();
        if (response.ok) {
          setProfessional(data);
        } else {
          console.error('Error al cargar perfil:', data.error);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-turquoise-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando perfil del profesional...</p>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-turquoise-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Profesional no encontrado</h2>
          <button
            onClick={() => window.history.back()}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-turquoise-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100 to-turquoise-100 rounded-full -translate-y-32 translate-x-32 opacity-20"></div>

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center">
            <div className="flex-shrink-0 mb-6 lg:mb-0 lg:mr-8">
              <div className="relative">
                <img
                  src={professional.url_foto_perfil || 'https://placehold.co/200x200?text=👷'}
                  alt={professional.usuario.nombre}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-3xl object-cover shadow-xl"
                />
                {professional.estado_verificación === 'verificado' && (
                  <div className="absolute -top-3 -right-3 bg-emerald-500 text-white rounded-full p-2 shadow-lg animate-pulse">
                    <span className="text-lg">✓</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                    {professional.usuario.nombre}
                  </h1>
                  <p className="text-xl text-emerald-600 font-semibold mb-2">
                    {professional.especialidad}
                  </p>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="mr-2">📍</span>
                    {professional.zona_cobertura}
                  </div>
                </div>

                <div className="lg:text-right">
                  <div className="flex items-center justify-start lg:justify-end mb-3">
                    <div className="bg-amber-50 px-4 py-2 rounded-2xl flex items-center">
                      <span className="text-amber-400 text-2xl mr-2">⭐</span>
                      <span className="text-2xl font-bold text-gray-800 mr-2">4.8</span>
                      <span className="text-gray-500">(52 reseñas)</span>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    ${professional.tarifa_hora}
                    <span className="text-lg font-normal text-gray-500">/hora</span>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {professional.estado_verificación === 'verificado' && (
                  <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                    <span className="mr-2">✅</span> Verificado
                  </span>
                )}
                <span className="bg-turquoise-100 text-turquoise-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                  <span className="mr-2">🏆</span> Top Profesional
                </span>
                <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                  <span className="mr-2">⏱️</span> Respuesta Rápida
                </span>
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium flex items-center">
                  <span className="mr-2">🌱</span> Eco-friendly
                </span>
              </div>

              {/* Triple Impacto */}
              <div className="bg-gradient-to-r from-emerald-50 to-turquoise-50 rounded-2xl p-4 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Contribución al Triple Impacto</h3>
                <div className="flex space-x-6">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🤝</span>
                    <span className="text-sm">Inclusión Social</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">💰</span>
                    <span className="text-sm">Transparencia</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🌱</span>
                    <span className="text-sm">-25% CO2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-4 rounded-2xl hover:from-amber-500 hover:to-orange-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 flex items-center justify-center">
              <span className="mr-2">📝</span>
              Solicitar Presupuesto
            </button>
            <button className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all duration-200 font-semibold flex-1 flex items-center justify-center">
              <span className="mr-2">📅</span>
              Agendar Servicio
            </button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('about')}
                className={`px-8 py-6 font-semibold text-lg transition-colors duration-200 flex-1 ${
                  activeTab === 'about'
                    ? 'text-emerald-600 border-b-4 border-emerald-600 bg-emerald-50'
                    : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">👤</span>
                Sobre Mí
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-8 py-6 font-semibold text-lg transition-colors duration-200 flex-1 ${
                  activeTab === 'gallery'
                    ? 'text-emerald-600 border-b-4 border-emerald-600 bg-emerald-50'
                    : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">🖼️</span>
                Galería
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-8 py-6 font-semibold text-lg transition-colors duration-200 flex-1 ${
                  activeTab === 'reviews'
                    ? 'text-emerald-600 border-b-4 border-emerald-600 bg-emerald-50'
                    : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">⭐</span>
                Reseñas (52)
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'about' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Sobre Mí</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {professional.descripcion || 'Soy un profesional dedicado con más de 10 años de experiencia en mi especialidad. Me enorgullece brindar un servicio de calidad y garantizada, siempre priorizando la satisfacción del cliente y el cuidado del medio ambiente.'}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Servicios que Ofrezco</h3>
                    <ul className="space-y-3">
                      {['Reparación de fugas', 'Instalación de grifería', 'Desagües y cañerías', 'Renovación de baños'].map((service, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="text-emerald-500 mr-3">✓</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Mi Compromiso</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🤝</span>
                        <div>
                          <h4 className="font-medium text-gray-800">Servicio Personalizado</h4>
                          <p className="text-gray-600 text-sm">Cada trabajo es único y merece atención especial</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🌱</span>
                        <div>
                          <h4 className="font-medium text-gray-800">Prácticas Sostenibles</h4>
                          <p className="text-gray-600 text-sm">Uso materiales eco-friendly y optimizo desplazamientos</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">⏰</span>
                        <div>
                          <h4 className="font-medium text-gray-800">Puntualidad Garantizada</h4>
                          <p className="text-gray-600 text-sm">Respeto los horarios acordados</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Galería de Trabajos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={`https://placehold.co/400x300?text=Trabajo+${i}`}
                        alt={`Trabajo ${i}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-medium">
                          Ver detalle
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Reseñas de Clientes</h2>

                {/* Rating Summary */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-4xl font-bold text-gray-800 mb-2">4.8</div>
                      <div className="flex text-amber-400 mb-2">
                        {'⭐'.repeat(5)}
                      </div>
                      <p className="text-gray-600">Basado en 52 reseñas</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Excelente</div>
                      <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                        <div className="bg-amber-400 h-2 rounded-full w-4/5"></div>
                      </div>
                      <div className="text-sm text-gray-600">80%</div>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-emerald-600 font-bold">MC</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">María Clara</h4>
                          <div className="flex text-amber-400">
                            {'⭐'.repeat(5)}
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">2023-08-15</span>
                    </div>
                    <p className="text-gray-600 mb-4">Excelente trabajo, muy puntual y profesional. El baño quedó perfecto y usó materiales de primera calidad. Recomiendo 100%.</p>
                    <div className="flex space-x-2">
                      <img
                        src="https://placehold.co/100x100?text=Antes"
                        alt="Antes del trabajo"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <img
                        src="https://placehold.co/100x100?text=Después"
                        alt="Después del trabajo"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Review Form */}
                <div className="mt-12 bg-gray-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-800">Deja tu reseña</h3>
                  <ReviewForm
                    servicio_id="ID_DEL_SERVICIO_COMPLETADO"
                    onReviewSubmitted={(review) => {
                      alert('¡Gracias por tu reseña!');
                      // Aquí podrías actualizar la lista de reseñas
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetail;
