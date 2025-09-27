const ProfessionalDashboard = ({ user }) => {
    const quoteRequests = [
      { id: '1', client: 'Ana Martínez', service: 'Reparación de grifería', status: 'Pendiente', date: '2023-08-24' },
      { id: '2', client: 'Luis Rodríguez', service: 'Instalación de termotanque', status: 'Aceptado', date: '2023-08-23' },
    ];
  
    const activeServices = [
      { id: '1', client: 'Ana Martínez', service: 'Reparación de grifería', status: 'Agendado', date: '2023-08-26' },
    ];
  
    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Solicitudes de Presupuesto</h2>
              <div className="space-y-4">
                {quoteRequests.map(request => (
                  <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{request.client}</h3>
                        <p className="text-gray-600">{request.service}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          request.status === 'Aceptado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {request.status}
                        </span>
                        <p className="text-gray-500 text-sm mt-1">{request.date}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-primary text-white px-4 py-1 rounded-md text-sm hover:bg-emerald-600 transition">
                        Aceptar
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm hover:bg-gray-50 transition">
                        Rechazar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Servicios Activos</h2>
              <div className="space-y-4">
                {activeServices.map(service => (
                  <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{service.client}</h3>
                        <p className="text-gray-600">{service.service}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {service.status}
                        </span>
                        <p className="text-gray-500 text-sm mt-1">{service.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div>
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Mi Agenda</h2>
              <div className="bg-gray-100 rounded-lg p-4 text-center mb-4">
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-gray-600">Horas Disponibles</div>
              </div>
              <button className="w-full py-2 bg-primary text-white rounded-md hover:bg-emerald-600 transition">
                Gestionar Disponibilidad
              </button>
            </div>
  
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
              <div className="space-y-4">
                <button className="w-full text-left p-4 border rounded-lg hover:shadow-md transition">
                  <div className="font-medium">Mi Perfil Público</div>
                  <div className="text-gray-600 text-sm">Edita la información que ven los clientes</div>
                </button>
                <button className="w-full text-left p-4 border rounded-lg hover:shadow-md transition">
                  <div className="font-medium">Mis Ganancias</div>
                  <div className="text-gray-600 text-sm">Verifica tus pagos y retiros</div>
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
  
  export default ProfessionalDashboard;