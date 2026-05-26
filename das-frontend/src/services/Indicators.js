import instance from '../apis/app.js';

class IndicatorsService {
  list = (params) => instance.get('/api/indicators', { params });
  getById = (id) => instance.get(`/api/indicators/${id}`);
  create = (data) => instance.post('/api/indicators', data);
  update = (id, data) => instance.put(`/api/indicators/${id}`, data);
  delete = (id) => instance.delete(`/api/indicators/${id}`);
  measurements = (id) => instance.get(`/api/indicators/${id}/measurements`);
  addMeasurement = (id, data) => instance.post(`/api/indicators/${id}/measurements`, data);
  stats = () => instance.get('/api/indicators/stats');
  globalCompliance = (period) =>
    instance.get('/api/indicators/global-compliance', { params: { period } });
  compare = (periodA, periodB) =>
    instance.get('/api/indicators/compare', { params: { periodA, periodB } });
}

const Indicators = new IndicatorsService();
export default Indicators;
