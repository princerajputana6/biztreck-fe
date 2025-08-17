const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Debug logging
    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    console.log('Headers:', config.headers);
    if (options.body) {
      console.log('Body:', options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      console.log(`📡 API Response: ${response.status} ${response.statusText}`);
      console.log('Response data:', data);

      if (!response.ok) {
        // Handle authentication errors
        if (response.status === 401) {
          console.log('🔒 Authentication failed, clearing token');
          // Clear invalid token
          localStorage.removeItem('token');
          
          // Dispatch clearTokens action to update Redux state
          if (window.store) {
            window.store.dispatch({ type: 'auth/clearTokens' });
          }
          
          // Redirect to login if not already there
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        }
        
        throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('❌ API request failed:', error);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection.');
      }
      
      throw error;
    }
  }

  // GET request
  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  // POST request
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  // PUT request
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }

  // PATCH request
  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...options,
    });
  }

  // Check if token is valid
  isTokenValid() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      // Basic token validation (you can add more sophisticated checks)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      console.log('Token validation - payload:', payload);
      console.log('Token validation - current time:', currentTime);
      console.log('Token validation - token exp:', payload.exp);
      console.log('Token validation - is valid:', payload.exp > currentTime);
      
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('token');
      return false;
    }
  }

  // Clear token
  clearToken() {
    localStorage.removeItem('token');
  }
}

const api = new ApiClient();
export default api;
