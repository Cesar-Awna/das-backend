import mongoose from 'mongoose';

const { Schema } = mongoose;

const evaluacionElementoSchema = new Schema({
    ambitoId: { type: Schema.Types.ObjectId, required: true },
    caracteristicaId: { type: Schema.Types.ObjectId, required: true },
    elementoMedibleId: { type: Schema.Types.ObjectId, required: true },
    estado: {
        type: String,
        enum: ['cumple', 'no_cumple', 'no_aplica'],
        required: true,
    },
    justificacion: { type: String },
    evidencias: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    evaluadoPor: { type: Schema.Types.ObjectId, ref: 'User' },
    evaluadoEn: { type: Date },
}, { _id: false });

const acreditacionAutoevaluacionSchema = new Schema(
    {
        pautaId: { type: Schema.Types.ObjectId, ref: 'AcreditacionPauta', required: true },
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
        periodo: { type: String, required: true },
        estado: {
            type: String,
            enum: ['borrador', 'en_revision', 'finalizada'],
            default: 'borrador',
        },
        evaluaciones: [evaluacionElementoSchema],
        porcentajeCumplimiento: { type: Number },
        observaciones: { type: String },
        iniciadoPor: { type: Schema.Types.ObjectId, ref: 'User' },
        finalizadoPor: { type: Schema.Types.ObjectId, ref: 'User' },
        finalizadoEn: { type: Date },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

acreditacionAutoevaluacionSchema.index({ pautaId: 1, organizationId: 1, periodo: 1 });

const AcreditacionAutoevaluacion = mongoose.model(
    'AcreditacionAutoevaluacion',
    acreditacionAutoevaluacionSchema,
    'acreditacion_autoevaluaciones'
);

export default AcreditacionAutoevaluacion;
