import instance from '../apis/app.js';

class AcreditacionService {
  pautas = () => instance.get('/api/acreditacion/pautas');
  autoevaluaciones = (params) => instance.get('/api/acreditacion/autoevaluaciones', { params });
  getAutoevaluacion = (id) => instance.get(`/api/acreditacion/autoevaluaciones/${id}`);
  createAutoevaluacion = (data) => instance.post('/api/acreditacion/autoevaluaciones', data);
  updateAutoevaluacion = (id, data) =>
    instance.put(`/api/acreditacion/autoevaluaciones/${id}`, data);
  evaluarElemento = (autoevalId, emId, data) =>
    instance.put(`/api/acreditacion/autoevaluaciones/${autoevalId}/elementos/${emId}`, data);
  finalizar = (id) => instance.post(`/api/acreditacion/autoevaluaciones/${id}/finalizar`);
}

const Acreditacion = new AcreditacionService();
export default Acreditacion;
