import { useParams } from 'react-router-dom';
import { useState } from 'react';

const ProfessionalDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');

  const professionals = [
    {
      id: '1',
      name: 'Juan Pérez',
      specialty: 'Plomero',
      rating: 4.8,
      reviews: 52,
      price: 2000,
      location: 'Buenos Aires, Palermo',
      description: 'Soy plomero con más de 10 años de experiencia. Especializado en reparaciones de emergencia y renovaciones de baños. Trabajo garantizado y con materiales de primera calidad.',
      services: ['Reparación de fugas', 'Instalación de grifería', 'Desagües y cañerías', 'Renovación de baños'],
      zone: 'Buenos Aires (Capital y Zona Norte)',
      photos: [
        'https://placehold.co/600x400?text=Trabajo+1',
        'https://placehold.co/600x400?text=Trabajo+2',
        'https://placehold.co/600x400?text=Trabajo+3',
      ],
      reviewsList: [
        { id: '1', rating: 5, comment: 'Excelente trabajo, muy puntual y profesional.', date: '2023-08-15', photo: 'https://placehold.co/100' },
        { id: '2', rating: 4, comment: 'Buen servicio, resolvió mi problema de inmediato.', date: '2023-07-22', photo: null },
      ]
    },
    {
      id: '2',
      name: 'María López',
      specialty: 'Electricista',
      rating: 4.9,
      reviews: 34,
      price: 2500,
      location: 'CABA, Recoleta',
      description: 'Electricista certificada con 8 años de experiencia. Especializada en instalaciones eléctricas residenciales y comerciales. Trabajo con todas las normativas vigentes.',
      services: ['Instalación eléctrica', 'Reparación de circuitos', 'Instalación de iluminación', 'Certificación eléctrica'],
      zone: 'CABA y Zona Norte',
      photos: [
        'https://placehold.co/600x400?text=Trabajo+1',
        'https://placehold.co/600x400?text=Trabajo+2',
        'https://placehold.co/600x400?text=Trabajo+3',
      ],
      reviewsList: [
        { id: '1', rating: 5, comment: 'Trabajo impecable, muy recomendada.', date: '2023-09-10', photo: 'https://placehold.co/100' },
        { id: '2', rating: 5, comment: 'Profesional y eficiente.', date: '2023-08-05', photo: null },
      ]
    }
  ];

  const professional = professionals.find(p => p.id === id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row items-start">
          <img 
            src="https://placehold.co/150" 
            alt={professional.name} 
            className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
          />
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div>
                <h1 className="text-3xl font-bold">{professional.name}</h1>
                <p className="text-xl text-gray-600">{professional.specialty}</p>
              </div>
              <div className="mt-2 md:mt-0 text-right">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="ml-2 text-xl font-medium">{professional.rating}</span>
                  <span className="text-gray-500 ml-2">({professional.reviews} reseñas)</span>
                </div>
                <p className="text-gray-600 mt-1">${professional.price}/hora</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✅ Verificado</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Top 10</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">10+ años</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button className="bg-secondary text-white px-6 py-3 rounded-md hover:bg-orange-500 transition font-medium flex-1">
            Solicitar Presupuesto
          </button>
          <button className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary hover:text-white transition font-medium flex-1">
            Agendar Servicio
          </button>
        </div>
      </div>

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
              Reseñas ({professional.reviews})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Sobre Mí</h2>
              <p className="text-gray-600 mb-6">{professional.description}</p>
              
              <h3 className="text-xl font-semibold mb-2">Servicios que Ofrezco</h3>
              <ul className="list-disc list-inside text-gray-600 mb-6">
                {professional.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-semibold mb-2">Zona de Cobertura</h3>
              <p className="text-gray-600">{professional.zone}</p>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Galería de Trabajos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {professional.photos.map((photo, index) => (
                  <img 
                    key={index} 
                    src={photo} 
                    alt={`Trabajo ${index + 1}`} 
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
                {professional.reviewsList.map(review => (
                  <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-400 mr-2">★</span>
                      <span className="font-medium">{review.rating}</span>
                      <span className="text-gray-500 ml-2">{review.date}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{review.comment}</p>
                    {review.photo && (
                      <img 
                        src={review.photo} 
                        alt="Foto del trabajo" 
                        className="w-32 h-32 rounded-md object-cover mt-2"
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Deja tu reseña</h3>
                <p className="text-gray-600 mb-4">Solo los clientes que han contratado a este profesional pueden dejar una reseña.</p>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md cursor-not-allowed" disabled>
                  Dejar Reseña
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetail;