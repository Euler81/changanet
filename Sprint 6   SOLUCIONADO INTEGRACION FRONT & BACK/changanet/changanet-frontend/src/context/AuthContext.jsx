// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('changanet_token');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('changanet_user'));
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('changanet_token', token);
    localStorage.setItem('changanet_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('changanet_token');
    localStorage.removeItem('changanet_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
