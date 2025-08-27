import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/store/authStore';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token to requests
    const token = Cookies.get('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration
    if (error.response?.status === 401 && error.response?.data?.code === 'TOKEN_EXPIRED' && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Try to refresh the token
        const response = await axios.post('/api/auth/refresh', {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

        // Update tokens in store
        useAuthStore.getState().setAuth(
          useAuthStore.getState().user!,
          accessToken,
          newRefreshToken
        );

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        useAuthStore.getState().clearAuth();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response?.status === 403) {
      toast.error('Access denied. You don\'t have permission to perform this action.');
    } else if (error.response?.status === 404) {
      toast.error('Resource not found.');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (!error.response) {
      toast.error('Network error. Please check your connection.');
    }

    return Promise.reject(error);
  }
);

// API wrapper with error handling
export const apiRequest = async <T = any>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api(config);
    return response.data;
  } catch (error: any) {
    // Extract error message
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    
    // Don't show toast for auth endpoints (handled by components)
    if (!config.url?.includes('/auth/')) {
      toast.error(errorMessage);
    }
    
    throw error;
  }
};

// Convenience methods
export const apiGet = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  apiRequest<T>({ method: 'GET', url, ...config });

export const apiPost = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  apiRequest<T>({ method: 'POST', url, data, ...config });

export const apiPut = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  apiRequest<T>({ method: 'PUT', url, data, ...config });

export const apiPatch = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
  apiRequest<T>({ method: 'PATCH', url, data, ...config });

export const apiDelete = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
  apiRequest<T>({ method: 'DELETE', url, ...config });

export default api;
