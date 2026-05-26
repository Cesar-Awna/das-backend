import express from 'express';
import OrganizationController from '../../controllers/organizations/organization.controller.js';
import { authMiddleware, adminOnly } from '../../utils/authMiddleware.js';

const router = express.Router();
const organizationController = new OrganizationController();

router.use(authMiddleware);

router.get('/', organizationController.list);
router.post('/', adminOnly, organizationController.create);
router.put('/:id', adminOnly, organizationController.update);
router.delete('/:id', adminOnly, organizationController.deactivate);
router.get('/:id/members', organizationController.getMembers);
router.post('/:id/assign-user', adminOnly, organizationController.assignUser);

export default router;
