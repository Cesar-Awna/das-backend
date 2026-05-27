import connectMongoDB from '../../libs/mongoose.js';
import NtbPauta from '../../models/NtbPauta.js';
import NtbEvaluacion from '../../models/NtbEvaluacion.js';

export default class NtbService {
    constructor() {
        connectMongoDB();
    }

    listPautas = async () => {
        try {
            const pautas = await NtbPauta.find({ vigente: true }).lean();
            return { success: true, message: 'OK', data: pautas };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    createPauta = async (body) => {
        try {
            const pauta = await NtbPauta.create(body);
            return { success: true, message: 'Pauta NTB creada', data: pauta.toObject() };
        } catch (error) {
            return { success: false, message: error.message || 'Error al crear pauta' };
        }
    };

    getPautaById = async (id) => {
        try {
            const pauta = await NtbPauta.findById(id).lean();
            if (!pauta) return { success: false, message: 'Pauta no encontrada' };
            return { success: true, message: 'OK', data: pauta };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    createEvaluacion = async (body, userId) => {
        try {
            const ev = await NtbEvaluacion.create({ ...body, evaluadoPor: userId });
            return { success: true, message: 'Evaluación NTB creada', data: ev.toObject() };
        } catch (error) {
            return { success: false, message: error.message || 'Error al crear evaluación' };
        }
    };

    getEvaluacionById = async (id) => {
        try {
            const ev = await NtbEvaluacion.findById(id).lean();
            if (!ev) return { success: false, message: 'Evaluación no encontrada' };
            return { success: true, message: 'OK', data: ev };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    updateEvaluacion = async (id, body, userId) => {
        try {
            const original = await NtbEvaluacion.findById(id);
            if (!original) return { success: false, message: 'Evaluación no encontrada' };
            const cambios = [];
            for (const key in body) {
                if (JSON.stringify(original[key]) !== JSON.stringify(body[key])) {
                    cambios.push({
                        campo: key,
                        valorAnterior: original[key],
                        valorNuevo: body[key],
                        usuarioId: userId,
                        fecha: new Date(),
                    });
                }
            }
            if (body.evaluaciones) {
                const montoTotal = body.evaluaciones.reduce((sum, e) => sum + (e.costoInversion || 0), 0);
                body.montoTotalInversion = montoTotal;
                const total = body.evaluaciones.length;
                const cumplen = body.evaluaciones.filter((e) => e.estado === 'cumple').length;
                const aplicables = body.evaluaciones.filter((e) => e.estado !== 'no_aplica').length;
                body.porcentajeCumplimiento = aplicables > 0 ? (cumplen / aplicables) * 100 : 0;
            }
            const ev = await NtbEvaluacion.findByIdAndUpdate(
                id,
                { ...body, $push: { historialCambios: { $each: cambios } } },
                { new: true }
            ).lean();
            return { success: true, message: 'Evaluación actualizada', data: ev };
        } catch (error) {
            console.error('❌ Servicio - Error al actualizar evaluación NTB:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    finalizarEvaluacion = async (id, userId) => {
        try {
            const ev = await NtbEvaluacion.findByIdAndUpdate(
                id,
                { estado: 'finalizada', finalizadoEn: new Date() },
                { new: true }
            ).lean();
            if (!ev) return { success: false, message: 'Evaluación no encontrada' };
            return { success: true, message: 'Evaluación finalizada', data: ev };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    informeValorizado = async (id) => {
        try {
            const ev = await NtbEvaluacion.findById(id).lean();
            if (!ev) return { success: false, message: 'Evaluación no encontrada' };
            const pauta = await NtbPauta.findById(ev.pautaId).lean();
            const requisitosMap = {};
            if (pauta) pauta.requisitos.forEach((r) => (requisitosMap[String(r._id)] = r));

            const detalle = ev.evaluaciones
                .filter((e) => e.estado === 'no_cumple')
                .map((e) => ({
                    requisito: requisitosMap[String(e.requisitoId)] || null,
                    costoInversion: e.costoInversion || 0,
                    plazo: e.plazo,
                }));

            return {
                success: true,
                message: 'OK',
                data: {
                    evaluacionId: ev._id,
                    fechaEvaluacion: ev.fechaEvaluacion,
                    montoTotalInversion: ev.montoTotalInversion,
                    detalle,
                },
            };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    informeEvaluacion = async (id) => {
        try {
            const ev = await NtbEvaluacion.findById(id).populate('pautaId').populate('organizationId').lean();
            if (!ev) return { success: false, message: 'Evaluación no encontrada' };
            return { success: true, message: 'OK', data: ev };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    historialUnidad = async (organizationId) => {
        try {
            const evs = await NtbEvaluacion.find({ organizationId })
                .sort({ fechaEvaluacion: -1 })
                .lean();
            return { success: true, message: 'OK', data: evs };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    historialCambios = async (id) => {
        try {
            const ev = await NtbEvaluacion.findById(id).lean();
            if (!ev) return { success: false, message: 'Evaluación no encontrada' };
            return { success: true, message: 'OK', data: ev.historialCambios || [] };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };
}
