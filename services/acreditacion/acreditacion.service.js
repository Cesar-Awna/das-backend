import connectMongoDB from '../../libs/mongoose.js';
import AcreditacionPauta from '../../models/AcreditacionPauta.js';
import AcreditacionAutoevaluacion from '../../models/AcreditacionAutoevaluacion.js';
import Indicator from '../../models/Indicator.js';
import IndicatorMeasurement from '../../models/IndicatorMeasurement.js';

export default class AcreditacionService {
    constructor() {
        connectMongoDB();
    }

    listPautas = async ({ vigente, periodo } = {}) => {
        try {
            const query = {};
            if (typeof vigente !== 'undefined') query.vigente = vigente;
            if (periodo) query.periodo = periodo;
            const pautas = await AcreditacionPauta.find(query).lean();
            return { success: true, message: 'OK', data: pautas };
        } catch (error) {
            console.error('❌ Servicio - Error al listar pautas:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    createPauta = async (body, userId) => {
        try {
            const pauta = await AcreditacionPauta.create({ ...body, creadoPor: userId });
            return { success: true, message: 'Pauta creada', data: pauta.toObject() };
        } catch (error) {
            console.error('❌ Servicio - Error al crear pauta:', error);
            return { success: false, message: error.message || 'Error al crear pauta' };
        }
    };

    getPautaById = async (id) => {
        try {
            const pauta = await AcreditacionPauta.findById(id).lean();
            if (!pauta) return { success: false, message: 'Pauta no encontrada' };
            return { success: true, message: 'OK', data: pauta };
        } catch (error) {
            console.error('❌ Servicio - Error al obtener pauta:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    updatePauta = async (id, body) => {
        try {
            const pauta = await AcreditacionPauta.findByIdAndUpdate(id, body, { new: true }).lean();
            if (!pauta) return { success: false, message: 'Pauta no encontrada' };
            return { success: true, message: 'Pauta actualizada', data: pauta };
        } catch (error) {
            console.error('❌ Servicio - Error al actualizar pauta:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    getCaracteristicas = async (pautaId) => {
        try {
            const pauta = await AcreditacionPauta.findById(pautaId).lean();
            if (!pauta) return { success: false, message: 'Pauta no encontrada' };
            const caracteristicas = pauta.ambitos.flatMap((a) =>
                a.caracteristicas.map((c) => ({ ...c, ambitoId: a._id, ambitoNombre: a.nombre }))
            );
            return { success: true, message: 'OK', data: caracteristicas };
        } catch (error) {
            console.error('❌ Servicio - Error al obtener características:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    getAmbitos = async () => {
        try {
            const pautas = await AcreditacionPauta.find({ vigente: true }).lean();
            const ambitos = pautas.flatMap((p) => p.ambitos.map((a) => ({ pautaId: p._id, ...a })));
            return { success: true, message: 'OK', data: ambitos };
        } catch (error) {
            console.error('❌ Servicio - Error al obtener ámbitos:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    createAutoevaluacion = async (pautaId, body, userId) => {
        try {
            const ae = await AcreditacionAutoevaluacion.create({ ...body, pautaId, iniciadoPor: userId });
            return { success: true, message: 'Autoevaluación creada', data: ae.toObject() };
        } catch (error) {
            console.error('❌ Servicio - Error al crear autoevaluación:', error);
            return { success: false, message: error.message || 'Error al crear autoevaluación' };
        }
    };

    updateAutoevaluacion = async (id, body, userId) => {
        try {
            const update = { ...body };
            if (body.estado === 'finalizada') {
                update.finalizadoPor = userId;
                update.finalizadoEn = new Date();
            }
            if (body.evaluaciones) {
                const total = body.evaluaciones.length;
                const cumplen = body.evaluaciones.filter((e) => e.estado === 'cumple').length;
                const aplicables = body.evaluaciones.filter((e) => e.estado !== 'no_aplica').length;
                update.porcentajeCumplimiento = aplicables > 0 ? (cumplen / aplicables) * 100 : 0;
            }
            const ae = await AcreditacionAutoevaluacion.findByIdAndUpdate(id, update, { new: true }).lean();
            if (!ae) return { success: false, message: 'Autoevaluación no encontrada' };
            return { success: true, message: 'Autoevaluación actualizada', data: ae };
        } catch (error) {
            console.error('❌ Servicio - Error al actualizar autoevaluación:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    getAutoevaluacion = async (id) => {
        try {
            const ae = await AcreditacionAutoevaluacion.findById(id).lean();
            if (!ae) return { success: false, message: 'Autoevaluación no encontrada' };
            return { success: true, message: 'OK', data: ae };
        } catch (error) {
            console.error('❌ Servicio - Error al obtener autoevaluación:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    monitoreo = async ({ obligatoria } = {}) => {
        try {
            const query = { vigente: true };
            if (typeof obligatoria !== 'undefined') query.obligatorio = obligatoria;
            const indicators = await Indicator.find(query).lean();
            const measurements = await IndicatorMeasurement.find({
                indicatorId: { $in: indicators.map((i) => i._id) },
            }).sort({ fechaMedicion: -1 }).lean();

            const data = indicators.map((ind) => {
                const lastMeasure = measurements.find((m) => String(m.indicatorId) === String(ind._id));
                return {
                    indicator: ind,
                    ultimaMedicion: lastMeasure || null,
                    cumple: lastMeasure ? lastMeasure.cumple : null,
                };
            });

            return { success: true, message: 'OK', data };
        } catch (error) {
            console.error('❌ Servicio - Error en monitoreo:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    consolidado = async () => {
        try {
            const pautas = await AcreditacionAutoevaluacion.find({ estado: 'finalizada' }).lean();
            const consolidado = pautas.map((p) => ({
                autoevaluacionId: p._id,
                organizationId: p.organizationId,
                periodo: p.periodo,
                porcentajeCumplimiento: p.porcentajeCumplimiento,
            }));
            return { success: true, message: 'OK', data: consolidado };
        } catch (error) {
            console.error('❌ Servicio - Error en consolidado:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    comparar = async ({ periodo1, periodo2, organizationId }) => {
        try {
            const query = { estado: 'finalizada' };
            if (organizationId) query.organizationId = organizationId;
            const [ev1, ev2] = await Promise.all([
                AcreditacionAutoevaluacion.find({ ...query, periodo: periodo1 }).lean(),
                AcreditacionAutoevaluacion.find({ ...query, periodo: periodo2 }).lean(),
            ]);
            return { success: true, message: 'OK', data: { [periodo1]: ev1, [periodo2]: ev2 } };
        } catch (error) {
            console.error('❌ Servicio - Error al comparar periodos:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    configurarAlarma = async (indicatorId, body) => {
        try {
            const ind = await Indicator.findByIdAndUpdate(
                indicatorId,
                { alarmaRetraso: body },
                { new: true }
            ).lean();
            if (!ind) return { success: false, message: 'Indicador no encontrado' };
            return { success: true, message: 'Alarma configurada', data: ind };
        } catch (error) {
            console.error('❌ Servicio - Error al configurar alarma:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    informePlanMejora = async () => {
        try {
            const indicadoresNoCumplen = await IndicatorMeasurement.find({ cumple: false })
                .populate('indicatorId')
                .lean();
            return { success: true, message: 'OK', data: indicadoresNoCumplen };
        } catch (error) {
            console.error('❌ Servicio - Error en informe plan mejora:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };
}
