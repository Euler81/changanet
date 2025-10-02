// src/components/NotificationBell.jsx
import { useState, useEffect, useContext } from 'react';
import NotificationCenter from './NotificationCenter';
import { AuthContext } from '../context/AuthContext';

const NotificationBell = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showCenter, setShowCenter] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const response = await fetch('/api/notifications', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('changanet_token')}`
            }
          });
          const data = await response.json();
          if (response.ok) {
            setNotifications(data);
            const unread = data.filter(n => !n.está_leído).length;
            setUnreadCount(unread);
          }
        } catch (error) {
          console.error('Error al cargar notificaciones:', error);
        }
      };

      fetchNotifications();

      // Refrescar cada 30 segundos
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('changanet_token')}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? data : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error al marcar como leída:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowCenter(!showCenter)}
        className="relative p-2 text-gray-700 hover:text-primary focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showCenter && (
        <NotificationCenter
         notifications={notifications}
         onClose={() => setShowCenter(false)}
         onMarkAsRead={markAsRead}
       />
      )}
    </div>
  );
};

export default NotificationBell;
