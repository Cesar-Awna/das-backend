import express from 'express';
import AuditController from '../../controllers/audit/audit.controller.js';
import { authMiddleware, adminOnly } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new AuditController();

router.use(authMiddleware);
router.use(adminOnly);

router.get('/', c.list);
router.get('/by-user/:userId', c.byUser);
router.get('/by-entity/:entityType/:entityId', c.byEntity);
router.get('/by-unidad/:unidadId', c.byUnidad);
router.get('/export', c.export);

export default router;
