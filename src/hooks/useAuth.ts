import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import {
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  ChangePasswordData,
} from '@/types/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    setAuth, 
    clearAuth, 
    setLoading, 
    setUser,
    hasPermission,
    hasRole,
    isAdmin,
    isSuperAdmin 
  } = useAuthStore();

  // Login mutation
  const loginMutation = useMutation(
    (credentials: LoginCredentials) => authService.login(credentials),
    {
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: (data) => {
        const { user, accessToken, refreshToken } = data.data;
        setAuth(user, accessToken, refreshToken);
        toast.success(data.message || 'Login successful!');
        navigate('/dashboard');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Login failed. Please try again.';
        toast.error(message);
      },
      onSettled: () => {
        setLoading(false);
      },
    }
  );

  // Register mutation
  const registerMutation = useMutation(
    (userData: RegisterData) => authService.register(userData),
    {
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: (data) => {
        const { user, accessToken, refreshToken } = data.data;
        setAuth(user, accessToken, refreshToken);
        toast.success(data.message || 'Registration successful!');
        navigate('/dashboard');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Registration failed. Please try again.';
        toast.error(message);
      },
      onSettled: () => {
        setLoading(false);
      },
    }
  );

  // Logout mutation
  const logoutMutation = useMutation(
    () => authService.logout(),
    {
      onSuccess: () => {
        clearAuth();
        queryClient.clear();
        toast.success('Logged out successfully');
        navigate('/login');
      },
      onError: () => {
        // Even if logout fails on server, clear local auth
        clearAuth();
        queryClient.clear();
        navigate('/login');
      },
    }
  );

  // Logout from all devices
  const logoutAllMutation = useMutation(
    () => authService.logoutAll(),
    {
      onSuccess: () => {
        clearAuth();
        queryClient.clear();
        toast.success('Logged out from all devices');
        navigate('/login');
      },
      onError: () => {
        clearAuth();
        queryClient.clear();
        navigate('/login');
      },
    }
  );

  // Forgot password mutation
  const forgotPasswordMutation = useMutation(
    (data: ForgotPasswordData) => authService.forgotPassword(data),
    {
      onSuccess: (data) => {
        toast.success(data.message || 'Password reset email sent!');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Failed to send reset email. Please try again.';
        toast.error(message);
      },
    }
  );

  // Reset password mutation
  const resetPasswordMutation = useMutation(
    (data: ResetPasswordData) => authService.resetPassword(data),
    {
      onSuccess: (data) => {
        toast.success(data.message || 'Password reset successful!');
        navigate('/login');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Failed to reset password. Please try again.';
        toast.error(message);
      },
    }
  );

  // Change password mutation
  const changePasswordMutation = useMutation(
    (data: ChangePasswordData) => authService.changePassword(data),
    {
      onSuccess: (data) => {
        toast.success(data.message || 'Password changed successfully!');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Failed to change password. Please try again.';
        toast.error(message);
      },
    }
  );

  // Update profile mutation
  const updateProfileMutation = useMutation(
    (profileData: Parameters<typeof authService.updateProfile>[0]) => 
      authService.updateProfile(profileData),
    {
      onSuccess: (data) => {
        setUser(data.data.user);
        toast.success(data.message || 'Profile updated successfully!');
      },
      onError: (error: any) => {
        const message = error.response?.data?.message || 'Failed to update profile. Please try again.';
        toast.error(message);
      },
    }
  );

  // Verify token query
  const { data: tokenVerification, isLoading: isVerifying } = useQuery(
    ['auth', 'verify'],
    () => authService.verifyToken(),
    {
      enabled: isAuthenticated && !!user,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: () => {
        clearAuth();
      },
    }
  );

  // Get current user query
  const { data: currentUserData } = useQuery(
    ['auth', 'user'],
    () => authService.getCurrentUser(),
    {
      enabled: isAuthenticated && !!user,
      onSuccess: (data) => {
        setUser(data.data.user);
      },
      onError: () => {
        clearAuth();
      },
    }
  );

  return {
    // State
    user,
    isAuthenticated,
    isLoading: isLoading || isVerifying,

    // Auth methods
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    logoutAll: logoutAllMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    changePassword: changePasswordMutation.mutate,
    updateProfile: updateProfileMutation.mutate,

    // Permission methods
    hasPermission,
    hasRole,
    isAdmin,
    isSuperAdmin,

    // Mutation states
    isLoggingIn: loginMutation.isLoading,
    isRegistering: registerMutation.isLoading,
    isLoggingOut: logoutMutation.isLoading,
    isForgettingPassword: forgotPasswordMutation.isLoading,
    isResettingPassword: resetPasswordMutation.isLoading,
    isChangingPassword: changePasswordMutation.isLoading,
    isUpdatingProfile: updateProfileMutation.isLoading,
  };
};
