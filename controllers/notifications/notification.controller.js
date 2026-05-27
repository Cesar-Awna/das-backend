import NotificationService from '../../services/notifications/notification.service.js';

const service = new NotificationService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class NotificationController {
    list = handle((req) => service.list(req.userId, req.query));
    markAsRead = handle((req) => service.markAsRead(req.params.id, req.userId));
    unreadCount = handle((req) => service.unreadCount(req.userId));
    setPreferences = handle((req) => service.setPreferences(req.userId, req.body));
    listEmailTemplates = handle(() => service.listEmailTemplates());
    updateEmailTemplate = handle((req) => service.updateEmailTemplate(req.params.id, req.body));
}
