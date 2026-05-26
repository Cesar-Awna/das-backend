import instance from '../apis/app.js';

class EventsService {
  list = (params) => instance.get('/api/events', { params });
  getById = (id) => instance.get(`/api/events/${id}`);
  notify = (data) => instance.post('/api/events/notify', data);
  verify = (id, data) => instance.post(`/api/events/${id}/verify`, data);
  manage = (id, data) => instance.put(`/api/events/${id}/manage`, data);
  sendSummary = (id, data) => instance.post(`/api/events/${id}/send-summary`, data);
  stats = () => instance.get('/api/events/stats');
  // Catálogos
  ambitos = () => instance.get('/api/events/catalog/ambitos');
  tipos = () => instance.get('/api/events/catalog/tipos');
  medidas = () => instance.get('/api/events/catalog/medidas');
  formularios = () => instance.get('/api/events/catalog/formularios');
  createCatalog = (kind, data) => instance.post(`/api/events/catalog/${kind}`, data);
  updateCatalog = (kind, id, data) => instance.put(`/api/events/catalog/${kind}/${id}`, data);
  deleteCatalog = (kind, id) => instance.delete(`/api/events/catalog/${kind}/${id}`);
}

const Events = new EventsService();
export default Events;
