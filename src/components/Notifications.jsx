import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Notifications.css';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockNotifications = [
        {
          id: 1,
          type: 'skill_swap',
          title: 'New Skill Swap Request',
          message: 'John wants to swap Guitar lessons for Programming lessons',
          read: false,
          data: {
            swapId: '123',
            senderId: '456',
            senderSkill: 'Guitar',
            requestedSkill: 'Programming'
          },
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          type: 'rating',
          title: 'New Rating Received',
          message: 'Sarah gave you a 5-star rating for JavaScript tutoring',
          read: true,
          data: {
            skillId: '789',
            rating: 5,
            reviewId: '321'
          },
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: 3,
          type: 'message',
          title: 'New Message',
          message: 'You have a new message from Alex about Python tutoring',
          read: false,
          data: {
            conversationId: '567',
            senderId: '890'
          },
          createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        }
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleNotificationClick = async (notification) => {
    await markAsRead(notification.id);

    try {
      switch (notification.type) {
        case 'skill_swap':
          navigate(`/skills/swap/${notification.data.swapId}`);
          break;
        
        case 'rating':
          navigate(`/profile/reviews/${notification.data.reviewId}`);
          break;
        
        case 'message':
          navigate(`/messages/${notification.data.conversationId}`);
          break;
        
        default:
          console.warn('Unknown notification type:', notification.type);
          navigate('/dashboard');
          break;
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast.error('Failed to navigate to the notification details');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'skill_swap':
        return '🔄';
      case 'rating':
        return '⭐';
      case 'message':
        return '💬';
      default:
        return '📣';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>

      {loading ? (
        <div className="notifications-loading">Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div className="notifications-empty">No notifications yet</div>
      ) : (
        <div className="notifications-list">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="notification-content">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-message">{notification.message}</div>
                <div className="notification-time">
                  {formatTimeAgo(notification.createdAt)}
                </div>
              </div>
              {!notification.read && <div className="notification-badge" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;

