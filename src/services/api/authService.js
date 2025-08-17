import api from './apiClient';

class AuthService {
  async register(userData) {
    const data = await api.post('/api/auth/register', userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async login(credentials) {
    const data = await api.post('/api/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async logout() {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
    }
  }

  async getProfile() {
    return api.get('/api/auth/profile');
  }

  async getUsers() {
    return api.get('/api/auth/users');
  }

  getToken() {
    return api.getToken();
  }

  isAuthenticated() {
    return api.isTokenValid();
  }

  // Clear token
  clearToken() {
    api.clearToken();
  }

  // Refresh token
  async refreshToken() {
    const data = await api.post('/api/auth/refresh');
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }
}

export default new AuthService();
