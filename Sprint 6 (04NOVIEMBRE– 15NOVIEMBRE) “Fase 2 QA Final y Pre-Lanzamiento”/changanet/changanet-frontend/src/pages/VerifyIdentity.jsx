// src/pages/VerifyIdentity.jsx
import VerificationForm from '../components/VerificationForm';

const VerifyIdentity = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Verificación de Identidad</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <VerificationForm />
        </div>

        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Beneficios de la Verificación</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-primary text-2xl mr-3">✅</div>
                <div>
                  <h3 className="font-semibold">Mayor Confiabilidad</h3>
                  <p className="text-gray-600 text-sm">Los clientes prefieren profesionales verificados.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-primary text-2xl mr-3">💰</div>
                <div>
                  <h3 className="font-semibold">Acceso a Pagos</h3>
                  <p className="text-gray-600 text-sm">Solo profesionales verificados pueden recibir pagos.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-primary text-2xl mr-3">🏆</div>
                <div>
                  <h3 className="font-semibold">Insignia Exclusiva</h3>
                  <p className="text-gray-600 text-sm">Obtén una insignia de verificación en tu perfil.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Documentos Requeridos</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>DNI (frente y dorso)</li>
              <li>Comprobante de domicilio</li>
              <li>Matrícula profesional (si aplica)</li>
            </ul>
            <p className="text-gray-500 text-sm mt-4">
              Todos los documentos deben ser claros, legibles y vigentes. La información será tratada con total confidencialidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyIdentity;