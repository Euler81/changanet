import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-emerald-400 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ¿Necesitas un profesional de confianza?
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Conectamos a los mejores profesionales con quienes los necesitan. Rápido, seguro y con triple impacto.
        </p>
        
        {/* Formulario de Búsqueda */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-2">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Hero;