import { 
  apiPost, 
  apiGet 
} from './api';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  ChangePasswordData,
  RefreshTokenData,
  ApiResponse,
  User
} from '@/types/auth';

class AuthService {
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiPost<AuthResponse>('/auth/login', credentials);
  }

  // Register user
  async register(userData: RegisterData): Promise<AuthResponse> {
    return apiPost<AuthResponse>('/auth/register', userData);
  }

  // Refresh access token
  async refreshToken(refreshTokenData: RefreshTokenData): Promise<{
    success: boolean;
    message: string;
    data: {
      accessToken: string;
      refreshToken: string;
    };
  }> {
    return apiPost('/auth/refresh', refreshTokenData);
  }

  // Logout user
  async logout(refreshToken?: string): Promise<ApiResponse> {
    return apiPost<ApiResponse>('/auth/logout', { refreshToken });
  }

  // Logout from all devices
  async logoutAll(): Promise<ApiResponse> {
    return apiPost<ApiResponse>('/auth/logout-all');
  }

  // Forgot password
  async forgotPassword(data: ForgotPasswordData): Promise<ApiResponse> {
    return apiPost<ApiResponse>('/auth/forgot-password', data);
  }

  // Reset password
  async resetPassword(data: ResetPasswordData): Promise<ApiResponse> {
    return apiPost<ApiResponse>('/auth/reset-password', data);
  }

  // Change password
  async changePassword(data: ChangePasswordData): Promise<ApiResponse> {
    return apiPost<ApiResponse>('/auth/change-password', data);
  }

  // Verify token
  async verifyToken(): Promise<ApiResponse<{ user: User }>> {
    return apiGet<ApiResponse<{ user: User }>>('/auth/verify-token');
  }

  // Get current user
  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return apiGet<ApiResponse<{ user: User }>>('/auth/me');
  }

  // Update user profile
  async updateProfile(profileData: Partial<{
    profile: Partial<User['profile']>;
    email: string;
  }>): Promise<ApiResponse<{ user: User }>> {
    return apiPost<ApiResponse<{ user: User }>>('/users/profile', profileData);
  }
}

export const authService = new AuthService();
export default authService;
