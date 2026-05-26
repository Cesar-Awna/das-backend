import instance from '../apis/app.js';

class ImprovementPlansService {
  list = (params) => instance.get('/api/improvement-plans', { params });
  getById = (id) => instance.get(`/api/improvement-plans/${id}`);
  create = (data) => instance.post('/api/improvement-plans', data);
  update = (id, data) => instance.put(`/api/improvement-plans/${id}`, data);
  addActivity = (id, data) => instance.post(`/api/improvement-plans/${id}/activities`, data);
  updateActivity = (planId, activityId, data) =>
    instance.put(`/api/improvement-plans/${planId}/activities/${activityId}`, data);
  uploadEvidence = (planId, activityId, formData) =>
    instance.post(`/api/improvement-plans/${planId}/activities/${activityId}/evidence`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
}

const ImprovementPlans = new ImprovementPlansService();
export default ImprovementPlans;
