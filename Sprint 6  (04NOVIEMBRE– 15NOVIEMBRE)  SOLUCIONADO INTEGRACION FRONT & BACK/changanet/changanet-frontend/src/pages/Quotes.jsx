import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Quotes = () => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('received'); // 'received' for professionals, 'sent' for clients

  useEffect(() => {
    if (user) {
      fetchQuotes();
    }
  }, [user, activeTab]);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const endpoint = user.role === 'profesional'
        ? `/api/quotes/professional`
        : `/api/quotes/client`;

      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('changanet_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const respondToQuote = async (quoteId, action, price = null, comment = null) => {
    try {
      const response = await fetch('/api/quotes/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('changanet_token')}`
        },
        body: JSON.stringify({
          quoteId,
          action,
          precio: price,
          comentario: comment
        })
      });

      if (response.ok) {
        // Refresh quotes
        fetchQuotes();
        alert(action === 'accept' ? 'Cotización aceptada exitosamente' : 'Cotización rechazada');
      } else {
        const data = await response.json();
        alert(data.error || 'Error al procesar la respuesta');
      }
    } catch (error) {
      console.error('Error responding to quote:', error);
      alert('Error de conexión');
    }
  };

  const handleAccept = (quoteId) => {
    const price = prompt('Ingresa el precio para este servicio:');
    if (price && !isNaN(price)) {
      const comment = prompt('Comentario adicional (opcional):');
      respondToQuote(quoteId, 'accept', parseFloat(price), comment);
    }
  };

  const handleReject = (quoteId) => {
    const reason = prompt('Razón del rechazo (opcional):');
    respondToQuote(quoteId, 'reject', null, reason);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-turquoise-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Cargando cotizaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-turquoise-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-600 to-turquoise-600 bg-clip-text text-transparent">
            {user.role === 'profesional' ? 'Mis Cotizaciones' : 'Mis Solicitudes de Presupuesto'}
          </h1>

          {/* Tabs for professionals */}
          {user.role === 'profesional' && (
            <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
              <button
                onClick={() => setActiveTab('received')}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'received'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                Recibidas
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`flex-1 py-3 px-6 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'sent'
                    ? 'bg-emerald-600 text-white'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                Enviadas
              </button>
            </div>
          )}

          {/* Quotes List */}
          <div className="space-y-6">
            {quotes.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {user.role === 'profesional' ? 'No tienes cotizaciones' : 'No has enviado solicitudes'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {user.role === 'profesional'
                    ? 'Cuando los clientes te soliciten presupuestos, aparecerán aquí.'
                    : 'Cuando solicites presupuestos a profesionales, aparecerán aquí.'
                  }
                </p>
                {user.role === 'cliente' && (
                  <a
                    href="/profesionales"
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium"
                  >
                    Buscar Profesionales
                  </a>
                )}
              </div>
            ) : (
              quotes.map(quote => (
                <div key={quote.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {quote.descripcion}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            <span className="font-medium">Zona:</span> {quote.zona_cobertura}
                          </p>
                          <p className="text-gray-600 mb-2">
                            <span className="font-medium">
                              {user.role === 'profesional' ? 'Cliente:' : 'Profesional:'}
                            </span>{' '}
                            {user.role === 'profesional' ? quote.cliente.nombre : quote.profesional.nombre}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(quote.creado_en).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                            quote.estado === 'pendiente' ? 'bg-amber-100 text-amber-800' :
                            quote.estado === 'aceptado' ? 'bg-emerald-100 text-emerald-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {quote.estado === 'pendiente' ? 'Pendiente' :
                             quote.estado === 'aceptado' ? 'Aceptada' : 'Rechazada'}
                          </span>
                        </div>
                      </div>

                      {quote.estado === 'aceptado' && quote.precio && (
                        <div className="bg-emerald-50 p-4 rounded-lg mb-4">
                          <p className="text-emerald-800 font-medium">
                            Precio acordado: ${quote.precio}
                          </p>
                          {quote.comentario && (
                            <p className="text-emerald-700 text-sm mt-1">
                              {quote.comentario}
                            </p>
                          )}
                        </div>
                      )}

                      {quote.estado === 'rechazado' && quote.comentario && (
                        <div className="bg-red-50 p-4 rounded-lg mb-4">
                          <p className="text-red-800 font-medium">Razón del rechazo:</p>
                          <p className="text-red-700 text-sm mt-1">{quote.comentario}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions for professionals */}
                    {user.role === 'profesional' && quote.estado === 'pendiente' && (
                      <div className="flex space-x-3 mt-4 lg:mt-0 lg:ml-6">
                        <button
                          onClick={() => handleAccept(quote.id)}
                          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => handleReject(quote.id)}
                          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                        >
                          Rechazar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
