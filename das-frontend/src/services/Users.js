import instance from '../apis/app.js';

class UsersService {
  list = (params) => instance.get('/api/users', { params });
  getById = (id) => instance.get(`/api/users/${id}`);
  create = (data) => instance.post('/api/users', data);
  update = (id, data) => instance.put(`/api/users/${id}`, data);
  delete = (id) => instance.delete(`/api/users/${id}`);
  stats = () => instance.get('/api/users/stats');
}

const Users = new UsersService();
export default Users;
