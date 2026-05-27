import mongoose from 'mongoose';

const { Schema } = mongoose;

const criterioPautaSchema = new Schema({
    codigo: { type: String, required: true },
    descripcion: { type: String, required: true },
    peso: { type: Number, default: 1 },
    obligatorio: { type: Boolean, default: false },
}, { _id: true });

const planificacionSchema = new Schema({
    fechaProgramada: { type: Date, required: true },
    aviso: { type: Boolean, default: true },
    avisoEnviado: { type: Boolean, default: false },
    estado: {
        type: String,
        enum: ['pendiente', 'aplicada', 'omitida'],
        default: 'pendiente',
    },
}, { _id: true });

const historialModSchema = new Schema({
    fecha: { type: Date, default: Date.now },
    usuarioId: { type: Schema.Types.ObjectId, ref: 'User' },
    cambios: { type: String },
}, { _id: false });

const supervisionPautaSchema = new Schema(
    {
        codigo: { type: String, required: true, unique: true, trim: true },
        nombre: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },

        indicatorIds: [{ type: Schema.Types.ObjectId, ref: 'Indicator', required: true }],

        criterios: [criterioPautaSchema],

        responsableId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        suplenteId: { type: Schema.Types.ObjectId, ref: 'User' },
        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization' },

        frecuencia: {
            type: String,
            enum: ['mensual', 'trimestral', 'semestral', 'anual'],
            required: true,
        },

        planificaciones: [planificacionSchema],

        vigente: { type: Boolean, default: true },
        fechaInicioVigencia: { type: Date, required: true },
        fechaFinVigencia: { type: Date },

        historialModificaciones: [historialModSchema],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

supervisionPautaSchema.index({ indicatorIds: 1 });
supervisionPautaSchema.index({ responsableId: 1, vigente: 1 });

const SupervisionPauta = mongoose.model('SupervisionPauta', supervisionPautaSchema, 'supervision_pautas');

export default SupervisionPauta;
