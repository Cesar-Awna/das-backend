import connectMongoDB from '../../libs/mongoose.js';
import AuditLog from '../../models/AuditLog.js';

export default class AuditService {
    constructor() {
        connectMongoDB();
    }

    list = async (q = {}) => {
        try {
            const query = {};
            if (q.entidad) query.entidad = q.entidad;
            if (q.accion) query.accion = q.accion;
            if (q.desde || q.hasta) {
                query.fecha = {};
                if (q.desde) query.fecha.$gte = new Date(q.desde);
                if (q.hasta) query.fecha.$lte = new Date(q.hasta);
            }
            const items = await AuditLog.find(query).sort({ fecha: -1 }).limit(200).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    byUser = async (userId) => {
        try {
            const items = await AuditLog.find({ usuarioId: userId }).sort({ fecha: -1 }).limit(200).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    byEntity = async (entityType, entityId) => {
        try {
            const items = await AuditLog.find({ entidad: entityType, entidadId: entityId })
                .sort({ fecha: -1 })
                .lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    byUnidad = async (unidadId) => {
        try {
            const items = await AuditLog.find({ organizationId: unidadId })
                .sort({ fecha: -1 })
                .limit(200)
                .lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    export = async (q = {}) => {
        try {
            const query = {};
            if (q.desde || q.hasta) {
                query.fecha = {};
                if (q.desde) query.fecha.$gte = new Date(q.desde);
                if (q.hasta) query.fecha.$lte = new Date(q.hasta);
            }
            const items = await AuditLog.find(query).sort({ fecha: -1 }).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };
}
