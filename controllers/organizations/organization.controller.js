import OrganizationService from '../../services/organizations/organization.service.js';

const organizationService = new OrganizationService();

export default class OrganizationController {
    list = async (req, res) => {
        try {
            const response = await organizationService.list(req.query);
            return res.status(response.success ? 200 : 400).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al listar organizaciones:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    create = async (req, res) => {
        try {
            const response = await organizationService.create(req.body);
            return res.status(response.success ? 201 : 400).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al crear organización:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    update = async (req, res) => {
        try {
            const response = await organizationService.update(req.params.id, req.body);
            return res.status(response.success ? 200 : 404).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al actualizar organización:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    deactivate = async (req, res) => {
        try {
            const response = await organizationService.deactivate(req.params.id);
            return res.status(response.success ? 200 : 404).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al desactivar organización:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    getMembers = async (req, res) => {
        try {
            const response = await organizationService.getMembers(req.params.id);
            return res.status(response.success ? 200 : 400).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al obtener miembros:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };

    assignUser = async (req, res) => {
        try {
            const response = await organizationService.assignUser(req.params.id, req.body.userId);
            return res.status(response.success ? 200 : 400).json(response);
        } catch (error) {
            console.error('❌ Controller - Error al asignar usuario:', error);
            return res.status(500).json({ success: false, message: 'Error inesperado' });
        }
    };
}
