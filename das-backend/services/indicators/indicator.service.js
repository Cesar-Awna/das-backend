import connectMongoDB from '../../libs/mongoose.js';
import Indicator from '../../models/Indicator.js';
import IndicatorMeasurement from '../../models/IndicatorMeasurement.js';

export default class IndicatorService {
    constructor() {
        connectMongoDB();
    }

    list = async (q = {}) => {
        try {
            const query = {};
            if (q.vigente !== undefined) query.vigente = q.vigente;
            if (q.ambitoId) query.ambitoId = q.ambitoId;
            if (q.organizationId) query.organizationId = q.organizationId;
            const items = await Indicator.find(query).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            console.error('❌ Servicio - Error al listar indicadores:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    create = async (body) => {
        try {
            const ind = await Indicator.create(body);
            return { success: true, message: 'Indicador creado', data: ind.toObject() };
        } catch (error) {
            console.error('❌ Servicio - Error al crear indicador:', error);
            return { success: false, message: error.message || 'Error al crear indicador' };
        }
    };

    getById = async (id) => {
        try {
            const ind = await Indicator.findById(id).lean();
            if (!ind) return { success: false, message: 'Indicador no encontrado' };
            return { success: true, message: 'OK', data: ind };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    update = async (id, body) => {
        try {
            const ind = await Indicator.findByIdAndUpdate(id, body, { new: true }).lean();
            if (!ind) return { success: false, message: 'Indicador no encontrado' };
            return { success: true, message: 'Indicador actualizado', data: ind };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    delete = async (id) => {
        try {
            const ind = await Indicator.findByIdAndUpdate(id, { vigente: false }, { new: true }).lean();
            if (!ind) return { success: false, message: 'Indicador no encontrado' };
            return { success: true, message: 'Indicador desactivado', data: ind };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    createMeasurement = async (indicatorId, body, userId) => {
        try {
            const ind = await Indicator.findById(indicatorId);
            if (!ind) return { success: false, message: 'Indicador no encontrado' };
            const { numerador, denominador } = body;
            if (denominador === 0) return { success: false, message: 'Denominador no puede ser 0' };
            const resultado = numerador / denominador;
            const porcentajeCumplimiento = resultado * 100;
            const cumple = porcentajeCumplimiento >= ind.umbralCumplimiento;
            const measurement = await IndicatorMeasurement.create({
                ...body,
                indicatorId,
                resultado,
                porcentajeCumplimiento,
                cumple,
                registradoPor: userId,
            });
            return { success: true, message: 'Medición registrada', data: measurement.toObject() };
        } catch (error) {
            console.error('❌ Servicio - Error al crear medición:', error);
            return { success: false, message: error.message || 'Error al crear medición' };
        }
    };

    listMeasurements = async (indicatorId, { periodo } = {}) => {
        try {
            const query = { indicatorId };
            if (periodo) query.periodo = periodo;
            const measurements = await IndicatorMeasurement.find(query).sort({ fechaMedicion: -1 }).lean();
            return { success: true, message: 'OK', data: measurements };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    updateMeasurement = async (indicatorId, measurementId, body, userId) => {
        try {
            const ind = await Indicator.findById(indicatorId);
            if (!ind) return { success: false, message: 'Indicador no encontrado' };
            const update = { ...body, modificadoPor: userId };
            if (body.numerador !== undefined && body.denominador !== undefined) {
                if (body.denominador === 0) return { success: false, message: 'Denominador no puede ser 0' };
                update.resultado = body.numerador / body.denominador;
                update.porcentajeCumplimiento = update.resultado * 100;
                update.cumple = update.porcentajeCumplimiento >= ind.umbralCumplimiento;
            }
            const measurement = await IndicatorMeasurement.findByIdAndUpdate(measurementId, update, { new: true }).lean();
            if (!measurement) return { success: false, message: 'Medición no encontrada' };
            return { success: true, message: 'Medición actualizada', data: measurement };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    history = async (indicatorId) => {
        try {
            const measurements = await IndicatorMeasurement.find({ indicatorId }).sort({ fechaMedicion: 1 }).lean();
            return { success: true, message: 'OK', data: measurements };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    chart = async (indicatorId) => {
        try {
            const measurements = await IndicatorMeasurement.find({ indicatorId }).sort({ fechaMedicion: 1 }).lean();
            const series = measurements.map((m) => ({
                fecha: m.fechaMedicion,
                porcentajeCumplimiento: m.porcentajeCumplimiento,
                cumple: m.cumple,
                pautaSupervisionId: m.pautaSupervisionId,
            }));
            return { success: true, message: 'OK', data: series };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    assign = async (indicatorId, { responsableId, suplenteId, organizationId }) => {
        try {
            const update = {};
            if (responsableId) update.responsableId = responsableId;
            if (suplenteId) update.suplenteId = suplenteId;
            if (organizationId) update.organizationId = organizationId;
            const ind = await Indicator.findByIdAndUpdate(indicatorId, update, { new: true }).lean();
            if (!ind) return { success: false, message: 'Indicador no encontrado' };
            return { success: true, message: 'Asignación actualizada', data: ind };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    byAmbito = async (ambitoId) => {
        try {
            const items = await Indicator.find({ ambitoId, vigente: true }).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    byUnidad = async (organizationId) => {
        try {
            const items = await Indicator.find({ organizationId, vigente: true }).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };
}
