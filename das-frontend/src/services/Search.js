import instance from '../apis/app.js';

class SearchService {
  global = (q, filters) => instance.get('/api/search', { params: { q, ...filters } });
}

export default new SearchService();
