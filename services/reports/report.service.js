import connectMongoDB from '../../libs/mongoose.js';
import AcreditacionAutoevaluacion from '../../models/AcreditacionAutoevaluacion.js';
import AdverseEvent from '../../models/AdverseEvent.js';
import NtbEvaluacion from '../../models/NtbEvaluacion.js';
import Document from '../../models/Document.js';

export default class ReportService {
    constructor() {
        connectMongoDB();
    }

    acreditacionPdf = async (q = {}) => {
        try {
            const query = {};
            if (q.organizationId) query.organizationId = q.organizationId;
            if (q.periodo) query.periodo = q.periodo;
            const data = await AcreditacionAutoevaluacion.find(query).lean();
            // En esta versión devolvemos los datos crudos.
            // Para PDF real se generaría con pdfkit/puppeteer y se enviaría el archivo.
            return { success: true, message: 'OK', data: { tipo: 'acreditacion', items: data } };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    eventosPdf = async (q = {}) => {
        try {
            const query = {};
            if (q.organizationId) query.organizationId = q.organizationId;
            if (q.desde || q.hasta) {
                query.fechaEvento = {};
                if (q.desde) query.fechaEvento.$gte = new Date(q.desde);
                if (q.hasta) query.fechaEvento.$lte = new Date(q.hasta);
            }
            const data = await AdverseEvent.find(query).lean();
            return { success: true, message: 'OK', data: { tipo: 'eventos', items: data } };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    ntbPdf = async (q = {}) => {
        try {
            const query = {};
            if (q.organizationId) query.organizationId = q.organizationId;
            const data = await NtbEvaluacion.find(query).lean();
            return { success: true, message: 'OK', data: { tipo: 'ntb', items: data } };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    documentalPdf = async (q = {}) => {
        try {
            const query = { estado: 'activo' };
            if (q.tipo) query.tipo = q.tipo;
            const data = await Document.find(query).lean();
            return { success: true, message: 'OK', data: { tipo: 'documental', items: data } };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    custom = async (body) => {
        try {
            // Reporte personalizado: recibe el modelo objetivo, filtros y campos
            const { entidad, filtros = {}, campos = [] } = body;
            const modelos = {
                acreditacion: AcreditacionAutoevaluacion,
                eventos: AdverseEvent,
                ntb: NtbEvaluacion,
                documentos: Document,
            };
            const Model = modelos[entidad];
            if (!Model) return { success: false, message: 'Entidad no soportada' };

            let query = Model.find(filtros);
            if (campos.length > 0) query = query.select(campos.join(' '));
            const data = await query.lean();
            return { success: true, message: 'OK', data };
        } catch (error) {
            return { success: false, message: error.message || 'Error en reporte personalizado' };
        }
    };
}
