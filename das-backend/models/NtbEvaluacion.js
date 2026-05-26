import mongoose from 'mongoose';

const { Schema } = mongoose;

const ntbEvaluacionRequisitoSchema = new Schema({
    requisitoId: { type: Schema.Types.ObjectId, required: true },
    estado: {
        type: String,
        enum: ['cumple', 'no_cumple', 'no_aplica'],
        required: true,
    },
    costoInversion: { type: Number, default: 0 },
    plazo: {
        type: String,
        enum: ['corto', 'mediano', 'largo'],
    },
    evidencias: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    observaciones: { type: String },
}, { _id: false });

const ntbHistorialCambioSchema = new Schema({
    campo: { type: String },
    valorAnterior: { type: Schema.Types.Mixed },
    valorNuevo: { type: Schema.Types.Mixed },
    usuarioId: { type: Schema.Types.ObjectId, ref: 'User' },
    fecha: { type: Date, default: Date.now },
}, { _id: false });

const ntbEvaluacionSchema = new Schema(
    {
        pautaId: { type: Schema.Types.ObjectId, ref: 'NtbPauta', required: true },
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
        fechaEvaluacion: { type: Date, required: true },

        evaluaciones: [ntbEvaluacionRequisitoSchema],

        montoTotalInversion: { type: Number, default: 0 },
        porcentajeCumplimiento: { type: Number },

        estado: {
            type: String,
            enum: ['borrador', 'finalizada'],
            default: 'borrador',
        },

        evaluadoPor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        finalizadoEn: { type: Date },

        historialCambios: [ntbHistorialCambioSchema],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

ntbEvaluacionSchema.index({ organizationId: 1, fechaEvaluacion: -1 });

const NtbEvaluacion = mongoose.model('NtbEvaluacion', ntbEvaluacionSchema, 'ntb_evaluaciones');

export default NtbEvaluacion;
