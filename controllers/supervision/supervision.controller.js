import SupervisionService from '../../services/supervision/supervision.service.js';

const supervisionService = new SupervisionService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class SupervisionController {
    list = handle((req) => supervisionService.list(req.query));
    create = handle((req) => supervisionService.create(req.body));
    getById = handle((req) => supervisionService.getById(req.params.id));
    update = handle((req) => supervisionService.update(req.params.id, req.body, req.userId));
    updateVigencia = handle((req) => supervisionService.updateVigencia(req.params.id, req.body));
    asignarResponsables = handle((req) => supervisionService.asignarResponsables(req.params.id, req.body));
    planificar = handle((req) => supervisionService.planificar(req.params.id, req.body));
    aplicar = handle((req) => supervisionService.aplicar(req.params.id, req.body, req.userId));
    listAplicaciones = handle((req) => supervisionService.listAplicaciones(req.params.id));
    search = handle((req) => supervisionService.search(req.query));
    consolidado = handle(() => supervisionService.consolidado());
    cumplimiento = handle(() => supervisionService.cumplimiento());
    graficaIndicadores = handle((req) => supervisionService.graficaIndicadores(req.params.id));
}
