import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const VerifyIdentity = () => {
  const { user } = useAuth();
  const [documentType, setDocumentType] = useState('dni');
  const [documentFile, setDocumentFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/') && !file.type === 'application/pdf') {
        setError('Por favor selecciona una imagen o PDF válido');
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo debe ser menor a 5MB');
        return;
      }
      setDocumentFile(file);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!documentFile) {
      setError('Por favor selecciona un documento');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('url_documento', documentFile);

      const response = await fetch('/api/verification/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('changanet_token')}`
        },
        body: formData
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || 'Error al enviar el documento');
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-turquoise-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Documento Enviado!
          </h2>
          <p className="text-gray-600 mb-6">
            Tu documento ha sido enviado para revisión. Te notificaremos cuando sea aprobado.
            Este proceso puede tomar hasta 24-48 horas.
          </p>
          <a
            href="/mi-cuenta"
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium"
          >
            Volver al Dashboard
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-turquoise-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-turquoise-600 p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Verificar Identidad</h1>
              <p className="text-emerald-100">
                Completa tu verificación para ganar la confianza de los clientes y aparecer en más búsquedas.
              </p>
            </div>

            <div className="p-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl mb-6">
                  {error}
                </div>
              )}

              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Beneficios de la Verificación</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">Mayor Visibilidad</h3>
                      <p className="text-gray-600 text-sm">Aparece primero en las búsquedas</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">Confianza</h3>
                      <p className="text-gray-600 text-sm">Los clientes confían más en profesionales verificados</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">Más Clientes</h3>
                      <p className="text-gray-600 text-sm">Atrae más solicitudes de servicio</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-emerald-500 text-xl">✓</span>
                    <div>
                      <h3 className="font-semibold text-gray-800">Insignia de Verificación</h3>
                      <p className="text-gray-600 text-sm">Muestra tu badge de profesional verificado</p>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Tipo de Documento
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      documentType === 'dni'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="documentType"
                        value="dni"
                        checked={documentType === 'dni'}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="mr-3 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <div className="font-semibold">DNI</div>
                        <div className="text-sm opacity-75">Documento Nacional de Identidad</div>
                      </div>
                    </label>

                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      documentType === 'cuit'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <input
                        type="radio"
                        name="documentType"
                        value="cuit"
                        checked={documentType === 'cuit'}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="mr-3 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <div className="font-semibold">CUIT/CUIL</div>
                        <div className="text-sm opacity-75">Clave Única de Identificación Tributaria</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Subir Documento
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="document-upload"
                    />
                    <label htmlFor="document-upload" className="cursor-pointer">
                      <div className="text-4xl mb-4 text-gray-400">📄</div>
                      <div className="text-gray-600 mb-2">
                        {documentFile ? documentFile.name : 'Haz clic para seleccionar un archivo'}
                      </div>
                      <div className="text-sm text-gray-500">
                        JPG, PNG, PDF • Máximo 5MB
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <span className="text-amber-500 mr-3">⚠️</span>
                    <div>
                      <h3 className="font-semibold text-amber-800 mb-1">Importante</h3>
                      <ul className="text-sm text-amber-700 space-y-1">
                        <li>• El documento debe estar vigente</li>
                        <li>• La foto debe ser clara y legible</li>
                        <li>• No se aceptan fotocopias</li>
                        <li>• Tus datos serán tratados con confidencialidad</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !documentFile}
                  className="w-full bg-gradient-to-r from-emerald-500 to-turquoise-600 text-white py-4 rounded-2xl hover:from-emerald-600 hover:to-turquoise-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Enviando documento...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">📤</span>
                      Enviar para Verificación
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyIdentity;
