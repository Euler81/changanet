// src/components/dashboard/ProfessionalDashboard.jsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProfessionalDashboard = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // INTEGRACIÓN CON BACKEND: Obtener perfil del profesional
        const response = await fetch(`/api/profile/${user.id}`, {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('changanet_token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setProfile(data);
        } else {
          console.error('Error al cargar perfil:', data.error);
        }
      } catch (error) {
        console.error('Error de red:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleUpdateProfile = async (profileData) => {
    try {
      // INTEGRACIÓN CON BACKEND: Actualizar perfil del profesional
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('changanet_token')}`
        },
        body: JSON.stringify(profileData)
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
        alert('Perfil actualizado con éxito');
      } else {
        alert(data.error || 'Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      alert('Error al actualizar el perfil');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mi Cuenta de Profesional</h1>
      
      {profile ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
          <p className="text-gray-600 mb-4"><strong>Especialidad:</strong> {profile.especialidad}</p>
          <p className="text-gray-600 mb-4"><strong>Años de Experiencia:</strong> {profile.años_experiencia}</p>
          <p className="text-gray-600 mb-4"><strong>Zona de Cobertura:</strong> {profile.zona_cobertura}</p>
          <p className="text-gray-600 mb-4"><strong>Tarifa por Hora:</strong> ${profile.tarifa_hora}</p>
          <p className="text-gray-600 mb-4"><strong>Descripción:</strong> {profile.descripción}</p>
          <button 
            onClick={() => {
              const newData = {
                especialidad: prompt('Especialidad:', profile.especialidad) || profile.especialidad,
                años_experiencia: parseInt(prompt('Años de Experiencia:', profile.años_experiencia)) || profile.años_experiencia,
                zona_cobertura: prompt('Zona de Cobertura:', profile.zona_cobertura) || profile.zona_cobertura,
                tarifa_hora: parseFloat(prompt('Tarifa por Hora:', profile.tarifa_hora)) || profile.tarifa_hora,
                descripción: prompt('Descripción:', profile.descripción) || profile.descripción,
              };
              handleUpdateProfile(newData);
            }}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
          >
            Editar Perfil
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Crear Mi Perfil</h2>
          <button 
            onClick={() => {
              const newData = {
                especialidad: prompt('Especialidad:') || 'Plomero',
                años_experiencia: parseInt(prompt('Años de Experiencia:') || '5'),
                zona_cobertura: prompt('Zona de Cobertura:') || 'Buenos Aires',
                tarifa_hora: parseFloat(prompt('Tarifa por Hora:') || '2000'),
                descripción: prompt('Descripción:') || 'Profesional con experiencia...',
              };
              handleUpdateProfile(newData);
            }}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition"
          >
            Crear Perfil
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfessionalDashboard;
