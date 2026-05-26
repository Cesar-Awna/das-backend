import instance from '../apis/app.js';

class NotificationsService {
  list = () => instance.get('/api/notifications');
  markRead = (id) => instance.post(`/api/notifications/${id}/read`);
  alerts = () => instance.get('/api/notifications/alerts');
  configAlert = (data) => instance.post('/api/notifications/config-alert', data);
  unreadCount = () => instance.get('/api/notifications/unread-count');
}

export default new NotificationsService();
