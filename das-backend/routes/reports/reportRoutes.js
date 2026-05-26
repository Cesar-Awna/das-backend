import express from 'express';
import ReportController from '../../controllers/reports/report.controller.js';
import { authMiddleware } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new ReportController();

router.use(authMiddleware);

router.get('/acreditacion/pdf', c.acreditacionPdf);
router.get('/eventos/pdf', c.eventosPdf);
router.get('/ntb/pdf', c.ntbPdf);
router.get('/documental/pdf', c.documentalPdf);
router.post('/custom', c.custom);

export default router;
