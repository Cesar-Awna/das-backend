import mongoose from 'mongoose';

const { Schema } = mongoose;

const actividadPlanSchema = new Schema({
    descripcion: { type: String, required: true },
    responsableId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fechaInicio: { type: Date },
    fechaPlazo: { type: Date, required: true },
    fechaCompletada: { type: Date },

    estado: {
        type: String,
        enum: ['pendiente', 'en_progreso', 'completada', 'vencida'],
        default: 'pendiente',
    },

    evidencias: [{ type: Schema.Types.ObjectId, ref: 'File' }],
    observaciones: { type: String },
}, { _id: true, timestamps: true });

const improvementPlanSchema = new Schema(
    {
        origen: {
            type: String,
            enum: ['evento_adverso', 'indicador', 'autoevaluacion'],
            required: true,
        },
        origenId: { type: Schema.Types.ObjectId, required: true },

        titulo: { type: String, required: true, trim: true },
        descripcion: { type: String },

        actividades: [actividadPlanSchema],

        porcentajeAvance: { type: Number, default: 0 },
        estado: {
            type: String,
            enum: ['abierto', 'en_seguimiento', 'cerrado'],
            default: 'abierto',
        },

        creadoPor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        cerradoPor: { type: Schema.Types.ObjectId, ref: 'User' },
        cerradoEn: { type: Date },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

improvementPlanSchema.index({ origen: 1, origenId: 1 });
improvementPlanSchema.index({ estado: 1 });

const ImprovementPlan = mongoose.model('ImprovementPlan', improvementPlanSchema, 'improvement_plans');

export default ImprovementPlan;
