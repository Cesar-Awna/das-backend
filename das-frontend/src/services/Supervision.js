import instance from '../apis/app.js';

class SupervisionService {
  pautas = (params) => instance.get('/api/supervision/pautas', { params });
  getPauta = (id) => instance.get(`/api/supervision/pautas/${id}`);
  createPauta = (data) => instance.post('/api/supervision/pautas', data);
  updatePauta = (id, data) => instance.put(`/api/supervision/pautas/${id}`, data);
  aplicaciones = (params) => instance.get('/api/supervision/aplicaciones', { params });
  aplicar = (pautaId, data) => instance.post(`/api/supervision/pautas/${pautaId}/aplicar`, data);
  programar = (pautaId, data) => instance.post(`/api/supervision/pautas/${pautaId}/programar`, data);
  consolidado = (params) => instance.get('/api/supervision/consolidado', { params });
}

const Supervision = new SupervisionService();
export default Supervision;
