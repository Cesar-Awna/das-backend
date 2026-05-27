import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: 'Token requerido' });
        }
        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cambiar-este-secret');
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        req.userPerfil = decoded.perfil;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.userPerfil !== 'administrador') {
        return res.status(403).json({ success: false, message: 'Acceso solo para administradores' });
    }
    next();
};
