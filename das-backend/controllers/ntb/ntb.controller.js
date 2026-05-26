import NtbService from '../../services/ntb/ntb.service.js';

const ntbService = new NtbService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class NtbController {
    listPautas = handle(() => ntbService.listPautas());
    createPauta = handle((req) => ntbService.createPauta(req.body));
    getPautaById = handle((req) => ntbService.getPautaById(req.params.id));
    createEvaluacion = handle((req) => ntbService.createEvaluacion(req.body, req.userId));
    getEvaluacionById = handle((req) => ntbService.getEvaluacionById(req.params.id));
    updateEvaluacion = handle((req) => ntbService.updateEvaluacion(req.params.id, req.body, req.userId));
    finalizarEvaluacion = handle((req) => ntbService.finalizarEvaluacion(req.params.id, req.userId));
    informeValorizado = handle((req) => ntbService.informeValorizado(req.params.id));
    informeEvaluacion = handle((req) => ntbService.informeEvaluacion(req.params.id));
    historialUnidad = handle((req) => ntbService.historialUnidad(req.params.unidadId));
    historialCambios = handle((req) => ntbService.historialCambios(req.params.id));
}
