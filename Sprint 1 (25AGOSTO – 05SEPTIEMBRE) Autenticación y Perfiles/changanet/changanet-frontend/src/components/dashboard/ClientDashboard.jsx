const ClientDashboard = ({ user }) => {
    const activeServices = [
      { id: '1', professional: 'Juan Pérez', service: 'Reparación de fuga', status: 'Agendado', date: '2023-08-25' },
      { id: '2', professional: 'María López', service: 'Instalación eléctrica', status: 'Completado', date: '2023-08-20' },
    ];
  
    const conversations = [
      { id: '1', professional: 'Juan Pérez', lastMessage: 'Perfecto, estaré allí a las 10.', time: '10:30 AM' },
      { id: '2', professional: 'Carlos Gómez', lastMessage: '¿Puede ser mañana?', time: '09:15 AM' },
    ];
  
    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Mis Servicios</h2>
              <div className="space-y-4">
                {activeServices.map(service => (
                  <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{service.professional}</h3>
                        <p className="text-gray-600">{service.service}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          service.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {service.status}
                        </span>
                        <p className="text-gray-500 text-sm mt-1">{service.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Mensajes</h2>
              <div className="space-y-4">
                {conversations.map(conv => (
                  <div key={conv.id} className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{conv.professional}</h3>
                      <span className="text-gray-500 text-sm">{conv.time}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{conv.lastMessage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
              <div className="space-y-4">
                <button className="w-full text-left p-4 border rounded-lg hover:shadow-md transition">
                  <div className="font-medium">Buscar un Profesional</div>
                  <div className="text-gray-600 text-sm">Encuentra ayuda para tu próximo proyecto</div>
                </button>
                <button className="w-full text-left p-4 border rounded-lg hover:shadow-md transition">
                  <div className="font-medium">Publicar un Servicio</div>
                  <div className="text-gray-600 text-sm">Recibe presupuestos de profesionales</div>
                </button>
                <button className="w-full text-left p-4 border rounded-lg hover:shadow-md transition">
                  <div className="font-medium">Mis Métodos de Pago</div>
                  <div className="text-gray-600 text-sm">Gestiona tus tarjetas y métodos de pago</div>
                </button>
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Perfil</h2>
              <div className="flex items-center mb-4">
                <img 
                  src="https://placehold.co/60" 
                  alt={user.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-gray-600 text-sm">{user.email}</div>
                </div>
              </div>
              <button className="w-full py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition">
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ClientDashboard;