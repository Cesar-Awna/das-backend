import mongoose from 'mongoose';

const { Schema } = mongoose;

const documentVersionSchema = new Schema({
    numero: { type: String, required: true },
    fileId: { type: Schema.Types.ObjectId, ref: 'File', required: true },
    cambios: { type: String, required: true },
    fechaEmision: { type: Date, required: true },
    fechaVencimiento: { type: Date },
    vigente: { type: Boolean, default: false },

    estadoAprobacion: {
        type: String,
        enum: ['pendiente', 'aprobada', 'rechazada'],
        default: 'pendiente',
    },

    creadoPor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    creadoEn: { type: Date, default: Date.now },

    aprobadoPor: { type: Schema.Types.ObjectId, ref: 'User' },
    aprobadoEn: { type: Date },
    comentarioAprobacion: { type: String },
}, { _id: true });

const documentSchema = new Schema(
    {
        codigo: { type: String, required: true, unique: true, trim: true },
        nombre: { type: String, required: true, trim: true },
        tipo: {
            type: String,
            enum: ['procedimiento', 'protocolo', 'manual', 'instructivo', 'formato', 'otro'],
            required: true,
        },
        descripcion: { type: String, trim: true },

        categorias: [{ type: String }],
        vistas: [{ type: String }],
        tags: [{ type: String }],

        responsableId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        aprobadorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },

        versiones: [documentVersionSchema],
        versionVigenteId: { type: Schema.Types.ObjectId },

        estado: {
            type: String,
            enum: ['activo', 'archivado'],
            default: 'activo',
        },

        alarmaVencimiento: {
            activa: { type: Boolean, default: true },
            diasAnticipacion: { type: [Number], default: [30, 60, 90] },
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

documentSchema.index({ codigo: 1 });
documentSchema.index({ tipo: 1, estado: 1 });
documentSchema.index({ categorias: 1 });
documentSchema.index({ vistas: 1 });
documentSchema.index({ 'versiones.fechaVencimiento': 1 });

const Document = mongoose.model('Document', documentSchema, 'documents');

export default Document;
