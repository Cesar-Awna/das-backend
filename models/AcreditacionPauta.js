import mongoose from 'mongoose';

const { Schema } = mongoose;

const elementoMedibleSchema = new Schema({
    codigo: { type: String, required: true },
    descripcion: { type: String, required: true },
    puntosVerificacion: [{ type: String }],
    obligatorio: { type: Boolean, default: false },
}, { _id: true });

const caracteristicaSchema = new Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    obligatoria: { type: Boolean, default: false },
    elementosMedibles: [elementoMedibleSchema],
}, { _id: true });

const ambitoSchema = new Schema({
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    caracteristicas: [caracteristicaSchema],
}, { _id: true });

const acreditacionPautaSchema = new Schema(
    {
        nombre: { type: String, required: true, trim: true },
        version: { type: String, required: true, trim: true },
        periodo: { type: String, required: true, trim: true },
        vigente: { type: Boolean, default: true },
        ambitos: [ambitoSchema],
        creadoPor: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

acreditacionPautaSchema.index({ vigente: 1, periodo: 1 });

const AcreditacionPauta = mongoose.model('AcreditacionPauta', acreditacionPautaSchema, 'acreditacion_pautas');

export default AcreditacionPauta;
