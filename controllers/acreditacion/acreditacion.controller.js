import AcreditacionService from '../../services/acreditacion/acreditacion.service.js';

const acreditacionService = new AcreditacionService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class AcreditacionController {
    listPautas = handle((req) => acreditacionService.listPautas(req.query));
    createPauta = handle((req) => acreditacionService.createPauta(req.body, req.userId));
    getPautaById = handle((req) => acreditacionService.getPautaById(req.params.id));
    updatePauta = handle((req) => acreditacionService.updatePauta(req.params.id, req.body));
    getCaracteristicas = handle((req) => acreditacionService.getCaracteristicas(req.params.id));
    getAmbitos = handle((req) => acreditacionService.getAmbitos());
    createAutoevaluacion = handle((req) =>
        acreditacionService.createAutoevaluacion(req.params.id, req.body, req.userId)
    );
    updateAutoevaluacion = handle((req) =>
        acreditacionService.updateAutoevaluacion(req.params.id, req.body, req.userId)
    );
    getAutoevaluacion = handle((req) => acreditacionService.getAutoevaluacion(req.params.id));
    monitoreo = handle((req) => acreditacionService.monitoreo(req.query));
    monitoreoObligatorias = handle((req) => acreditacionService.monitoreo({ obligatoria: true }));
    monitoreoNoObligatorias = handle((req) => acreditacionService.monitoreo({ obligatoria: false }));
    consolidado = handle((req) => acreditacionService.consolidado());
    comparar = handle((req) => acreditacionService.comparar(req.query));
    configurarAlarma = handle((req) =>
        acreditacionService.configurarAlarma(req.body.indicatorId, req.body.alarma)
    );
    informePlanMejora = handle((req) => acreditacionService.informePlanMejora());
}
