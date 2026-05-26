import mongoose from 'mongoose';

const { Schema } = mongoose;

const organizationSchema = new Schema(
    {
        nombre: { type: String, required: true, trim: true },
        tipo: {
            type: String,
            enum: ['servicio', 'area', 'unidad'],
            required: true,
        },
        parentId: { type: Schema.Types.ObjectId, ref: 'Organization', default: null },
        codigo: { type: String, trim: true },
        descripcion: { type: String, trim: true },
        responsableId: { type: Schema.Types.ObjectId, ref: 'User' },
        suplenteId: { type: Schema.Types.ObjectId, ref: 'User' },
        activo: { type: Boolean, default: true },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

organizationSchema.index({ parentId: 1 });
organizationSchema.index({ tipo: 1 });

const Organization = mongoose.model('Organization', organizationSchema, 'organizations');

export default Organization;
