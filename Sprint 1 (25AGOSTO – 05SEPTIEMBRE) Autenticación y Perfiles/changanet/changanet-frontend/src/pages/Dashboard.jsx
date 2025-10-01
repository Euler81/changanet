import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ClientDashboard from '../components/dashboard/ClientDashboard';
import ProfessionalDashboard from '../components/dashboard/ProfessionalDashboard';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mi Cuenta</h1>
      
      {user.role === 'cliente' ? (
        <ClientDashboard user={user} />
      ) : (
        <ProfessionalDashboard user={user} />
      )}
    </div>
  );
};

export default Dashboard;