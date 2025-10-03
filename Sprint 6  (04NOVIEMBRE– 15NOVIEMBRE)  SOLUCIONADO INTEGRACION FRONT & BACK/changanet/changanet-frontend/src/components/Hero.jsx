import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-teal-500 to-turquoise-600 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-amber-300/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-orange-400/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-emerald-300/10 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
        {/* Hero icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-4xl">🔧</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Profesionales de Confianza
          <span className="block text-2xl md:text-3xl font-medium text-amber-300 mt-2">
            con Triple Impacto
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed">
          Conectamos a los mejores profesionales con quienes los necesitan.
        </p>

        {/* Triple Impacto highlights */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-12">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-2xl">🤝</span>
            <span className="font-medium">Social</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-2xl">💰</span>
            <span className="font-medium">Económico</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-2xl">🌱</span>
            <span className="font-medium">Ambiental</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 shadow-2xl">
          <SearchBar />
        </div>

        {/* Call to action */}
        <div className="mt-12">
          <p className="text-lg mb-4 opacity-90">
            ¿Eres profesional? Únete a nuestra red
          </p>
          <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-3 rounded-full hover:from-amber-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold">
            Regístrate como Profesional
          </button>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20 md:h-32">
          <path fill="#ffffff" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
