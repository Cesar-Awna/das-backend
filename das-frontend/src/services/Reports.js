import instance from '../apis/app.js';

class ReportsService {
  list = () => instance.get('/api/reports');
  generate = (kind, params) => instance.post(`/api/reports/${kind}/generate`, params);
  recent = () => instance.get('/api/reports/recent');
  download = (id) => instance.get(`/api/reports/${id}/download`, { responseType: 'blob' });
}

export default new ReportsService();
