import mongoose from 'mongoose';

const { Schema } = mongoose;

const notificationSchema = new Schema(
    {
        destinatarioId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

        tipo: {
            type: String,
            enum: [
                'documento_por_vencer',
                'documento_vencido',
                'pauta_programada',
                'indicador_retraso',
                'evento_notificado',
                'evento_verificado',
                'plan_mejora_actividad',
                'resumen_caso',
            ],
            required: true,
        },

        asunto: { type: String, required: true },
        mensaje: { type: String, required: true },

        entidadRelacionada: {
            tipo: { type: String },
            id: { type: Schema.Types.ObjectId },
        },

        canalEmail: {
            enviado: { type: Boolean, default: false },
            fechaEnvio: { type: Date },
            error: { type: String },
        },

        canalInApp: {
            leida: { type: Boolean, default: false },
            fechaLectura: { type: Date },
        },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

notificationSchema.index({ destinatarioId: 1, 'canalInApp.leida': 1 });
notificationSchema.index({ tipo: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema, 'notifications');

export default Notification;
