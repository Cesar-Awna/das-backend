import WorkspaceService from '../../services/workspace/workspace.service.js';

const service = new WorkspaceService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class WorkspaceController {
    pendientes = handle((req) => service.pendientes(req.userId));
    cargarIndicadorYPauta = handle((req) => service.cargarIndicadorYPauta(req.body, req.userId));
    searchGlobal = handle((req) => service.searchGlobal(req.query));
    searchDocuments = handle((req) => service.searchDocuments(req.query));
    sampleSize = handle((req) => service.sampleSize(req.query));
    dashboardKpis = handle(() => service.dashboardKpis());
    medicionesConsolidadas = handle(() => service.medicionesConsolidadas());
    respaldos = handle(() => service.respaldos());
}
