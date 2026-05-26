import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventCatalogSchema = new Schema(
    {
        tipo: {
            type: String,
            enum: ['ambito', 'categoria', 'tipo_evento', 'medida_preventiva'],
            required: true,
        },
        codigo: { type: String, required: true, trim: true },
        nombre: { type: String, required: true, trim: true },
        descripcion: { type: String, trim: true },

        parentId: { type: Schema.Types.ObjectId, ref: 'EventCatalog' },

        gravedad: {
            type: String,
            enum: ['leve', 'moderado', 'grave', 'centinela'],
        },
        notificacionObligatoria: { type: Boolean, default: false },

        medidasPreventivasIds: [{ type: Schema.Types.ObjectId, ref: 'EventCatalog' }],

        activo: { type: Boolean, default: true },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

eventCatalogSchema.index({ tipo: 1, activo: 1 });
eventCatalogSchema.index({ parentId: 1 });

const EventCatalog = mongoose.model('EventCatalog', eventCatalogSchema, 'event_catalogs');

export default EventCatalog;
