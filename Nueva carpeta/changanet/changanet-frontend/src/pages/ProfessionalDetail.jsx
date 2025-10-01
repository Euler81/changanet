// src/pages/ProfessionalDetail.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReviewForm from '../components/ReviewForm';

const ProfessionalDetail = () => {
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/profile/${id}`);
        const data = await response.json();
        if (response.ok) {
          setProfessional(data);
        } else {
          console.error('Error al cargar perfil:', data.error);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!professional) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado del Profesional */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start">
          <img 
            src={professional.url_foto_perfil || 'https://placehold.co/150'} 
            alt={professional.usuario.nombre} 
            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h1 className="text-3xl font-bold">{professional.usuario.nombre}</h1>
                <p className="text-xl text-gray-600">{professional.especialidad}</p>
              </div>
              <div className="mt-2 md:mt-0 text-right">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="ml-2 text-xl font-medium">4.8</span>
                  <span className="text-gray-500 ml-2">(52 reseñas)</span>
                </div>
                <p className="text-gray-600 mt-1">${professional.tarifa_hora}/hora</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {professional.estado_verificación === 'verificado' && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Verificado</span>
              )}
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Top 10</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">10+ años</span>
            </div>
          </div>
        </div>
        
        {/* Botones de Acción */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button className="bg-secondary text-white px-6 py-3 rounded-md hover:bg-orange-500 transition font-medium flex-1">
            Solicitar Presupuesto
          </button>
          <button className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary hover:text-white transition font-medium flex-1">
            Agendar Servicio
          </button>
        </div>
      </div>

      {/* Pestañas de Contenido */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-4 font-medium ${activeTab === 'about' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            >
              Sobre Mí
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-6 py-4 font-medium ${activeTab === 'gallery' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            >
              Galería de Trabajos
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-4 font-medium ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
            >
              Reseñas (52)
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Sobre Mí</h2>
              <p className="text-gray-600 mb-6">
                {professional.descripcion || 'Soy un profesional dedicado con más de 10 años de experiencia en mi especialidad. Me enorgullece brindar un servicio de calidad y garantizada.'}
              </p>
              
              <h3 className="text-xl font-semibold mb-2">Servicios que Ofrezco</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                <li>Reparación de fugas</li>
                <li>Instalación de grifería</li>
                <li>Desagües y cañerías</li>
                <li>Renovación de baños</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-2">Zona de Cobertura</h3>
              <p className="text-gray-600">{professional.zona_cobertura}</p>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Galería de Trabajos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1,2,3].map(i => (
                  <img 
                    key={i} 
                    src={`https://placehold.co/600x400?text=Trabajo+${i}`} 
                    alt={`Trabajo ${i}`} 
                    className="rounded-lg object-cover w-full h-48"
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
              <div className="space-y-6">
                {/* Aquí irían las reseñas existentes */}
                <div className="border-b pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-400 mr-2">★</span>
                    <span className="font-medium">5</span>
                    <span className="text-gray-500 ml-2">2023-08-15</span>
                  </div>
                  <p className="text-gray-600 mb-2">Excelente trabajo, muy puntual y profesional.</p>
                  <img
                    src="https://placehold.co/100"
                    alt="Foto del trabajo"
                    className="w-32 h-32 rounded-md object-cover mt-2"
                  />
                </div>
              </div>

              {/* Formulario para dejar reseña */}
              <div className="mt-8">
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
  );
};

export default ProfessionalDetail;