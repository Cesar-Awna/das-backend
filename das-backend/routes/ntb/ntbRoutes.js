import express from 'express';
import NtbController from '../../controllers/ntb/ntb.controller.js';
import { authMiddleware } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new NtbController();

router.use(authMiddleware);

router.get('/pautas', c.listPautas);
router.post('/pautas', c.createPauta);
router.get('/pautas/:id', c.getPautaById);
router.post('/evaluaciones', c.createEvaluacion);
router.get('/evaluaciones/:id', c.getEvaluacionById);
router.put('/evaluaciones/:id', c.updateEvaluacion);
router.post('/evaluaciones/:id/finalizar', c.finalizarEvaluacion);
router.get('/evaluaciones/:id/informe-valorizado', c.informeValorizado);
router.get('/evaluaciones/:id/informe-evaluacion', c.informeEvaluacion);
router.get('/historial/unidad/:unidadId', c.historialUnidad);
router.get('/historial/:id/cambios', c.historialCambios);

export default router;
