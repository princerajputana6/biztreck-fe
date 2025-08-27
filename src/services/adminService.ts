import { apiGet, apiPost, apiPut, apiDelete } from './api';

export interface User {
  _id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    fullName?: string;
    avatar?: string;
    phone?: string;
  };
  role: 'admin' | 'manager' | 'developer' | 'client';
  organization?: {
    _id: string;
    name: string;
  };
  permissions: string[];
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'manager' | 'developer' | 'client';
  avatar?: string;
  organization?: string;
  
  // Role-specific fields
  developerProfile?: any;
  managerProfile?: any;
  clientProfile?: any;
  
  // Additional fields
  emergencyContact?: any;
  notes?: string;
  sendWelcome?: boolean;
}

export interface UpdateUserData {
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  role?: 'manager' | 'developer' | 'client';
  permissions?: string[];
  isActive?: boolean;
  organization?: string;
}

export interface Project {
  _id: string;
  name: string;
  description?: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  endDate?: string;
  progress: number;
  organization?: {
    _id: string;
    name: string;
  };
  manager?: {
    _id: string;
    profile: {
      firstName: string;
      lastName: string;
      fullName?: string;
    };
  };
  team?: Array<{
    _id: string;
    profile: {
      firstName: string;
      lastName: string;
      fullName?: string;
    };
    role: string;
  }>;
  client?: {
    _id: string;
    profile: {
      firstName: string;
      lastName: string;
      fullName?: string;
    };
  };
  budget?: {
    estimated: number;
    actual: number;
    currency: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  endDate: string;
  manager?: string;
  client?: string;
  budget?: {
    estimated: number;
    currency: string;
  };
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
  status?: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  startDate?: string;
  endDate?: string;
  manager?: string;
  client?: string;
  budget?: {
    estimated?: number;
    actual?: number;
    currency?: string;
  };
}

export interface UsersResponse {
  success: boolean;
  data: {
    docs: User[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export interface ProjectsResponse {
  success: boolean;
  data: {
    docs: Project[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  usersByRole: Array<{
    _id: string;
    count: number;
  }>;
  recentUsers: User[];
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  projectsByStatus: Array<{
    _id: string;
    count: number;
  }>;
  recentProjects: Project[];
}

class AdminService {
  // User Management
  async getUsers(params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<UsersResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.role) queryParams.append('role', params.role);
    if (params.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    return apiGet(`/users?${queryParams.toString()}`);
  }

  async getUserById(id: string): Promise<{ success: boolean; data: { user: User } }> {
    return apiGet(`/users/${id}`);
  }

  async createUser(userData: CreateUserData): Promise<{ success: boolean; message: string; data: { user: User } }> {
    return apiPost('/users', userData);
  }

  async updateUser(id: string, userData: UpdateUserData): Promise<{ success: boolean; message: string; data: { user: User } }> {
    return apiPut(`/users/${id}`, userData);
  }

  async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    return apiDelete(`/users/${id}`);
  }

  async getUserStats(): Promise<{ success: boolean; data: UserStats }> {
    return apiGet('/users/stats/overview');
  }

  // Project Management
  async getProjects(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    priority?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ProjectsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    if (params.priority) queryParams.append('priority', params.priority);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    return apiGet(`/projects?${queryParams.toString()}`);
  }

  async getProjectById(id: string): Promise<{ success: boolean; data: { project: Project } }> {
    return apiGet(`/projects/${id}`);
  }

  async createProject(projectData: CreateProjectData): Promise<{ success: boolean; message: string; data: { project: Project } }> {
    return apiPost('/projects', projectData);
  }

  async updateProject(id: string, projectData: UpdateProjectData): Promise<{ success: boolean; message: string; data: { project: Project } }> {
    return apiPut(`/projects/${id}`, projectData);
  }

  async deleteProject(id: string): Promise<{ success: boolean; message: string }> {
    return apiDelete(`/projects/${id}`);
  }

  async getProjectStats(): Promise<{ success: boolean; data: ProjectStats }> {
    return apiGet('/projects/stats/overview');
  }

  // Dashboard Stats
  async getDashboardStats(): Promise<{
    success: boolean;
    data: {
      users: {
        total: number;
        active: number;
        byRole: Array<{ role: string; count: number }>;
      };
      projects: {
        total: number;
        active: number;
        byStatus: Array<{ status: string; count: number }>;
      };
      recentActivity: Array<{
        type: 'user_created' | 'project_created' | 'user_login';
        data: any;
        timestamp: string;
      }>;
    };
  }> {
    return apiGet('/admin/dashboard/stats');
  }
}

export const adminService = new AdminService();
export default adminService;
