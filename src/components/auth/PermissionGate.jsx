import React from 'react';
import { useMenuPermissions } from '../../contexts/NavigationContext';

const PermissionGate = ({ 
  permission, 
  role, 
  children, 
  fallback = null,
  requireAll = false 
}) => {
  const { checkPermission, userRole, userPermissions } = useMenuPermissions();

  // Check role-based access
  const hasRoleAccess = () => {
    if (!role) return true;
    
    const roleHierarchy = {
      superadmin: 5,
      admin: 4,
      manager: 3,
      developer: 2,
      client: 1
    };
    
    const userRoleLevel = roleHierarchy[userRole] || 0;
    const requiredRoleLevel = roleHierarchy[role] || 0;
    
    return userRoleLevel >= requiredRoleLevel;
  };

  // Check permission-based access
  const hasPermissionAccess = () => {
    if (!permission) return true;
    
    const permissions = Array.isArray(permission) ? permission : [permission];
    
    if (requireAll) {
      return permissions.every(perm => checkPermission([perm]));
    } else {
      return permissions.some(perm => checkPermission([perm]));
    }
  };

  // Check if user has access
  const hasAccess = hasRoleAccess() && hasPermissionAccess();

  if (!hasAccess) {
    return fallback;
  }

  return children;
};

export default PermissionGate;
