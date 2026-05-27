import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';

import AuthRoutes from './routes/auth/authRoutes.js';
import UserRoutes from './routes/users/userRoutes.js';
import OrganizationRoutes from './routes/organizations/organizationRoutes.js';
import AcreditacionRoutes from './routes/acreditacion/acreditacionRoutes.js';
import IndicatorRoutes from './routes/indicators/indicatorRoutes.js';
import NtbRoutes from './routes/ntb/ntbRoutes.js';
import DocumentRoutes from './routes/documents/documentRoutes.js';
import SupervisionRoutes from './routes/supervision/supervisionRoutes.js';
import EventRoutes from './routes/events/eventRoutes.js';
import ImprovementPlanRoutes from './routes/improvementPlans/improvementPlanRoutes.js';
import NotificationRoutes from './routes/notifications/notificationRoutes.js';
import AuditRoutes from './routes/audit/auditRoutes.js';
import WorkspaceRoutes from './routes/workspace/workspaceRoutes.js';
import ReportRoutes from './routes/reports/reportRoutes.js';

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('CORS bloqueado'), false);
    },
    credentials: true,
}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp',
    createParentPath: true,
}));

app.use(express.json({ limit: '10mb' }));

app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

// Rutas del sistema
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/organizations', OrganizationRoutes);
app.use('/api/acreditacion', AcreditacionRoutes);
app.use('/api/indicators', IndicatorRoutes);
app.use('/api/ntb', NtbRoutes);
app.use('/api/documents', DocumentRoutes);
app.use('/api/supervision-pautas', SupervisionRoutes);
app.use('/api/eventos', EventRoutes);
app.use('/api/improvement-plans', ImprovementPlanRoutes);
app.use('/api/notifications', NotificationRoutes);
app.use('/api/audit', AuditRoutes);
app.use('/api/workspace', WorkspaceRoutes);
app.use('/api/reports', ReportRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Servidor DAS-Backend corriendo en http://0.0.0.0:${PORT}`);
});
