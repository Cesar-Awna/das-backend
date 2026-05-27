import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificacionEnviadaSchema = new Schema({
    destinatarioId: { type: Schema.Types.ObjectId, ref: 'User' },
    tipo: { type: String },
    fecha: { type: Date },
}, { _id: false });

const resumenEnviadoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    fechaEnvio: { type: Date },
}, { _id: false });

const adverseEventSchema = new Schema(
    {
        numeroCaso: { type: String, required: true, unique: true, trim: true },

        fechaEvento: { type: Date, required: true },
        fechaNotificacion: { type: Date, default: Date.now },

        ambitoId: { type: Schema.Types.ObjectId, ref: 'EventCatalog' },
        tipoEventoId: { type: Schema.Types.ObjectId, ref: 'EventCatalog' },
        gravedad: {
            type: String,
            enum: ['leve', 'moderado', 'grave', 'centinela'],
        },

        organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
        ubicacion: { type: String },

        descripcion: { type: String, required: true },
        datosFormulario: { type: Schema.Types.Mixed },

        pacienteInvolucrado: {
            identificador: { type: String },
            sinIdentificacion: { type: Boolean, default: false },
        },
        personalInvolucrado: [{ type: String }],

        evidencias: [{ type: Schema.Types.ObjectId, ref: 'File' }],

        notificadoPor: { type: Schema.Types.ObjectId, ref: 'User' },
        anonimo: { type: Boolean, default: false },

        estado: {
            type: String,
            enum: ['notificado', 'verificado', 'rechazado', 'en_gestion', 'cerrado'],
            default: 'notificado',
        },

        verificacion: {
            esNotificable: { type: Boolean },
            motivoRechazo: { type: String },
            verificadoPor: { type: Schema.Types.ObjectId, ref: 'User' },
            verificadoEn: { type: Date },
        },

        gestion: {
            gestorId: { type: Schema.Types.ObjectId, ref: 'User' },
            causasDetonantes: [{ type: String }],
            pacientesIgualSituacion: { type: String },
            medidasPreventivasAplicables: [{ type: Schema.Types.ObjectId, ref: 'EventCatalog' }],
            resumenFinal: { type: String },
            resumenEnviadoA: [resumenEnviadoSchema],
        },

        improvementPlanId: { type: Schema.Types.ObjectId, ref: 'ImprovementPlan' },

        notificacionesEnviadas: [notificacionEnviadaSchema],

        cerradoPor: { type: Schema.Types.ObjectId, ref: 'User' },
        cerradoEn: { type: Date },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

adverseEventSchema.index({ numeroCaso: 1 });
adverseEventSchema.index({ organizationId: 1, fechaEvento: -1 });
adverseEventSchema.index({ estado: 1 });
adverseEventSchema.index({ ambitoId: 1, tipoEventoId: 1 });

const AdverseEvent = mongoose.model('AdverseEvent', adverseEventSchema, 'adverse_events');

export default AdverseEvent;
