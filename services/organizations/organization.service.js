import connectMongoDB from '../../libs/mongoose.js';
import Organization from '../../models/Organization.js';
import User from '../../models/User.js';

export default class OrganizationService {
    constructor() {
        connectMongoDB();
    }

    list = async ({ tipo, activo, parentId } = {}) => {
        try {
            const query = {};
            if (tipo) query.tipo = tipo;
            if (typeof activo !== 'undefined') query.activo = activo;
            if (parentId) query.parentId = parentId;
            const orgs = await Organization.find(query).lean();
            return { success: true, message: 'OK', data: orgs };
        } catch (error) {
            console.error('❌ Servicio - Error al listar organizaciones:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    create = async (body) => {
        try {
            const org = await Organization.create(body);
            return { success: true, message: 'Organización creada', data: org.toObject() };
        } catch (error) {
            console.error('❌ Servicio - Error al crear organización:', error);
            return { success: false, message: error.message || 'Error al crear organización' };
        }
    };

    update = async (id, body) => {
        try {
            const org = await Organization.findByIdAndUpdate(id, body, { new: true }).lean();
            if (!org) return { success: false, message: 'Organización no encontrada' };
            return { success: true, message: 'Organización actualizada', data: org };
        } catch (error) {
            console.error('❌ Servicio - Error al actualizar organización:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    deactivate = async (id) => {
        try {
            const org = await Organization.findByIdAndUpdate(id, { activo: false }, { new: true }).lean();
            if (!org) return { success: false, message: 'Organización no encontrada' };
            return { success: true, message: 'Organización desactivada', data: org };
        } catch (error) {
            console.error('❌ Servicio - Error al desactivar organización:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    getMembers = async (id) => {
        try {
            const users = await User.find({ organizationIds: id, activo: true }).select('-passwordHash').lean();
            return { success: true, message: 'OK', data: users };
        } catch (error) {
            console.error('❌ Servicio - Error al obtener miembros:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    assignUser = async (organizationId, userId) => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { organizationIds: organizationId } },
                { new: true }
            ).select('-passwordHash').lean();
            if (!user) return { success: false, message: 'Usuario no encontrado' };
            return { success: true, message: 'Usuario asignado a la organización', data: user };
        } catch (error) {
            console.error('❌ Servicio - Error al asignar usuario:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };
}
