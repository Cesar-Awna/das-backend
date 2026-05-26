import mongoose from 'mongoose';

const { Schema } = mongoose;

const rolFuncionalSchema = new Schema({
    tipo: {
        type: String,
        enum: ['responsable', 'suplente', 'jefatura', 'autoridad', 'gestor_eventos'],
    },
    entidad: { type: String },
    entidadId: { type: Schema.Types.ObjectId },
    vigenciaDesde: { type: Date },
    vigenciaHasta: { type: Date },
}, { _id: false });

const userSchema = new Schema(
    {
        rut: { type: String, required: true, unique: true, trim: true },
        nombre: { type: String, required: true, trim: true },
        apellido: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true },
        cargo: { type: String, trim: true },
        telefono: { type: String, trim: true },
        perfil: {
            type: String,
            enum: ['administrador', 'usuario'],
            required: true,
        },
        organizationIds: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
        rolesFuncionales: [rolFuncionalSchema],
        activo: { type: Boolean, default: true },
        ultimoAcceso: { type: Date },
        intentosFallidos: { type: Number, default: 0 },
        bloqueado: { type: Boolean, default: false },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

userSchema.index({ email: 1 });
userSchema.index({ rut: 1 });
userSchema.index({ organizationIds: 1 });

const User = mongoose.model('User', userSchema, 'users');

export default User;
