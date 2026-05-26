import mongoose from 'mongoose';

const { Schema } = mongoose;

const indicatorSchema = new Schema(
    {
        codigo: { type: String, required: true, unique: true, trim: true },
        nombre: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },

        ambitoId: { type: Schema.Types.ObjectId, required: true },
        caracteristicaIds: [{ type: Schema.Types.ObjectId }],

        formula: {
            numeradorDescripcion: { type: String, required: true },
            denominadorDescripcion: { type: String, required: true },
            unidad: { type: String, default: '%' },
        },

        meta: { type: Number, required: true },
        umbralCumplimiento: { type: Number, required: true },

        periodicidad: {
            type: String,
            enum: ['mensual', 'trimestral', 'semestral', 'anual'],
            required: true,
        },

        obligatorio: { type: Boolean, default: false },

        responsableId: { type: Schema.Types.ObjectId, ref: 'User' },
        suplenteId: { type: Schema.Types.ObjectId, ref: 'User' },
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },

        fechaInicioVigencia: { type: Date, required: true },
        fechaFinVigencia: { type: Date },
        vigente: { type: Boolean, default: true },

        alarmaRetraso: {
            activa: { type: Boolean, default: true },
            diasAnticipacion: { type: Number, default: 5 },
            destinatarios: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

indicatorSchema.index({ ambitoId: 1, vigente: 1 });
indicatorSchema.index({ organizationId: 1 });
indicatorSchema.index({ responsableId: 1 });

const Indicator = mongoose.model('Indicator', indicatorSchema, 'indicators');

export default Indicator;
