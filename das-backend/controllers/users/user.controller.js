import UserService from '../../services/users/user.service.js';

const userService = new UserService();

export default class UserController {
    list = async (req, res) => {
        try {
            const response = await userService.list(req.query);
            return res.status(response.success ? 200 : 400).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al listar usuarios:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    create = async (req, res) => {
        try {
            const response = await userService.create(req.body);
            return res.status(response.success ? 201 : 400).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al crear usuario:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    getById = async (req, res) => {
        try {
            const response = await userService.getById(req.params.id);
            return res.status(response.success ? 200 : 404).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al obtener usuario:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    update = async (req, res) => {
        try {
            const response = await userService.update(req.params.id, req.body);
            return res.status(response.success ? 200 : 400).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al actualizar usuario:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    deactivate = async (req, res) => {
        try {
            const response = await userService.deactivate(req.params.id);
            return res.status(response.success ? 200 : 404).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al desactivar usuario:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    updateRole = async (req, res) => {
        try {
            const response = await userService.updateRole(req.params.id, req.body);
            return res.status(response.success ? 200 : 400).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al actualizar rol:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };
}
