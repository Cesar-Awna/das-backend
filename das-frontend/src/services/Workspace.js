import instance from '../apis/app.js';

class WorkspaceService {
  myTasks = () => instance.get('/api/workspace/my-tasks');
  unifiedSubmit = (data) => instance.post('/api/workspace/unified-submit', data);
}

export default new WorkspaceService();
