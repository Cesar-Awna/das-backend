import connectMongoDB from '../../libs/mongoose.js';
import SupervisionPauta from '../../models/SupervisionPauta.js';
import SupervisionAplicacion from '../../models/SupervisionAplicacion.js';

export default class SupervisionService {
    constructor() {
        connectMongoDB();
    }

    list = async (q = {}) => {
        try {
            const query = {};
            if (q.vigente !== undefined) query.vigente = q.vigente;
            if (q.responsableId) query.responsableId = q.responsableId;
            const items = await SupervisionPauta.find(query).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    create = async (body) => {
        try {
            const p = await SupervisionPauta.create(body);
            return { success: true, message: 'Pauta de supervisión creada', data: p.toObject() };
        } catch (error) {
            return { success: false, message: error.message || 'Error al crear pauta' };
        }
    };

    getById = async (id) => {
        try {
            const p = await SupervisionPauta.findById(id).lean();
            if (!p) return { success: false, message: 'Pauta no encontrada' };
            return { success: true, message: 'OK', data: p };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    update = async (id, body, userId) => {
        try {
            const p = await SupervisionPauta.findByIdAndUpdate(
                id,
                {
                    ...body,
                    $push: {
                        historialModificaciones: {
                            fecha: new Date(),
                            usuarioId: userId,
                            cambios: JSON.stringify(Object.keys(body)),
                        },
                    },
                },
                { new: true }
            ).lean();
            if (!p) return { success: false, message: 'Pauta no encontrada' };
            return { success: true, message: 'Pauta actualizada', data: p };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    updateVigencia = async (id, { vigente, fechaInicioVigencia, fechaFinVigencia }) => {
        try {
            const update = {};
            if (typeof vigente !== 'undefined') update.vigente = vigente;
            if (fechaInicioVigencia) update.fechaInicioVigencia = fechaInicioVigencia;
            if (fechaFinVigencia) update.fechaFinVigencia = fechaFinVigencia;
            const p = await SupervisionPauta.findByIdAndUpdate(id, update, { new: true }).lean();
            if (!p) return { success: false, message: 'Pauta no encontrada' };
            return { success: true, message: 'Vigencia actualizada', data: p };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    asignarResponsables = async (id, { responsableId, suplenteId }) => {
        try {
            const p = await SupervisionPauta.findByIdAndUpdate(
                id,
                { responsableId, suplenteId },
                { new: true }
            ).lean();
            if (!p) return { success: false, message: 'Pauta no encontrada' };
            return { success: true, message: 'Responsables asignados', data: p };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    planificar = async (id, planificacion) => {
        try {
            const p = await SupervisionPauta.findByIdAndUpdate(
                id,
                { $push: { planificaciones: planificacion } },
                { new: true }
            ).lean();
            if (!p) return { success: false, message: 'Pauta no encontrada' };
            return { success: true, message: 'Planificación agregada', data: p };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    aplicar = async (id, body, userId) => {
        try {
            const total = body.evaluacionCriterios?.length || 0;
            const cumplen = body.evaluacionCriterios?.filter((e) => e.cumple).length || 0;
            const porcentaje = total > 0 ? (cumplen / total) * 100 : 0;
            const ap = await SupervisionAplicacion.create({
                ...body,
                pautaId: id,
                porcentajeCumplimiento: porcentaje,
                aplicadoPor: userId,
            });
            return { success: true, message: 'Pauta aplicada', data: ap.toObject() };
        } catch (error) {
            return { success: false, message: error.message || 'Error al aplicar pauta' };
        }
    };

    listAplicaciones = async (id) => {
        try {
            const items = await SupervisionAplicacion.find({ pautaId: id })
                .sort({ fechaAplicacion: -1 })
                .lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    search = async ({ q } = {}) => {
        try {
            if (!q) return { success: true, message: 'OK', data: [] };
            const items = await SupervisionPauta.find({
                $or: [
                    { nombre: { $regex: q, $options: 'i' } },
                    { codigo: { $regex: q, $options: 'i' } },
                    { descripcion: { $regex: q, $options: 'i' } },
                ],
            }).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    consolidado = async () => {
        try {
            const aplicaciones = await SupervisionAplicacion.find({ estado: 'finalizada' }).lean();
            return { success: true, message: 'OK', data: aplicaciones };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    cumplimiento = async () => {
        try {
            const aplicaciones = await SupervisionAplicacion.find().lean();
            const grouped = {};
            aplicaciones.forEach((a) => {
                const k = String(a.pautaId);
                if (!grouped[k]) grouped[k] = { pautaId: a.pautaId, count: 0, total: 0 };
                grouped[k].count += 1;
                grouped[k].total += a.porcentajeCumplimiento || 0;
            });
            const result = Object.values(grouped).map((g) => ({
                ...g,
                promedio: g.count > 0 ? g.total / g.count : 0,
            }));
            return { success: true, message: 'OK', data: result };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    graficaIndicadores = async (id) => {
        try {
            const pauta = await SupervisionPauta.findById(id).populate('indicatorIds').lean();
            if (!pauta) return { success: false, message: 'Pauta no encontrada' };
            const aplicaciones = await SupervisionAplicacion.find({ pautaId: id })
                .sort({ fechaAplicacion: 1 })
                .lean();
            return { success: true, message: 'OK', data: { pauta, aplicaciones } };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };
}
