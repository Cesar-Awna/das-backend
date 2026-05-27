import express from 'express';
import NotificationController from '../../controllers/notifications/notification.controller.js';
import { authMiddleware, adminOnly } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new NotificationController();

router.use(authMiddleware);

router.get('/', c.list);
router.put('/:id/read', c.markAsRead);
router.get('/unread-count', c.unreadCount);
router.post('/preferences', c.setPreferences);
router.get('/email-templates', c.listEmailTemplates);
router.put('/email-templates/:id', adminOnly, c.updateEmailTemplate);

export default router;
