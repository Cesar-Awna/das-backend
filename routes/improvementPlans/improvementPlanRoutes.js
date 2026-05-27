import express from 'express';
import ImprovementPlanController from '../../controllers/improvementPlans/improvementPlan.controller.js';
import { authMiddleware } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new ImprovementPlanController();

router.use(authMiddleware);

router.post('/', c.create);
router.get('/', c.list);
router.get('/by-event/:eventId', c.getByEvent);
router.get('/:id', c.getById);
router.get('/:id/avance', c.avance);
router.post('/:id/actividades', c.addActividad);
router.put('/:id/actividades/:actividadId', c.updateActividad);
router.post('/:id/actividades/:actividadId/evidencia', c.addEvidencia);

export default router;
