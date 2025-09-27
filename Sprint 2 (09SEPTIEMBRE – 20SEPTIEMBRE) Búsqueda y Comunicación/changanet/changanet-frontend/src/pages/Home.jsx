import Hero from '../components/Hero';

const Home = () => {
  return (
    <div>
      <Hero />
      
      {/* Sección de Beneficios */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Triple Impacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-primary text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Social</h3>
              <p className="text-gray-600">Dignificamos el trabajo manual y promovemos la inclusión.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-primary text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Económico</h3>
              <p className="text-gray-600">Pagos seguros y transparencia total en los precios.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="text-primary text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">Ambiental</h3>
              <p className="text-gray-600">Optimizamos rutas para reducir emisiones de CO2.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;