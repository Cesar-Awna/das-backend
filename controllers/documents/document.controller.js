import DocumentService from '../../services/documents/document.service.js';

const documentService = new DocumentService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class DocumentController {
    list = handle((req) => documentService.list(req.query));
    create = handle((req) => documentService.create(req.body));
    getById = handle((req) => documentService.getById(req.params.id));
    update = handle((req) => documentService.update(req.params.id, req.body));
    delete = handle((req) => documentService.delete(req.params.id));
    preview = handle((req) => documentService.preview(req.params.id));
    download = handle((req) => documentService.download(req.params.id));
    createVersion = handle((req) => documentService.createVersion(req.params.id, req.body, req.userId));
    listVersions = handle((req) => documentService.listVersions(req.params.id));
    getVersion = handle((req) => documentService.getVersion(req.params.id, req.params.versionId));
    versionByPeriod = handle((req) => documentService.versionByPeriod(req.params.id, req.query.fecha));
    archive = handle((req) => documentService.archive(req.params.id));
    restore = handle((req) => documentService.restore(req.params.id));
    expiring = handle((req) => documentService.expiring(req.query));
    expired = handle((req) => documentService.expired());
    addCategorias = handle((req) => documentService.addCategorias(req.params.id, req.body.categorias));
    listCategorias = handle(() => documentService.listCategorias());
    listHistoricos = handle(() => documentService.listHistoricos());
}
