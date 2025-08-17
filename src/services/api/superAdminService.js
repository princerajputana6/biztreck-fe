import api from './apiClient';

const superAdminService = {
  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get('/api/super-admin/dashboard');
    return response;
  },

  // Admin Management
  getAdmins: async (params = {}) => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.append('dateTo', params.dateTo);

    const response = await api.get(`/api/super-admin/admins?${queryParams.toString()}`);
    return response;
  },

  createAdmin: async (adminData) => {
    const response = await api.post('/api/super-admin/admins', adminData);
    return response;
  },

  updateAdminStatus: async (adminId, isActive) => {
    const response = await api.put(`/api/super-admin/admins/${adminId}/status`, { isActive });
    return response;
  },

  deleteAdmin: async (adminId) => {
    const response = await api.delete(`/api/super-admin/admins/${adminId}`);
    return response;
  },

  getAdminActivity: async (adminId) => {
    const response = await api.get(`/api/super-admin/admins/${adminId}/activity`);
    return response;
  }
};

export default superAdminService;
