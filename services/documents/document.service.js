import connectMongoDB from '../../libs/mongoose.js';
import Document from '../../models/Document.js';

export default class DocumentService {
    constructor() {
        connectMongoDB();
    }

    list = async (q = {}) => {
        try {
            const query = { estado: 'activo' };
            if (q.tipo) query.tipo = q.tipo;
            if (q.categoria) query.categorias = q.categoria;
            if (q.vista) query.vistas = q.vista;
            const docs = await Document.find(query).lean();
            return { success: true, message: 'OK', data: docs };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    create = async (body) => {
        try {
            const doc = await Document.create(body);
            return { success: true, message: 'Documento creado', data: doc.toObject() };
        } catch (error) {
            return { success: false, message: error.message || 'Error al crear documento' };
        }
    };

    getById = async (id) => {
        try {
            const doc = await Document.findById(id).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            return { success: true, message: 'OK', data: doc };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    update = async (id, body) => {
        try {
            const doc = await Document.findByIdAndUpdate(id, body, { new: true }).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            return { success: true, message: 'Documento actualizado', data: doc };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    delete = async (id) => {
        try {
            const doc = await Document.findByIdAndUpdate(id, { estado: 'archivado' }, { new: true }).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            return { success: true, message: 'Documento archivado', data: doc };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    preview = async (id) => {
        try {
            const doc = await Document.findById(id).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            const versionVigente = doc.versiones.find((v) => String(v._id) === String(doc.versionVigenteId));
            return { success: true, message: 'OK', data: { documento: doc, versionVigente } };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    download = async (id) => {
        try {
            const doc = await Document.findById(id).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            const versionVigente = doc.versiones.find((v) => String(v._id) === String(doc.versionVigenteId));
            if (!versionVigente) return { success: false, message: 'No hay versión vigente' };
            return { success: true, message: 'OK', data: { fileId: versionVigente.fileId } };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    createVersion = async (id, body, userId) => {
        try {
            const doc = await Document.findById(id);
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            const nuevaVersion = { ...body, creadoPor: userId, creadoEn: new Date() };
            doc.versiones.push(nuevaVersion);
            await doc.save();
            return { success: true, message: 'Nueva versión creada', data: doc.toObject() };
        } catch (error) {
            return { success: false, message: error.message || 'Error inesperado' };
        }
    };

    listVersions = async (id) => {
        try {
            const doc = await Document.findById(id).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            return { success: true, message: 'OK', data: doc.versiones };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    getVersion = async (id, versionId) => {
        try {
            const doc = await Document.findById(id).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            const v = doc.versiones.find((x) => String(x._id) === String(versionId));
            if (!v) return { success: false, message: 'Versión no encontrada' };
            return { success: true, message: 'OK', data: v };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    versionByPeriod = async (id, fecha) => {
        try {
            const doc = await Document.findById(id).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            const target = new Date(fecha);
            const candidatas = doc.versiones
                .filter((v) => v.estadoAprobacion === 'aprobada' && new Date(v.fechaEmision) <= target)
                .sort((a, b) => new Date(b.fechaEmision) - new Date(a.fechaEmision));
            const v = candidatas[0] || null;
            return { success: true, message: 'OK', data: v };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    archive = async (id) => {
        try {
            const doc = await Document.findByIdAndUpdate(id, { estado: 'archivado' }, { new: true }).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            return { success: true, message: 'Documento archivado', data: doc };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    restore = async (id) => {
        try {
            const doc = await Document.findByIdAndUpdate(id, { estado: 'activo' }, { new: true }).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            return { success: true, message: 'Documento restaurado', data: doc };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    expiring = async ({ dias = 30 } = {}) => {
        try {
            const limite = new Date();
            limite.setDate(limite.getDate() + Number(dias));
            const docs = await Document.find({
                estado: 'activo',
                'versiones.fechaVencimiento': { $gte: new Date(), $lte: limite },
            }).lean();
            return { success: true, message: 'OK', data: docs };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    expired = async () => {
        try {
            const docs = await Document.find({
                estado: 'activo',
                'versiones.fechaVencimiento': { $lt: new Date() },
            }).lean();
            return { success: true, message: 'OK', data: docs };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    addCategorias = async (id, categorias) => {
        try {
            const doc = await Document.findByIdAndUpdate(
                id,
                { $addToSet: { categorias: { $each: categorias || [] } } },
                { new: true }
            ).lean();
            if (!doc) return { success: false, message: 'Documento no encontrado' };
            return { success: true, message: 'Categorías agregadas', data: doc };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    listCategorias = async () => {
        try {
            const result = await Document.distinct('categorias');
            return { success: true, message: 'OK', data: result.filter(Boolean) };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };

    listHistoricos = async () => {
        try {
            const docs = await Document.find({ estado: 'archivado' }).lean();
            return { success: true, message: 'OK', data: docs };
        } catch (error) {
            return { success: false, message: 'Error inesperado' };
        }
    };
}
