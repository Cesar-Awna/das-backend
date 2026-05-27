import connectMongoDB from '../../libs/mongoose.js';
import Indicator from '../../models/Indicator.js';
import IndicatorMeasurement from '../../models/IndicatorMeasurement.js';
import SupervisionPauta from '../../models/SupervisionPauta.js';
import SupervisionAplicacion from '../../models/SupervisionAplicacion.js';
import Document from '../../models/Document.js';
import AdverseEvent from '../../models/AdverseEvent.js';

export default class WorkspaceService {
    constructor() {
        connectMongoDB();
    }

    // Ítem 5.a: Ingreso de datos de indicadores y pautas en una sola ventana
    pendientes = async (userId) => {
        try {
            const [indicadores, pautas, eventos] = await Promise.all([
                Indicator.find({
                    $or: [{ responsableId: userId }, { suplenteId: userId }],
                    vigente: true,
                }).lean(),
                SupervisionPauta.find({
                    $or: [{ responsableId: userId }, { suplenteId: userId }],
                    vigente: true,
                    'planificaciones.estado': 'pendiente',
                }).lean(),
                AdverseEvent.find({
                    'gestion.gestorId': userId,
                    estado: { $in: ['verificado', 'en_gestion'] },
                }).lean(),
            ]);

            return {
                success: true,
                message: 'OK',
                data: { indicadores, pautas, eventos },
            };
        } catch (error) {
            console.error('❌ Servicio - Error al obtener pendientes:', error);
            return { success: false, message: 'Error inesperado' };
        }
    };

    cargarIndicadorYPauta = async ({ indicadorData, pautaData }, userId) => {
        try {
            const result = {};
            if (indicadorData) {
                const ind = await Indicator.findById(indicadorData.indicatorId);
                if (ind) {
                    const { numerador, denominador } = indicadorData;
                    if (denominador === 0) return { success: false, message: 'Denominador no puede ser 0' };
                    const resultado = numerador / denominador;
                    const porcentaje = resultado * 100;
                    const cumple = porcentaje >= ind.umbralCumplimiento;
                    const measurement = await IndicatorMeasurement.create({
                        ...indicadorData,
                        resultado,
                        porcentajeCumplimiento: porcentaje,
                        cumple,
                        registradoPor: userId,
                    });
                    result.medicion = measurement.toObject();
                }
            }
            if (pautaData) {
                const total = pautaData.evaluacionCriterios?.length || 0;
                const cumplen = pautaData.evaluacionCriterios?.filter((e) => e.cumple).length || 0;
                const porcentaje = total > 0 ? (cumplen / total) * 100 : 0;
                const aplicacion = await SupervisionAplicacion.create({
                    ...pautaData,
                    porcentajeCumplimiento: porcentaje,
                    aplicadoPor: userId,
                });
                result.aplicacion = aplicacion.toObject();
            }
            return { success: true, message: 'Datos cargados', data: result };
        } catch (error) {
            console.error('❌ Servicio - Error al cargar datos:', error);
            return { success: false, message: error.message || 'Error inesperado' };
        }
    };

    // Ítem 5.b: Búsqueda documental con identificación de vencidos/por vencer
    searchGlobal = async ({ q }) => {
        try {
            if (!q) return { success: true, message: 'OK', data: { documentos: [], indicadores: [], pautas: [], eventos: [] } };
            const regex = { $regex: q, $options: 'i' };
            const [documentos, indicadores, pautas, eventos] = await Promise.all([
                Document.find({ $or: [{ nombre: regex }, { codigo: regex }, { descripcion: regex }] }).limit(20).lean(),
                Indicator.find({ $or: [{ nombre: regex }, { codigo: regex }] }).limit(20).lean(),
                SupervisionPauta.find({ $or: [{ nombre: regex }, { codigo: regex }] }).limit(20).lean(),
                AdverseEvent.find({ $or: [{ numeroCaso: regex }, { descripcion: regex }] }).limit(20).lean(),
            ]);
            return { success: true, message: 'OK', data: { documentos, indicadores, pautas, eventos } };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    searchDocuments = async ({ q, estado } = {}) => {
        try {
            const query = { estado: 'activo' };
            if (q) {
                query.$or = [
                    { nombre: { $regex: q, $options: 'i' } },
                    { codigo: { $regex: q, $options: 'i' } },
                    { descripcion: { $regex: q, $options: 'i' } },
                ];
            }
            const docs = await Document.find(query).lean();

            const now = new Date();
            const limite = new Date();
            limite.setDate(now.getDate() + 30);

            const result = docs.map((d) => {
                const versionVigente = d.versiones.find((v) => String(v._id) === String(d.versionVigenteId));
                let estadoVencimiento = 'vigente';
                if (versionVigente?.fechaVencimiento) {
                    const fv = new Date(versionVigente.fechaVencimiento);
                    if (fv < now) estadoVencimiento = 'vencido';
                    else if (fv <= limite) estadoVencimiento = 'por_vencer';
                }
                return { ...d, estadoVencimiento, versionVigente };
            });

            if (estado) return { success: true, message: 'OK', data: result.filter((d) => d.estadoVencimiento === estado) };
            return { success: true, message: 'OK', data: result };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    // Ítem 5.c: Cálculo del tamaño muestral
    sampleSize = ({ poblacion, confianza = 95, error = 5 }) => {
        try {
            const N = Number(poblacion);
            if (!N || N <= 0) return { success: false, message: 'Población debe ser mayor a 0' };

            const zValues = { 80: 1.28, 85: 1.44, 90: 1.645, 95: 1.96, 99: 2.576 };
            const z = zValues[confianza] || 1.96;
            const p = 0.5;
            const e = Number(error) / 100;

            const numerador = (z * z * p * (1 - p)) / (e * e);
            const muestra = Math.ceil(numerador / (1 + (z * z * p * (1 - p)) / (e * e * N)));

            return {
                success: true,
                message: 'OK',
                data: { poblacion: N, confianza, error, muestra },
            };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    // Ítem 5.d: Información para la gestión
    dashboardKpis = async () => {
        try {
            const [totalDocumentos, documentosPorVencer, totalIndicadores, totalEventos, eventosAbiertos] =
                await Promise.all([
                    Document.countDocuments({ estado: 'activo' }),
                    Document.countDocuments({
                        estado: 'activo',
                        'versiones.fechaVencimiento': {
                            $gte: new Date(),
                            $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                        },
                    }),
                    Indicator.countDocuments({ vigente: true }),
                    AdverseEvent.countDocuments(),
                    AdverseEvent.countDocuments({ estado: { $in: ['notificado', 'verificado', 'en_gestion'] } }),
                ]);

            return {
                success: true,
                message: 'OK',
                data: {
                    totalDocumentos,
                    documentosPorVencer,
                    totalIndicadores,
                    totalEventos,
                    eventosAbiertos,
                },
            };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    medicionesConsolidadas = async () => {
        try {
            const items = await IndicatorMeasurement.aggregate([
                {
                    $group: {
                        _id: '$periodo',
                        total: { $sum: 1 },
                        cumplen: { $sum: { $cond: ['$cumple', 1, 0] } },
                        promedioCumplimiento: { $avg: '$porcentajeCumplimiento' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);
            return { success: true, message: 'OK', data: items };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    respaldos = async () => {
        try {
            const measurements = await IndicatorMeasurement.find({ 'respaldos.0': { $exists: true } })
                .populate('respaldos')
                .lean();
            return { success: true, message: 'OK', data: measurements };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };
}
