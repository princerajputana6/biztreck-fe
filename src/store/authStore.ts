import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string | string[]) => boolean;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setAuth: (user: User, accessToken: string, refreshToken: string) => {
        // Store tokens in cookies for better security
        Cookies.set('accessToken', accessToken, {
          expires: 1/96, // 15 minutes
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        
        Cookies.set('refreshToken', refreshToken, {
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      setAccessToken: (accessToken: string) => {
        Cookies.set('accessToken', accessToken, {
          expires: 1/96, // 15 minutes
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        
        set({ accessToken });
      },

      clearAuth: () => {
        // Remove tokens from cookies
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        
        set({
          ...initialState,
        });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;
        
        // Super admin has all permissions
        if (user.role === 'super_admin') return true;
        
        // Check role-based permissions
        const rolePermissions = getRolePermissions(user.role);
        
        // Check if user has the permission through role or custom permissions
        return rolePermissions.includes(permission) || user.permissions.includes(permission);
      },

      hasRole: (role: string | string[]) => {
        const { user } = get();
        if (!user) return false;
        
        const roles = Array.isArray(role) ? role : [role];
        return roles.includes(user.role);
      },

      isAdmin: () => {
        const { user } = get();
        if (!user) return false;
        return ['super_admin', 'admin'].includes(user.role);
      },

      isSuperAdmin: () => {
        const { user } = get();
        if (!user) return false;
        return user.role === 'super_admin';
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Get tokens from cookies on app load
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');
        
        if (state && refreshToken) {
          state.accessToken = accessToken || null;
          state.refreshToken = refreshToken;
        }
      },
    }
  )
);

// Helper function to get role-based permissions
const getRolePermissions = (role: string): string[] => {
  const rolePermissions: Record<string, string[]> = {
    super_admin: [
      'users.read', 'users.write', 'users.delete',
      'projects.read', 'projects.write', 'projects.delete',
      'analytics.read', 'settings.read', 'settings.write',
      'billing.read', 'billing.write'
    ],
    admin: [
      'users.read', 'users.write',
      'projects.read', 'projects.write', 'projects.delete',
      'analytics.read', 'settings.read'
    ],
    manager: [
      'users.read',
      'projects.read', 'projects.write',
      'analytics.read'
    ],
    developer: [
      'projects.read', 'projects.write'
    ],
    client: [
      'projects.read'
    ]
  };
  
  return rolePermissions[role] || [];
};

// Selectors for better performance
export const selectUser = (state: AuthStore) => state.user;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const selectIsLoading = (state: AuthStore) => state.isLoading;
export const selectAccessToken = (state: AuthStore) => state.accessToken;
