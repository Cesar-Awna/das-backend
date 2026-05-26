import instance from '../apis/app.js';

class AuditService {
  logs = (params) => instance.get('/api/audit/logs', { params });
}

export default new AuditService();
