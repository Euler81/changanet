// src/components/ReviewForm.jsx
import { useState } from 'react';

const ReviewForm = ({ servicio_id, onReviewSubmitted }) => {
  const [calificación, setCalificación] = useState(5);
  const [comentario, setComentario] = useState('');
  const [url_foto, setUrlFoto] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3002/api/reviews', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('changanet_token')}`
        },
        body: JSON.stringify({ servicio_id, calificación, comentario, url_foto })
      });
      const data = await response.json();
      
      if (response.ok) {
        onReviewSubmitted(data);
        setCalificación(5);
        setComentario('');
        setUrlFoto('');
      } else {
        setError(data.error || 'Error al dejar la reseña');
      }
    } catch (err) {
      setError('Error de red. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Deja tu reseña</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Calificación</label>
          <div className="flex items-center">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setCalificación(star)}
                className="text-2xl focus:outline-none"
              >
                {star <= calificación ? '★' : '☆'}
              </button>
            ))}
            <span className="ml-2 text-gray-600">({calificación} estrellas)</span>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Comentario</label>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows="4"
            placeholder="Cuéntanos tu experiencia..."
          ></textarea>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">URL de Foto (Opcional)</label>
          <input
            type="url"
            value={url_foto}
            onChange={(e) => setUrlFoto(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://ejemplo.com/foto.jpg"
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-emerald-600 transition disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar Reseña'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;