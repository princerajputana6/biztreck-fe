import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard';
import DeveloperDashboard from './DeveloperDashboard';
import ClientDashboard from './ClientDashboard';

const RoleBasedDashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, userRole: stateUserRole } = useSelector(state => state.auth);

  useEffect(() => {
    detectUserRole();
  }, [token, stateUserRole]);

  const detectUserRole = () => {
    try {
      // First try to use userRole from Redux state
      if (stateUserRole) {
        console.log('Using userRole from state:', stateUserRole);
        setUserRole(stateUserRole);
        setLoading(false);
        return;
      }

      // Fallback to token decoding
      const tokenToUse = token || localStorage.getItem('token');
      if (tokenToUse) {
        const decodedToken = jwtDecode(tokenToUse);
        console.log('Decoded token role:', decodedToken.role);
        setUserRole(decodedToken.role || 'client');
      } else {
        console.log('No token found, defaulting to client');
        setUserRole('client');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      setUserRole('client');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Render appropriate dashboard based on user role
  console.log('Rendering dashboard for role:', userRole);
  switch (userRole) {
    case 'superadmin':
      return <SuperAdminDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'manager':
      return <ManagerDashboard />;
    case 'developer':
      return <DeveloperDashboard />;
    case 'client':
    default:
      return <ClientDashboard />;
  }
};

export default RoleBasedDashboard;
