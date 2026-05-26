import IndicatorService from '../../services/indicators/indicator.service.js';

const indicatorService = new IndicatorService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class IndicatorController {
    list = handle((req) => indicatorService.list(req.query));
    create = handle((req) => indicatorService.create(req.body));
    getById = handle((req) => indicatorService.getById(req.params.id));
    update = handle((req) => indicatorService.update(req.params.id, req.body));
    delete = handle((req) => indicatorService.delete(req.params.id));
    createMeasurement = handle((req) =>
        indicatorService.createMeasurement(req.params.id, req.body, req.userId)
    );
    listMeasurements = handle((req) => indicatorService.listMeasurements(req.params.id, req.query));
    updateMeasurement = handle((req) =>
        indicatorService.updateMeasurement(req.params.id, req.params.measurementId, req.body, req.userId)
    );
    history = handle((req) => indicatorService.history(req.params.id));
    chart = handle((req) => indicatorService.chart(req.params.id));
    assign = handle((req) => indicatorService.assign(req.params.id, req.body));
    byAmbito = handle((req) => indicatorService.byAmbito(req.params.ambitoId));
    byUnidad = handle((req) => indicatorService.byUnidad(req.params.unidadId));
}
