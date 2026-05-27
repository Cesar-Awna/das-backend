import mongoose from 'mongoose';

const { Schema } = mongoose;

const ntbRequisitoSchema = new Schema({
    codigo: { type: String, required: true },
    descripcion: { type: String, required: true },
    categoria: {
        type: String,
        enum: ['infraestructura', 'equipamiento', 'rrhh', 'organizacion', 'otro'],
    },
    costoReferencial: { type: Number, default: 0 },
}, { _id: true });

const ntbPautaSchema = new Schema(
    {
        nombre: { type: String, required: true, trim: true },
        version: { type: String, required: true, trim: true },
        tipoEstablecimiento: { type: String, trim: true },
        vigente: { type: Boolean, default: true },
        requisitos: [ntbRequisitoSchema],
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const NtbPauta = mongoose.model('NtbPauta', ntbPautaSchema, 'ntb_pautas');

export default NtbPauta;
