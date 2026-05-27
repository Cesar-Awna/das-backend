import bcrypt from 'bcrypt';
import connectMongoDB from '../../libs/mongoose.js';
import User from '../../models/User.js';

export default class UserService {
    constructor() {
        connectMongoDB();
    }

    list = async ({ page = 1, limit = 20, search = '', perfil, activo } = {}) => {
        try {
            const query = {};
            if (search) {
                query.$or = [
                    { nombre: { $regex: search, $options: 'i' } },
                    { apellido: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { rut: { $regex: search, $options: 'i' } },
                ];
            }
            if (perfil) query.perfil = perfil;
            if (typeof activo !== 'undefined') query.activo = activo;

            const skip = (Number(page) - 1) * Number(limit);
            const [users, total] = await Promise.all([
                User.find(query).select('-passwordHash').skip(skip).limit(Number(limit)).lean(),
                User.countDocuments(query),
            ]);

            return { success: true, message: 'OK', data: { users, total, page: Number(page), limit: Number(limit) } };
        } catch (error) {
            console.error('❌ Servicio - Error al listar usuarios:', error);
            return { success: false, message: 'Error inesperado al listar usuarios' };
        }
    };

    create = async (body) => {
        try {
            const { password, ...rest } = body;
            if (!password) return { success: false, message: 'La contraseña es requerida' };
            const passwordHash = await bcrypt.hash(password, 10);
            const user = await User.create({ ...rest, passwordHash });
            const userObj = user.toObject();
            delete userObj.passwordHash;
            return { success: true, message: 'Usuario creado', data: userObj };
        } catch (error) {
            console.error('❌ Servicio - Error al crear usuario:', error);
            return { success: false, message: error.message || 'Error al crear usuario' };
        }
    };

    getById = async (id) => {
        try {
            const user = await User.findById(id).select('-passwordHash').lean();
            if (!user) return { success: false, message: 'Usuario no encontrado' };
            return { success: true, message: 'OK', data: user };
        } catch (error) {
            console.error('❌ Servicio - Error al obtener usuario:', error);
            return { success: false, message: 'Error inesperado al obtener usuario' };
        }
    };

    update = async (id, body) => {
        try {
            const update = { ...body };
            if (update.password) {
                update.passwordHash = await bcrypt.hash(update.password, 10);
                delete update.password;
            }
            const user = await User.findByIdAndUpdate(id, update, { new: true }).select('-passwordHash').lean();
            if (!user) return { success: false, message: 'Usuario no encontrado' };
            return { success: true, message: 'Usuario actualizado', data: user };
        } catch (error) {
            console.error('❌ Servicio - Error al actualizar usuario:', error);
            return { success: false, message: 'Error inesperado al actualizar usuario' };
        }
    };

    deactivate = async (id) => {
        try {
            const user = await User.findByIdAndUpdate(id, { activo: false }, { new: true }).select('-passwordHash').lean();
            if (!user) return { success: false, message: 'Usuario no encontrado' };
            return { success: true, message: 'Usuario desactivado', data: user };
        } catch (error) {
            console.error('❌ Servicio - Error al desactivar usuario:', error);
            return { success: false, message: 'Error inesperado al desactivar usuario' };
        }
    };

    updateRole = async (id, { perfil, rolesFuncionales }) => {
        try {
            const update = {};
            if (perfil) update.perfil = perfil;
            if (rolesFuncionales) update.rolesFuncionales = rolesFuncionales;
            const user = await User.findByIdAndUpdate(id, update, { new: true }).select('-passwordHash').lean();
            if (!user) return { success: false, message: 'Usuario no encontrado' };
            return { success: true, message: 'Rol actualizado', data: user };
        } catch (error) {
            console.error('❌ Servicio - Error al actualizar rol:', error);
            return { success: false, message: 'Error inesperado al actualizar rol' };
        }
    };
}
