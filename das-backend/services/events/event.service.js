import connectMongoDB from '../../libs/mongoose.js';
import EventCatalog from '../../models/EventCatalog.js';
import EventForm from '../../models/EventForm.js';
import AdverseEvent from '../../models/AdverseEvent.js';
import User from '../../models/User.js';

export default class EventService {
    constructor() {
        connectMongoDB();
    }

    // CATÁLOGOS
    listCatalog = async (tipo) => {
        try {
            const items = await EventCatalog.find({ tipo, activo: true }).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    createCatalog = async (tipo, body) => {
        try {
            const item = await EventCatalog.create({ ...body, tipo });
            return { success: true, message: 'Elemento creado', data: item.toObject() };
        } catch (error) {
            return { success: false, message: error.message || 'Error al crear' };
        }
    };

    updateCatalog = async (id, body) => {
        try {
            const item = await EventCatalog.findByIdAndUpdate(id, body, { new: true }).lean();
            if (!item) return { success: false, message: 'No encontrado' };
            return { success: true, message: 'Actualizado', data: item };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    deleteCatalog = async (id) => {
        try {
            const item = await EventCatalog.findByIdAndUpdate(id, { activo: false }, { new: true }).lean();
            if (!item) return { success: false, message: 'No encontrado' };
            return { success: true, message: 'Desactivado', data: item };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    // FORMULARIOS
    listForms = async () => {
        try {
            const items = await EventForm.find({ vigente: true }).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    createForm = async (body) => {
        try {
            const item = await EventForm.create(body);
            return { success: true, message: 'Formulario creado', data: item.toObject() };
        } catch (error) {
            return { success: false, message: error.message || 'Error al crear formulario' };
        }
    };

    updateForm = async (id, body) => {
        try {
            const item = await EventForm.findByIdAndUpdate(id, body, { new: true }).lean();
            if (!item) return { success: false, message: 'Formulario no encontrado' };
            return { success: true, message: 'Formulario actualizado', data: item };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    // RESPONSABLES Y NOTIFICADORES
    listResponsables = async () => {
        try {
            const responsables = await User.find({
                'rolesFuncionales.tipo': 'gestor_eventos',
                activo: true,
            }).select('-passwordHash').lean();
            return { success: true, message: 'OK', data: responsables };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    asignarResponsable = async ({ userId, entidadId }) => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        rolesFuncionales: {
                            tipo: 'gestor_eventos',
                            entidad: 'organization',
                            entidadId,
                            vigenciaDesde: new Date(),
                        },
                    },
                },
                { new: true }
            ).select('-passwordHash').lean();
            if (!user) return { success: false, message: 'Usuario no encontrado' };
            return { success: true, message: 'Responsable asignado', data: user };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    asignarNotificadores = async ({ userIds, organizationId }) => {
        try {
            await User.updateMany(
                { _id: { $in: userIds } },
                {
                    $push: {
                        rolesFuncionales: {
                            tipo: 'jefatura',
                            entidad: 'organization',
                            entidadId: organizationId,
                            vigenciaDesde: new Date(),
                        },
                    },
                }
            );
            return { success: true, message: 'Notificadores asignados' };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    // EVENTOS ADVERSOS
    create = async (body, userId) => {
        try {
            const numeroCaso = `EA-${Date.now()}`;
            const event = await AdverseEvent.create({
                ...body,
                numeroCaso,
                notificadoPor: body.anonimo ? null : userId,
            });
            return { success: true, message: 'Evento notificado', data: event.toObject() };
        } catch (error) {
            console.error('❌ Servicio - Error al crear evento:', error);
            return { success: false, message: error.message || 'Error al crear evento' };
        }
    };

    list = async (q = {}) => {
        try {
            const query = {};
            if (q.estado) query.estado = q.estado;
            if (q.ambitoId) query.ambitoId = q.ambitoId;
            if (q.organizationId) query.organizationId = q.organizationId;
            const items = await AdverseEvent.find(query).sort({ fechaEvento: -1 }).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    getById = async (id) => {
        try {
            const item = await AdverseEvent.findById(id).lean();
            if (!item) return { success: false, message: 'Evento no encontrado' };
            return { success: true, message: 'OK', data: item };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    verificar = async (id, { esNotificable, motivoRechazo }, userId) => {
        try {
            const update = {
                'verificacion.esNotificable': esNotificable,
                'verificacion.motivoRechazo': motivoRechazo,
                'verificacion.verificadoPor': userId,
                'verificacion.verificadoEn': new Date(),
                estado: esNotificable ? 'verificado' : 'rechazado',
            };
            const event = await AdverseEvent.findByIdAndUpdate(id, update, { new: true }).lean();
            if (!event) return { success: false, message: 'Evento no encontrado' };
            return { success: true, message: 'Evento verificado', data: event };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    clasificar = async (id, { ambitoId, tipoEventoId, gravedad }) => {
        try {
            const update = {};
            if (ambitoId) update.ambitoId = ambitoId;
            if (tipoEventoId) update.tipoEventoId = tipoEventoId;
            if (gravedad) update.gravedad = gravedad;
            const event = await AdverseEvent.findByIdAndUpdate(id, update, { new: true }).lean();
            if (!event) return { success: false, message: 'Evento no encontrado' };
            return { success: true, message: 'Evento clasificado', data: event };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    addCausas = async (id, causasDetonantes) => {
        try {
            const event = await AdverseEvent.findByIdAndUpdate(
                id,
                { 'gestion.causasDetonantes': causasDetonantes, estado: 'en_gestion' },
                { new: true }
            ).lean();
            if (!event) return { success: false, message: 'Evento no encontrado' };
            return { success: true, message: 'Causas registradas', data: event };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    cerrar = async (id, userId) => {
        try {
            const event = await AdverseEvent.findByIdAndUpdate(
                id,
                { estado: 'cerrado', cerradoPor: userId, cerradoEn: new Date() },
                { new: true }
            ).lean();
            if (!event) return { success: false, message: 'Evento no encontrado' };
            return { success: true, message: 'Evento cerrado', data: event };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    resumen = async (id) => {
        try {
            const event = await AdverseEvent.findById(id)
                .populate('ambitoId')
                .populate('tipoEventoId')
                .populate('organizationId')
                .lean();
            if (!event) return { success: false, message: 'Evento no encontrado' };
            return { success: true, message: 'OK', data: event };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    enviarResumen = async (id, { destinatarios }) => {
        try {
            const envios = destinatarios.map((userId) => ({
                userId,
                fechaEnvio: new Date(),
            }));
            const event = await AdverseEvent.findByIdAndUpdate(
                id,
                { $push: { 'gestion.resumenEnviadoA': { $each: envios } } },
                { new: true }
            ).lean();
            if (!event) return { success: false, message: 'Evento no encontrado' };
            return { success: true, message: 'Resumen enviado', data: event };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    // ESTADÍSTICAS
    estadisticas = async () => {
        try {
            const [total, porEstado, porGravedad] = await Promise.all([
                AdverseEvent.countDocuments(),
                AdverseEvent.aggregate([{ $group: { _id: '$estado', count: { $sum: 1 } } }]),
                AdverseEvent.aggregate([{ $group: { _id: '$gravedad', count: { $sum: 1 } } }]),
            ]);
            return { success: true, message: 'OK', data: { total, porEstado, porGravedad } };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    estadisticasPorTipo = async () => {
        try {
            const data = await AdverseEvent.aggregate([
                { $group: { _id: '$tipoEventoId', count: { $sum: 1 } } },
            ]);
            return { success: true, message: 'OK', data };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    estadisticasPorUnidad = async () => {
        try {
            const data = await AdverseEvent.aggregate([
                { $group: { _id: '$organizationId', count: { $sum: 1 } } },
            ]);
            return { success: true, message: 'OK', data };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    estadisticasPorPeriodo = async ({ desde, hasta } = {}) => {
        try {
            const match = {};
            if (desde || hasta) match.fechaEvento = {};
            if (desde) match.fechaEvento.$gte = new Date(desde);
            if (hasta) match.fechaEvento.$lte = new Date(hasta);
            const data = await AdverseEvent.aggregate([
                { $match: match },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m', date: '$fechaEvento' } },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } },
            ]);
            return { success: true, message: 'OK', data };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    notificacionRapida = async (body, userId) => {
        try {
            const numeroCaso = `EA-RAP-${Date.now()}`;
            const event = await AdverseEvent.create({
                ...body,
                numeroCaso,
                notificadoPor: userId,
                estado: 'notificado',
            });
            return { success: true, message: 'Notificación rápida enviada', data: event.toObject() };
        } catch (error) {
            return { success: false, message: error.message || 'Error en notificación rápida' };
        }
    };
}
