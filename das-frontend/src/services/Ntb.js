import instance from '../apis/app.js';

class NtbService {
  pautas = () => instance.get('/api/ntb/pautas');
  evaluaciones = (params) => instance.get('/api/ntb/evaluaciones', { params });
  getEvaluacion = (id) => instance.get(`/api/ntb/evaluaciones/${id}`);
  createEvaluacion = (data) => instance.post('/api/ntb/evaluaciones', data);
  updateEvaluacion = (id, data) => instance.put(`/api/ntb/evaluaciones/${id}`, data);
  informeValorizado = (id) => instance.get(`/api/ntb/evaluaciones/${id}/informe-valorizado`);
  historial = (id) => instance.get(`/api/ntb/evaluaciones/${id}/historial`);
}

const Ntb = new NtbService();
export default Ntb;
