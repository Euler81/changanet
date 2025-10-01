const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Changánet</h2>
              <p className="text-gray-400 max-w-md">
                Plataforma de servicios profesionales con triple impacto: social, económico y ambiental.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Acerca de</a></li>
                <li><a href="#" className="hover:text-white">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-white">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Changánet. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;