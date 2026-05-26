import express from 'express';
import AuthController from '../../controllers/auth/auth.controller.js';
import { authMiddleware } from '../../utils/authMiddleware.js';

const router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.get('/me', authMiddleware, authController.me);
router.post('/refresh', authMiddleware, authController.refresh);

export default router;
