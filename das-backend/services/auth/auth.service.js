import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectMongoDB from '../../libs/mongoose.js';
import User from '../../models/User.js';

export default class AuthService {
    constructor() {
        connectMongoDB();
    }

    login = async ({ email, password }) => {
        try {
            if (!email || !password) {
                return { success: false, message: 'Email y contraseña son requeridos' };
            }

            const user = await User.findOne({ email: email.toLowerCase(), activo: true });
            if (!user) {
                return { success: false, message: 'Credenciales inválidas' };
            }

            if (user.bloqueado) {
                return { success: false, message: 'Usuario bloqueado. Contacte al administrador' };
            }

            const valid = await bcrypt.compare(password, user.passwordHash);
            if (!valid) {
                user.intentosFallidos = (user.intentosFallidos || 0) + 1;
                if (user.intentosFallidos >= 5) user.bloqueado = true;
                await user.save();
                return { success: false, message: 'Credenciales inválidas' };
            }

            user.intentosFallidos = 0;
            user.ultimoAcceso = new Date();
            await user.save();

            const token = jwt.sign(
                { userId: user._id, email: user.email, perfil: user.perfil },
                process.env.JWT_SECRET || 'cambiar-este-secret',
                { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
            );

            return {
                success: true,
                message: 'Login exitoso',
                data: {
                    token,
                    user: {
                        id: user._id,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        email: user.email,
                        perfil: user.perfil,
                    },
                },
            };
        } catch (error) {
            console.error('❌ Servicio - Error en login:', error);
            return { success: false, message: 'Error inesperado en login' };
        }
    };

    logout = async () => {
        return { success: true, message: 'Sesión cerrada' };
    };

    me = async (userId) => {
        try {
            const user = await User.findById(userId).select('-passwordHash').lean();
            if (!user) return { success: false, message: 'Usuario no encontrado' };
            return { success: true, message: 'OK', data: user };
        } catch (error) {
            console.error('❌ Servicio - Error en me:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    refresh = async (userId) => {
        try {
            const user = await User.findById(userId);
            if (!user || !user.activo) return { success: false, message: 'Usuario no válido' };
            const token = jwt.sign(
                { userId: user._id, email: user.email, perfil: user.perfil },
                process.env.JWT_SECRET || 'cambiar-este-secret',
                { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
            );
            return { success: true, message: 'Token renovado', data: { token } };
        } catch (error) {
            console.error('❌ Servicio - Error en refresh:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };
}
