import express from 'express';
import AcreditacionController from '../../controllers/acreditacion/acreditacion.controller.js';
import { authMiddleware } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new AcreditacionController();

router.use(authMiddleware);

router.get('/pautas', c.listPautas);
router.post('/pautas', c.createPauta);
router.get('/pautas/:id', c.getPautaById);
router.put('/pautas/:id', c.updatePauta);
router.get('/pautas/:id/caracteristicas', c.getCaracteristicas);
router.post('/pautas/:id/autoevaluacion', c.createAutoevaluacion);
router.put('/autoevaluaciones/:id', c.updateAutoevaluacion);
router.get('/autoevaluaciones/:id', c.getAutoevaluacion);
router.get('/ambitos', c.getAmbitos);

router.get('/monitoreo', c.monitoreo);
router.get('/monitoreo/obligatorias', c.monitoreoObligatorias);
router.get('/monitoreo/no-obligatorias', c.monitoreoNoObligatorias);
router.get('/consolidado', c.consolidado);
router.get('/comparar', c.comparar);
router.post('/alarmas/configurar', c.configurarAlarma);
router.get('/informes/plan-mejora', c.informePlanMejora);

export default router;
