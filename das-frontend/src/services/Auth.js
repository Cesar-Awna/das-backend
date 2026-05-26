import instance from '../apis/app.js';

class AuthService {
  login = (data) => instance.post('/api/auth/login', data);
  me = () => instance.get('/api/auth/me');
  logout = () => instance.post('/api/auth/logout');
}

const Auth = new AuthService();
export default Auth;
