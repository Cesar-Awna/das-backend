import mongoose from 'mongoose';

const { Schema } = mongoose;

const evaluacionCriterioSchema = new Schema({
    criterioId: { type: Schema.Types.ObjectId, required: true },
    cumple: { type: Boolean, required: true },
    puntaje: { type: Number },
    observacion: { type: String },
    evidencias: [{ type: Schema.Types.ObjectId, ref: 'File' }],
}, { _id: false });

const supervisionAplicacionSchema = new Schema(
    {
        pautaId: { type: Schema.Types.ObjectId, ref: 'SupervisionPauta', required: true },
        planificacionId: { type: Schema.Types.ObjectId },

        fechaAplicacion: { type: Date, required: true },
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },

        evaluacionCriterios: [evaluacionCriterioSchema],

        porcentajeCumplimiento: { type: Number },
        observacionGeneral: { type: String },

        aplicadoPor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        estado: {
            type: String,
            enum: ['borrador', 'finalizada'],
            default: 'finalizada',
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

supervisionAplicacionSchema.index({ pautaId: 1, fechaAplicacion: -1 });

const SupervisionAplicacion = mongoose.model(
    'SupervisionAplicacion',
    supervisionAplicacionSchema,
    'supervision_aplicaciones'
);

export default SupervisionAplicacion;
