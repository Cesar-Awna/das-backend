import EventService from '../../services/events/event.service.js';

const eventService = new EventService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class EventController {
    // Catálogos
    listAmbitos = handle(() => eventService.listCatalog('ambito'));
    createAmbito = handle((req) => eventService.createCatalog('ambito', req.body));
    updateAmbito = handle((req) => eventService.updateCatalog(req.params.id, req.body));
    deleteAmbito = handle((req) => eventService.deleteCatalog(req.params.id));

    listTipos = handle(() => eventService.listCatalog('tipo_evento'));
    createTipo = handle((req) => eventService.createCatalog('tipo_evento', req.body));

    listMedidas = handle(() => eventService.listCatalog('medida_preventiva'));
    createMedida = handle((req) => eventService.createCatalog('medida_preventiva', req.body));

    // Formularios
    listForms = handle(() => eventService.listForms());
    createForm = handle((req) => eventService.createForm(req.body));
    updateForm = handle((req) => eventService.updateForm(req.params.id, req.body));

    // Responsables y notificadores
    listResponsables = handle(() => eventService.listResponsables());
    asignarResponsable = handle((req) => eventService.asignarResponsable(req.body));
    asignarNotificadores = handle((req) => eventService.asignarNotificadores(req.body));

    // Eventos
    create = handle((req) => eventService.create(req.body, req.userId));
    list = handle((req) => eventService.list(req.query));
    getById = handle((req) => eventService.getById(req.params.id));
    verificar = handle((req) => eventService.verificar(req.params.id, req.body, req.userId));
    clasificar = handle((req) => eventService.clasificar(req.params.id, req.body));
    addCausas = handle((req) => eventService.addCausas(req.params.id, req.body.causasDetonantes));
    cerrar = handle((req) => eventService.cerrar(req.params.id, req.userId));
    resumen = handle((req) => eventService.resumen(req.params.id));
    enviarResumen = handle((req) => eventService.enviarResumen(req.params.id, req.body));

    // Estadísticas
    estadisticas = handle(() => eventService.estadisticas());
    estadisticasPorTipo = handle(() => eventService.estadisticasPorTipo());
    estadisticasPorUnidad = handle(() => eventService.estadisticasPorUnidad());
    estadisticasPorPeriodo = handle((req) => eventService.estadisticasPorPeriodo(req.query));

    notificacionRapida = handle((req) => eventService.notificacionRapida(req.body, req.userId));
}
