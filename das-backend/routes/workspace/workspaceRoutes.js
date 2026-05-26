import express from 'express';
import WorkspaceController from '../../controllers/workspace/workspace.controller.js';
import { authMiddleware } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new WorkspaceController();

router.use(authMiddleware);

router.get('/pendientes', c.pendientes);
router.post('/indicadores-y-pautas', c.cargarIndicadorYPauta);
router.get('/search', c.searchGlobal);
router.get('/search/documents', c.searchDocuments);
router.get('/sample-size', c.sampleSize);
router.get('/dashboard/kpis', c.dashboardKpis);
router.get('/dashboard/mediciones-consolidadas', c.medicionesConsolidadas);
router.get('/dashboard/respaldos', c.respaldos);

export default router;
