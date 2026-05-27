import express from 'express';
import SupervisionController from '../../controllers/supervision/supervision.controller.js';
import { authMiddleware } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new SupervisionController();

router.use(authMiddleware);

router.get('/', c.list);
router.post('/', c.create);
router.get('/search', c.search);
router.get('/consolidado', c.consolidado);
router.get('/cumplimiento', c.cumplimiento);
router.get('/:id', c.getById);
router.put('/:id', c.update);
router.put('/:id/vigencia', c.updateVigencia);
router.post('/:id/responsables', c.asignarResponsables);
router.post('/:id/planificar', c.planificar);
router.post('/:id/apply', c.aplicar);
router.get('/:id/aplicaciones', c.listAplicaciones);
router.get('/:id/grafica-indicadores', c.graficaIndicadores);

export default router;
