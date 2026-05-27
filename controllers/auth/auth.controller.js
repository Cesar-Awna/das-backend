import AuthService from '../../services/auth/auth.service.js';

const authService = new AuthService();

export default class AuthController {
    login = async (req, res) => {
        try {
            const response = await authService.login(req.body);
            return res.status(response.success ? 200 : 400).json(response);
        } catch (error) {
            console.error('❌ Controller - Error en login:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado en login' });
        }
    };

    logout = async (req, res) => {
        try {
            const response = await authService.logout();
            return res.status(200).json(response);
        } catch (error) {
            console.error('❌ Controller - Error en logout:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado en logout' });
        }
    };

    me = async (req, res) => {
        try {
            const response = await authService.me(req.userId);
            return res.status(response.success ? 200 : 404).json(response);
        } catch (error) {
            console.error('❌ Controller - Error en me:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    refresh = async (req, res) => {
        try {
            const response = await authService.refresh(req.userId);
            return res.status(response.success ? 200 : 400).json(response);
        } catch (error) {
            console.error('❌ Controller - Error en refresh:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };
}
