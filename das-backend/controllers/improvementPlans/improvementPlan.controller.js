import ImprovementPlanService from '../../services/improvementPlans/improvementPlan.service.js';

const service = new ImprovementPlanService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class ImprovementPlanController {
    create = handle((req) => service.create(req.body, req.userId));
    list = handle((req) => service.list(req.query));
    getById = handle((req) => service.getById(req.params.id));
    getByEvent = handle((req) => service.getByEvent(req.params.eventId));
    addActividad = handle((req) => service.addActividad(req.params.id, req.body));
    updateActividad = handle((req) =>
        service.updateActividad(req.params.id, req.params.actividadId, req.body)
    );
    addEvidencia = handle((req) =>
        service.addEvidencia(req.params.id, req.params.actividadId, req.body.fileId)
    );
    avance = handle((req) => service.avance(req.params.id));
}
