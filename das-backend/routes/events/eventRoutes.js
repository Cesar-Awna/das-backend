import express from 'express';
import EventController from '../../controllers/events/event.controller.js';
import { authMiddleware, adminOnly } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new EventController();

router.use(authMiddleware);

// Catálogos
router.get('/catalogos/ambitos', c.listAmbitos);
router.post('/catalogos/ambitos', adminOnly, c.createAmbito);
router.put('/catalogos/ambitos/:id', adminOnly, c.updateAmbito);
router.delete('/catalogos/ambitos/:id', adminOnly, c.deleteAmbito);

router.get('/catalogos/tipos', c.listTipos);
router.post('/catalogos/tipos', adminOnly, c.createTipo);

router.get('/catalogos/medidas', c.listMedidas);
router.post('/catalogos/medidas', adminOnly, c.createMedida);

// Formularios
router.get('/formularios', c.listForms);
router.post('/formularios', adminOnly, c.createForm);
router.put('/formularios/:id', adminOnly, c.updateForm);

// Responsables y notificadores
router.get('/responsables', c.listResponsables);
router.post('/responsables/asignar', adminOnly, c.asignarResponsable);
router.post('/notificadores/asignar', adminOnly, c.asignarNotificadores);

// Estadísticas
router.get('/estadisticas', c.estadisticas);
router.get('/estadisticas/por-tipo', c.estadisticasPorTipo);
router.get('/estadisticas/por-unidad', c.estadisticasPorUnidad);
router.get('/estadisticas/por-periodo', c.estadisticasPorPeriodo);

// Notificación rápida
router.post('/notificacion-rapida', c.notificacionRapida);

// Eventos (CRUD principal)
router.post('/', c.create);
router.get('/', c.list);
router.get('/:id', c.getById);
router.put('/:id/verificar', c.verificar);
router.put('/:id/clasificar', c.clasificar);
router.post('/:id/causas', c.addCausas);
router.post('/:id/cerrar', c.cerrar);
router.get('/:id/resumen', c.resumen);
router.post('/:id/enviar-resumen', c.enviarResumen);

export default router;
