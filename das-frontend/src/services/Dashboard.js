import instance from '../apis/app.js';

class DashboardService {
  summary = () => instance.get('/api/dashboard/summary');
  activity = () => instance.get('/api/dashboard/activity');
}

export default new DashboardService();
