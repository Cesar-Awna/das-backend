import express from 'express';
import IndicatorController from '../../controllers/indicators/indicator.controller.js';
import { authMiddleware } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new IndicatorController();

router.use(authMiddleware);

router.get('/', c.list);
router.post('/', c.create);
router.get('/by-ambito/:ambitoId', c.byAmbito);
router.get('/by-unidad/:unidadId', c.byUnidad);
router.get('/:id', c.getById);
router.put('/:id', c.update);
router.delete('/:id', c.delete);
router.post('/:id/measurements', c.createMeasurement);
router.get('/:id/measurements', c.listMeasurements);
router.put('/:id/measurements/:measurementId', c.updateMeasurement);
router.get('/:id/history', c.history);
router.get('/:id/chart', c.chart);
router.post('/:id/assign', c.assign);

export default router;
