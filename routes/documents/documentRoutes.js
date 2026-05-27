import express from 'express';
import DocumentController from '../../controllers/documents/document.controller.js';
import { authMiddleware, adminOnly } from '../../utils/authMiddleware.js';

const router = express.Router();
const c = new DocumentController();

router.use(authMiddleware);

router.get('/', c.list);
router.post('/', c.create);
router.get('/expiring', c.expiring);
router.get('/expired', c.expired);
router.get('/categorias', c.listCategorias);
router.get('/historicos', adminOnly, c.listHistoricos);
router.get('/:id', c.getById);
router.put('/:id', c.update);
router.delete('/:id', c.delete);
router.get('/:id/preview', c.preview);
router.get('/:id/download', c.download);
router.post('/:id/versions', c.createVersion);
router.get('/:id/versions', c.listVersions);
router.get('/:id/versions/:versionId', c.getVersion);
router.get('/:id/version-by-period', c.versionByPeriod);
router.post('/:id/archive', c.archive);
router.post('/:id/restore', adminOnly, c.restore);
router.post('/:id/categorias', c.addCategorias);

export default router;
