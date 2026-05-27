import mongoose from 'mongoose';

const { Schema } = mongoose;

const indicatorMeasurementSchema = new Schema(
    {
        indicatorId: { type: Schema.Types.ObjectId, ref: 'Indicator', required: true },
        periodo: { type: String, required: true },
        fechaMedicion: { type: Date, required: true },

        numerador: { type: Number, required: true },
        denominador: { type: Number, required: true, min: 0 },
        resultado: { type: Number, required: true },
        porcentajeCumplimiento: { type: Number, required: true },
        cumple: { type: Boolean, required: true },

        respaldos: [{ type: Schema.Types.ObjectId, ref: 'File' }],
        observaciones: { type: String },

        pautaSupervisionId: { type: Schema.Types.ObjectId, ref: 'SupervisionPauta' },

        registradoPor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        modificadoPor: { type: Schema.Types.ObjectId, ref: 'User' },

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

indicatorMeasurementSchema.index({ indicatorId: 1, periodo: 1 });
indicatorMeasurementSchema.index({ indicatorId: 1, fechaMedicion: -1 });

const IndicatorMeasurement = mongoose.model(
    'IndicatorMeasurement',
    indicatorMeasurementSchema,
    'indicator_measurements'
);

export default IndicatorMeasurement;
