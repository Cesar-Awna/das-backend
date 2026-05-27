import mongoose from 'mongoose';

const { Schema } = mongoose;

const fileSchema = new Schema(
    {
        nombre: { type: String, required: true, trim: true },
        nombreOriginal: { type: String, required: true, trim: true },
        mimeType: { type: String, required: true },
        tamano: { type: Number, required: true },

        ruta: { type: String, required: true },
        hash: { type: String },

        usoEnEntidad: {
            tipo: { type: String },
            id: { type: Schema.Types.ObjectId },
        },

        subidoPor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

fileSchema.index({ 'usoEnEntidad.tipo': 1, 'usoEnEntidad.id': 1 });

const File = mongoose.model('File', fileSchema, 'files');

export default File;
