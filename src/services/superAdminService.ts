import { apiGet, apiPost, apiPut, apiDelete } from './api';

export interface Admin {
  _id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    fullName: string;
    avatar?: string;
    phone?: string;
  };
  organization?: {
    _id: string;
    name: string;
    contactInfo: {
      email: string;
    };
    subscription?: {
      plan: string;
    };
  };
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
  role: 'admin';
}

export interface Organization {
  _id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  contactInfo: {
    email: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    };
  };
  subscription: {
    plan: 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'inactive' | 'suspended' | 'trial';
    startDate: string;
    endDate: string;
    daysRemaining?: number;
    features: string[];
  };
  settings: {
    allowSelfRegistration: boolean;
    maxUsers: number;
    maxProjects: number;
    customDomain?: string;
    branding: {
      primaryColor: string;
      logoUrl?: string;
    };
  };
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalProjects: number;
    activeProjects: number;
    lastActivityAt: string;
  };
  isActive: boolean;
  healthScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  users: {
    total: number;
    superAdmins: number;
    admins: number;
    managers: number;
    developers: number;
    clients: number;
    recentlyAdded: number;
  };
  organizations: {
    total: number;
    active: number;
    recentlyAdded: number;
  };
  projects: {
    total: number;
  };
  system: {
    uptime: number;
    nodeVersion: string;
    environment: string;
  };
}

export interface UserAnalytics {
  period: string;
  startDate: string;
  endDate: string;
  trends: {
    admins: Array<{ _id: string; count: number }>;
    managers: Array<{ _id: string; count: number }>;
    developers: Array<{ _id: string; count: number }>;
    clients: Array<{ _id: string; count: number }>;
  };
  roleDistribution: {
    admins: number;
    managers: number;
    developers: number;
    clients: number;
  };
}

export interface CreateAdminData {
  email: string;
  password?: string;
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
  };
  organization?: string;
  permissions?: string[];
  sendWelcome?: boolean;
  useCustomPassword?: boolean;
}

export interface CreateOrganizationData {
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  contactInfo: {
    email: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      country?: string;
      zipCode?: string;
    };
  };
  subscription?: {
    plan?: 'basic' | 'premium' | 'enterprise';
    status?: 'active' | 'inactive' | 'suspended' | 'trial';
    features?: string[];
  };
  settings?: {
    allowSelfRegistration?: boolean;
    maxUsers?: number;
    maxProjects?: number;
    customDomain?: string;
    branding?: {
      primaryColor?: string;
      logoUrl?: string;
    };
  };
}

class SuperAdminService {
  // ==================== ADMIN MANAGEMENT ====================
  
  async getAdmins(params?: {
    page?: number;
    limit?: number;
    search?: string;
    organization?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiGet<{
      success: boolean;
      data: {
        docs: Admin[];
        totalDocs: number;
        limit: number;
        page: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
      };
    }>(`/super-admin/admins?${queryParams}`);
  }

  async getAdmin(id: string) {
    return apiGet<{
      success: boolean;
      data: { admin: Admin };
    }>(`/super-admin/admins/${id}`);
  }

  async createAdmin(data: CreateAdminData) {
    return apiPost<{
      success: boolean;
      message: string;
      data: { admin: Admin; tempPassword?: string };
    }>('/super-admin/admins', data);
  }

  async updateAdmin(id: string, data: Partial<CreateAdminData & { isActive: boolean }>) {
    return apiPut<{
      success: boolean;
      message: string;
      data: { admin: Admin };
    }>(`/super-admin/admins/${id}`, data);
  }

  async deleteAdmin(id: string) {
    return apiDelete<{
      success: boolean;
      message: string;
    }>(`/super-admin/admins/${id}`);
  }

  async resetAdminPassword(id: string) {
    return apiPost<{
      success: boolean;
      message: string;
      data?: { tempPassword: string };
    }>(`/super-admin/admins/${id}/reset-password`);
  }

  // ==================== ANALYTICS & REPORTING ====================

  async getDashboardStats() {
    return apiGet<{
      success: boolean;
      data: DashboardStats;
    }>('/super-admin/analytics/dashboard');
  }

  async getUserAnalytics(period: '7d' | '30d' | '90d' | '1y' = '30d') {
    return apiGet<{
      success: boolean;
      data: UserAnalytics;
    }>(`/super-admin/analytics/users?period=${period}`);
  }

  // ==================== ORGANIZATION MANAGEMENT ====================

  async getOrganizations(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    plan?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiGet<{
      success: boolean;
      data: {
        docs: Organization[];
        totalDocs: number;
        limit: number;
        page: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
      };
    }>(`/super-admin/organizations?${queryParams}`);
  }

  async getOrganization(id: string) {
    return apiGet<{
      success: boolean;
      data: { 
        organization: Organization & {
          userStats: {
            admins: number;
            managers: number;
            developers: number;
            clients: number;
            total: number;
          };
        };
      };
    }>(`/super-admin/organizations/${id}`);
  }

  async createOrganization(data: CreateOrganizationData) {
    return apiPost<{
      success: boolean;
      message: string;
      data: { organization: Organization };
    }>('/super-admin/organizations', data);
  }

  async updateOrganization(id: string, data: Partial<CreateOrganizationData>) {
    return apiPut<{
      success: boolean;
      message: string;
      data: { organization: Organization };
    }>(`/super-admin/organizations/${id}`, data);
  }

  async deleteOrganization(id: string) {
    return apiDelete<{
      success: boolean;
      message: string;
    }>(`/super-admin/organizations/${id}`);
  }

  async getOrganizationUsers(id: string, params?: {
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    return apiGet<{
      success: boolean;
      data: {
        users: Array<{
          _id: string;
          email: string;
          profile: {
            firstName: string;
            lastName: string;
            fullName: string;
          };
          role: string;
          isActive: boolean;
          lastLogin?: string;
          createdAt: string;
        }>;
        totalUsers: number;
        summary: {
          admins: number;
          managers: number;
          developers: number;
          clients: number;
        };
      };
    }>(`/super-admin/organizations/${id}/users?${queryParams}`);
  }
}

export const superAdminService = new SuperAdminService();
export default superAdminService;
