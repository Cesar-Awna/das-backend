import instance from '../apis/app.js';

class OrganizationsService {
  tree = () => instance.get('/api/organizations/tree');
  list = (params) => instance.get('/api/organizations', { params });
  getById = (id) => instance.get(`/api/organizations/${id}`);
  create = (data) => instance.post('/api/organizations', data);
  update = (id, data) => instance.put(`/api/organizations/${id}`, data);
  delete = (id) => instance.delete(`/api/organizations/${id}`);
  assignUser = (orgId, userId, role) =>
    instance.post(`/api/organizations/${orgId}/users`, { userId, role });
}

const Organizations = new OrganizationsService();
export default Organizations;
