import mongoose from 'mongoose';

const { Schema } = mongoose;

const auditChangeSchema = new Schema({
    campo: { type: String },
    valorAnterior: { type: Schema.Types.Mixed },
    valorNuevo: { type: Schema.Types.Mixed },
}, { _id: false });

const auditLogSchema = new Schema(
    {
        usuarioId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        accion: {
            type: String,
            enum: ['crear', 'editar', 'eliminar', 'aprobar', 'archivar', 'acceder'],
            required: true,
        },

        entidad: { type: String, required: true },
        entidadId: { type: Schema.Types.ObjectId, required: true },

        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },

        cambios: [auditChangeSchema],

        ip: { type: String },
        userAgent: { type: String },

        fecha: { type: Date, default: Date.now },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

auditLogSchema.index({ entidad: 1, entidadId: 1 });
auditLogSchema.index({ usuarioId: 1, fecha: -1 });
auditLogSchema.index({ organizationId: 1, fecha: -1 });
auditLogSchema.index({ fecha: -1 });

const AuditLog = mongoose.model('AuditLog', auditLogSchema, 'audit_logs');

export default AuditLog;
