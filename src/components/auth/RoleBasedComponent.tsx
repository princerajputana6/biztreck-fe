import React from 'react';
import { useAuthStore } from '@/store/authStore';

interface RoleBasedComponentProps {
  children: React.ReactNode;
  allowedRoles?: string | string[];
  requiredPermission?: string;
  fallback?: React.ReactNode;
}

const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
  children,
  allowedRoles,
  requiredPermission,
  fallback = null
}) => {
  const { hasRole, hasPermission, isAuthenticated } = useAuthStore();

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  // Check role requirement
  if (allowedRoles && !hasRole(allowedRoles)) {
    return <>{fallback}</>;
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleBasedComponent;
