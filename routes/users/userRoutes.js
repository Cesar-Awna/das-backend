import express from 'express';
import UserController from '../../controllers/users/user.controller.js';
import { authMiddleware, adminOnly } from '../../utils/authMiddleware.js';

const router = express.Router();
const userController = new UserController();

router.use(authMiddleware);

router.get('/', userController.list);
router.post('/', adminOnly, userController.create);
router.get('/:id', userController.getById);
router.put('/:id', adminOnly, userController.update);
router.delete('/:id', adminOnly, userController.deactivate);
router.put('/:id/role', adminOnly, userController.updateRole);

export default router;
