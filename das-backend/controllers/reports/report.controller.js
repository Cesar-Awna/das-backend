import ReportService from '../../services/reports/report.service.js';

const service = new ReportService();

const handle = (fn) => async (req, res) => {
    try {
        const response = await fn(req);
        return res.status(response.success ? 200 : 400).json(response);
    } catch (error) {
        console.error('❌ Controller - Error:', error);
        return res.status(500).json({ success: false, message: 'Error inesperado' });
    }
};

export default class ReportController {
    acreditacionPdf = handle((req) => service.acreditacionPdf(req.query));
    eventosPdf = handle((req) => service.eventosPdf(req.query));
    ntbPdf = handle((req) => service.ntbPdf(req.query));
    documentalPdf = handle((req) => service.documentalPdf(req.query));
    custom = handle((req) => service.custom(req.body));
}
