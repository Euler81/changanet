// src/pages/Quotes.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/quotes/professional', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('changanet_token')}`
          }
        });
        const data = await response.json();

        if (response.ok) {
          setQuotes(data);
        } else {
          setError(data.error || 'Error al cargar cotizaciones');
        }
      } catch (err) {
        setError('Error de red. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const handleRespond = async (quoteId, action, precio, comentario) => {
    try {
      const response = await fetch('/api/quotes/respond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('changanet_token')}`
        },
        body: JSON.stringify({ quoteId, action, precio, comentario })
      });
      const data = await response.json();

      if (response.ok) {
        setQuotes(prev => prev.map(q => q.id === quoteId ? data : q));
        alert(`Cotización ${action === 'accept' ? 'aceptada' : 'rechazada'} con éxito.`);
      } else {
        alert(data.error || 'Error al responder');
      }
    } catch (err) {
      alert('Error de red. Intenta nuevamente.');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cotizaciones Recibidas</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Solicitudes de Clientes</h2>

            {quotes.length > 0 ? (
              <div className="space-y-4">
                {quotes.map(quote => (
                  <div key={quote.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{quote.cliente.nombre}</h3>
                        <p className="text-gray-600">{quote.descripción}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          quote.estado === 'aceptado' ? 'bg-green-100 text-green-800' :
                          quote.estado === 'rechazado' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {quote.estado.charAt(0).toUpperCase() + quote.estado.slice(1)}
                        </span>
                        <p className="text-gray-500 text-sm mt-1">
                          {new Date(quote.creado_en).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {quote.estado === 'pendiente' && (
                      <div className="mt-4 flex space-x-2">
                        <button
                          onClick={() => {
                            const precio = prompt('Precio ($):');
                            const comentario = prompt('Comentario:');
                            if (precio && comentario) {
                              handleRespond(quote.id, 'accept', precio, comentario);
                            }
                          }}
                          className="bg-primary text-white px-4 py-1 rounded-md text-sm hover:bg-emerald-600 transition"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => handleRespond(quote.id, 'reject')}
                          className="border border-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm hover:bg-gray-50 transition"
                        >
                          Rechazar
                        </button>
                      </div>
                    )}

                    {quote.estado === 'aceptado' && (
                      <div className="mt-4 p-3 bg-green-50 rounded-md">
                        <p className="text-green-800 font-medium">Precio: ${quote.precio}</p>
                        <p className="text-green-700">{quote.comentario}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Aún no has recibido solicitudes de cotización.</p>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Acciones Rápidas</h2>
            <div className="space-y-4">
              <button className="w-full text-left p-4 border rounded-lg hover:shadow-md transition">
                <div className="font-medium">Actualizar Perfil</div>
                <div className="text-gray-600 text-sm">Mejora tu visibilidad ante clientes</div>
              </button>
              <button className="w-full text-left p-4 border rounded-lg hover:shadow-md transition">
                <div className="font-medium">Mis Servicios Agendados</div>
                <div className="text-gray-600 text-sm">Verifica tus citas confirmadas</div>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Ayuda</h2>
            <div className="space-y-4 text-gray-600">
              <p><strong>¿Cómo funciona?</strong> Los clientes envían solicitudes de presupuesto y tú puedes aceptar o rechazar con tu oferta.</p>
              <p><strong>¿Cuánto cuesta?</strong> El servicio es gratuito, solo cobras por tus servicios realizados.</p>
              <p><strong>¿Cómo responder?</strong> Si aceptas, proporciona un precio y comentario detallado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
