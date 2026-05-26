import mongoose from 'mongoose';

const { Schema } = mongoose;

const formFieldSchema = new Schema({
    nombre: { type: String, required: true },
    label: { type: String, required: true },
    tipo: {
        type: String,
        enum: ['text', 'textarea', 'number', 'date', 'datetime', 'select', 'multiselect', 'file', 'checkbox', 'radio'],
        required: true,
    },
    opciones: [{ type: String }],
    obligatorio: { type: Boolean, default: false },
    orden: { type: Number },
    validaciones: { type: Schema.Types.Mixed },
}, { _id: true });

const eventFormSchema = new Schema(
    {
        nombre: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },
        ambitoId: { type: Schema.Types.ObjectId, ref: 'EventCatalog' },
        tipoEventoId: { type: Schema.Types.ObjectId, ref: 'EventCatalog' },
        campos: [formFieldSchema],
        vigente: { type: Boolean, default: true },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const EventForm = mongoose.model('EventForm', eventFormSchema, 'event_forms');

export default EventForm;
