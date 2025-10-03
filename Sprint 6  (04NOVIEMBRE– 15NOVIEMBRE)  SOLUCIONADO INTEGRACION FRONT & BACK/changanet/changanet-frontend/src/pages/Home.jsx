import Hero from '../components/Hero';

const Home = () => {
  return (
    <div>
      <Hero />

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-emerald-50 to-turquoise-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
              <p className="text-gray-600">Profesionales Registrados</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-turquoise-600 mb-2">50,000+</div>
              <p className="text-gray-600">Servicios Completados</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">4.8/5</div>
              <p className="text-gray-600">Calificación Promedio</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">25%</div>
              <p className="text-gray-600">Reducción CO2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Triple Impacto Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-turquoise-600 bg-clip-text text-transparent">
              Nuestro Triple Impacto
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Más que una plataforma de servicios, somos agentes de cambio positivo en la sociedad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
              <div className="text-6xl mb-6 group-hover:animate-bounce">🤝</div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-700">Social</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Dignificamos el trabajo manual y promovemos la inclusión laboral para todos, creando oportunidades equitativas.
              </p>
              <div className="mt-6 text-sm text-emerald-600 font-medium">
                +15% más inclusión laboral
              </div>
            </div>

            <div className="group bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
              <div className="text-6xl mb-6 group-hover:animate-bounce">💰</div>
              <h3 className="text-2xl font-bold mb-4 text-amber-700">Económico</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Pagos seguros con garantía total y transparencia absoluta en todos los precios y comisiones.
              </p>
              <div className="mt-6 text-sm text-amber-600 font-medium">
                100% pagos protegidos
              </div>
            </div>

            <div className="group bg-gradient-to-br from-turquoise-50 to-cyan-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
              <div className="text-6xl mb-6 group-hover:animate-bounce">🌱</div>
              <h3 className="text-2xl font-bold mb-4 text-turquoise-700">Ambiental</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Optimizamos rutas de desplazamiento para reducir significativamente las emisiones de CO2.
              </p>
              <div className="mt-6 text-sm text-turquoise-600 font-medium">
                -25% emisiones CO2
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gradient-to-r from-gray-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Lo que dicen nuestros usuarios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-emerald-600 font-bold">MC</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">María Clara</h4>
                  <div className="flex text-amber-400">
                    {'⭐'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Encontré un plomero excelente en minutos. El servicio fue impecable y el precio justo. ¡Recomiendo Changánet!"
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-turquoise-600 font-bold">JR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Juan Rodríguez</h4>
                  <div className="flex text-amber-400">
                    {'⭐'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Como electricista, Changánet me ha dado visibilidad y clientes constantes. La plataforma es muy profesional."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-amber-600 font-bold">LS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Laura Sánchez</h4>
                  <div className="flex text-amber-400">
                    {'⭐'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Me encanta que prioricen el impacto ambiental. Saber que optimizan rutas hace que me sienta bien contratando servicios."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-emerald-600 to-turquoise-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para transformar tu experiencia con servicios?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya confían en Changánet para sus necesidades diarias
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Buscar Profesionales
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-200">
              Convertirse en Profesional
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
