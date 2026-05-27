import connectMongoDB from '../../libs/mongoose.js';
import Notification from '../../models/Notification.js';

export default class NotificationService {
    constructor() {
        connectMongoDB();
    }

    list = async (userId, q = {}) => {
        try {
            const query = { destinatarioId: userId };
            if (q.leida !== undefined) query['canalInApp.leida'] = q.leida;
            const items = await Notification.find(query).sort({ createdAt: -1 }).limit(50).lean();
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    markAsRead = async (id, userId) => {
        try {
            const item = await Notification.findOneAndUpdate(
                { _id: id, destinatarioId: userId },
                { 'canalInApp.leida': true, 'canalInApp.fechaLectura': new Date() },
                { new: true }
            ).lean();
            if (!item) return { success: false, message: 'Notificación no encontrada' };
            return { success: true, message: 'Marcada como leída', data: item };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    unreadCount = async (userId) => {
        try {
            const count = await Notification.countDocuments({
                destinatarioId: userId,
                'canalInApp.leida': false,
            });
            return { success: true, message: 'OK', data: { count } };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    setPreferences = async (userId, preferences) => {
        // Placeholder: en una implementación real esto iría en el modelo User o en una colección propia
        return { success: true, message: 'Preferencias actualizadas', data: preferences };
    };

    listEmailTemplates = async () => {
        // Placeholder: plantillas estáticas para el esqueleto
        return {
            success: true,
            message: 'OK',
            data: [
                { id: 'documento_por_vencer', asunto: 'Documento por vencer', cuerpo: 'El documento {nombre} vence el {fecha}' },
                { id: 'evento_notificado', asunto: 'Nuevo evento adverso', cuerpo: 'Se ha notificado un nuevo evento: {numeroCaso}' },
                { id: 'pauta_programada', asunto: 'Pauta programada', cuerpo: 'Hoy debe aplicar la pauta {nombre}' },
            ],
        };
    };

    updateEmailTemplate = async (id, body) => {
        // Placeholder
        return { success: true, message: 'Plantilla actualizada', data: { id, ...body } };
    };
}
