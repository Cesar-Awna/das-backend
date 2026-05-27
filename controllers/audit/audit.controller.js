import AuditService from '../../services/audit/audit.service.js';

const service = new AuditService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class AuditController {
    list = handle((req) => service.list(req.query));
    byUser = handle((req) => service.byUser(req.params.userId));
    byEntity = handle((req) => service.byEntity(req.params.entityType, req.params.entityId));
    byUnidad = handle((req) => service.byUnidad(req.params.unidadId));
    export = handle((req) => service.export(req.query));
}
