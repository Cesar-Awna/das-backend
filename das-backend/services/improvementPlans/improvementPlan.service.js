import connectMongoDB from '../../libs/mongoose.js';
import ImprovementPlan from '../../models/ImprovementPlan.js';
import AdverseEvent from '../../models/AdverseEvent.js';

export default class ImprovementPlanService {
    constructor() {
        connectMongoDB();
    }

    create = async (body, userId) => {
        try {
            const plan = await ImprovementPlan.create({ ...body, creadoPor: userId });
            if (body.origen === 'evento_adverso' && body.origenId) {
                await AdverseEvent.findByIdAndUpdate(body.origenId, { improvementPlanId: plan._id });
            }
            return { success: true, message: 'Plan de mejora creado', data: plan.toObject() };
        } catch (error) {
            return { success: false, message: error.message || 'Error al crear plan' };
        }
    };

    list = async (q = {}) => {
        try {
            const query = {};
            if (q.origen) query.origen = q.origen;
            if (q.estado) query.estado = q.estado;
            const items = await ImprovementPlan.find(query).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    getById = async (id) => {
        try {
            const item = await ImprovementPlan.findById(id).lean();
            if (!item) return { success: false, message: 'Plan no encontrado' };
            return { success: true, message: 'OK', data: item };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    getByEvent = async (eventId) => {
        try {
            const item = await ImprovementPlan.findOne({ origen: 'evento_adverso', origenId: eventId }).lean();
            if (!item) return { success: false, message: 'Plan no encontrado' };
            return { success: true, message: 'OK', data: item };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    addActividad = async (id, actividad) => {
        try {
            const plan = await ImprovementPlan.findByIdAndUpdate(
                id,
                { $push: { actividades: actividad } },
                { new: true }
            ).lean();
            if (!plan) return { success: false, message: 'Plan no encontrado' };
            return { success: true, message: 'Actividad agregada', data: plan };
        } catch (error) {
            return { success: false, message: error.message || 'Error inesperado' };
        }
    };

    updateActividad = async (id, actividadId, body) => {
        try {
            const plan = await ImprovementPlan.findById(id);
            if (!plan) return { success: false, message: 'Plan no encontrado' };
            const actividad = plan.actividades.id(actividadId);
            if (!actividad) return { success: false, message: 'Actividad no encontrada' };
            Object.assign(actividad, body);
            if (body.estado === 'completada' && !actividad.fechaCompletada) {
                actividad.fechaCompletada = new Date();
            }
            // Recalcular avance
            const total = plan.actividades.length;
            const completadas = plan.actividades.filter((a) => a.estado === 'completada').length;
            plan.porcentajeAvance = total > 0 ? (completadas / total) * 100 : 0;
            if (plan.porcentajeAvance === 100) plan.estado = 'cerrado';
            await plan.save();
            return { success: true, message: 'Actividad actualizada', data: plan.toObject() };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    addEvidencia = async (id, actividadId, fileId) => {
        try {
            const plan = await ImprovementPlan.findById(id);
            if (!plan) return { success: false, message: 'Plan no encontrado' };
            const actividad = plan.actividades.id(actividadId);
            if (!actividad) return { success: false, message: 'Actividad no encontrada' };
            actividad.evidencias.push(fileId);
            await plan.save();
            return { success: true, message: 'Evidencia agregada', data: plan.toObject() };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    avance = async (id) => {
        try {
            const plan = await ImprovementPlan.findById(id).lean();
            if (!plan) return { success: false, message: 'Plan no encontrado' };
            const total = plan.actividades.length;
            const completadas = plan.actividades.filter((a) => a.estado === 'completada').length;
            const enProgreso = plan.actividades.filter((a) => a.estado === 'en_progreso').length;
            const pendientes = plan.actividades.filter((a) => a.estado === 'pendiente').length;
            const vencidas = plan.actividades.filter((a) => a.estado === 'vencida').length;
            return {
                success: true,
                message: 'OK',
                data: {
                    porcentaje: plan.porcentajeAvance,
                    total,
                    completadas,
                    enProgreso,
                    pendientes,
                    vencidas,
                },
            };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };
}
