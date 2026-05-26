import instance from '../apis/app.js';

class DocumentsService {
  list = (params) => instance.get('/api/documents', { params });
  getById = (id) => instance.get(`/api/documents/${id}`);
  versions = (id) => instance.get(`/api/documents/${id}/versions`);
  getVersion = (id, version) => instance.get(`/api/documents/${id}/versions/${version}`);
  byPeriod = (period) => instance.get('/api/documents/by-period', { params: { period } });
  create = (data) => instance.post('/api/documents', data);
  update = (id, data) => instance.put(`/api/documents/${id}`, data);
  newVersion = (id, data) => instance.post(`/api/documents/${id}/versions`, data);
  approve = (id) => instance.post(`/api/documents/${id}/approve`);
  archive = (id) => instance.post(`/api/documents/${id}/archive`);
  preview = (id) => instance.get(`/api/documents/${id}/preview`);
  expiringSoon = () => instance.get('/api/documents/expiring-soon');
  stats = () => instance.get('/api/documents/stats');
}

const Documents = new DocumentsService();
export default Documents;
