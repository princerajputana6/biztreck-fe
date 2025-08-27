import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Layout from '@/components/layout/Layout';

// Auth Pages
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

// Dashboard Pages
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Users from '@/pages/Users';
import Settings from '@/pages/Settings';
import Unauthorized from '@/pages/Unauthorized';
import NotFound from '@/pages/NotFound';

// Admin Pages
import AdminUserManagement from '@/pages/AdminUserManagement';
import AdminProjectManagement from '@/pages/AdminProjectManagement';
import AdminAnalytics from '@/pages/AdminAnalytics';
import AdminOrganization from '@/pages/AdminOrganization';
import AdminSettings from '@/pages/AdminSettings';

// Super Admin Pages
import SuperAdminDashboard from '@/pages/SuperAdminDashboard';
import AdminManagement from '@/pages/AdminManagement';
import CreateAdmin from '@/pages/CreateAdmin';

// Role-based Dashboard Pages
import AdminDashboard from '@/pages/AdminDashboard';
import ManagerDashboard from '@/pages/ManagerDashboard';
import DeveloperDashboard from '@/pages/DeveloperDashboard';
import ClientDashboard from '@/pages/ClientDashboard';

const App: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirect based on user role
  const getDefaultRoute = () => {
    if (!user) return '/login';
    
    switch (user.role) {
      case 'super_admin':
        return '/super-admin/dashboard';
      case 'admin':
        return '/admin/dashboard';
      case 'manager':
        return '/manager/dashboard';
      case 'developer':
        return '/developer/dashboard';
      case 'client':
        return '/client/dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <div className="App">
      <Toaster position="top-right" />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <LoginForm />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <RegisterForm />
        } />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes with Layout */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          {/* Default Dashboard */}
          <Route index element={<Navigate to={getDefaultRoute()} replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />

          {/* Super Admin Routes */}
          <Route path="super-admin">
            <Route path="dashboard" element={
              <ProtectedRoute requiredRole="super_admin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="admins" element={
              <ProtectedRoute requiredRole="super_admin">
                <AdminManagement />
              </ProtectedRoute>
            } />
            <Route path="admins/create" element={
              <ProtectedRoute requiredRole="super_admin">
                <CreateAdmin />
              </ProtectedRoute>
            } />
            <Route path="organizations" element={
              <ProtectedRoute requiredRole="super_admin">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Organizations Management</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="analytics" element={
              <ProtectedRoute requiredRole="super_admin">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Analytics & Reports</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute requiredRole="super_admin">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">System Settings</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="activity-logs" element={
              <ProtectedRoute requiredRole="super_admin">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Activity Logs</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
          </Route>

          {/* Admin Routes */}
          <Route path="admin">
            <Route path="dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="users" element={
              <ProtectedRoute requiredRole="admin">
                <AdminUserManagement />
              </ProtectedRoute>
            } />
            <Route path="projects" element={
              <ProtectedRoute requiredRole="admin">
                <AdminProjectManagement />
              </ProtectedRoute>
            } />
            <Route path="analytics" element={
              <ProtectedRoute requiredRole="admin">
                <AdminAnalytics />
              </ProtectedRoute>
            } />
            <Route path="organization" element={
              <ProtectedRoute requiredRole="admin">
                <AdminOrganization />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute requiredRole="admin">
                <AdminSettings />
              </ProtectedRoute>
            } />
          </Route>

          {/* Manager Routes */}
          <Route path="manager">
            <Route path="dashboard" element={
              <ProtectedRoute requiredRole="manager">
                <ManagerDashboard />
              </ProtectedRoute>
            } />
            <Route path="team" element={
              <ProtectedRoute requiredRole="manager">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Team Management</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="projects" element={
              <ProtectedRoute requiredRole="manager">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Projects</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="reports" element={
              <ProtectedRoute requiredRole="manager">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Reports</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
          </Route>

          {/* Developer Routes */}
          <Route path="developer">
            <Route path="dashboard" element={
              <ProtectedRoute requiredRole="developer">
                <DeveloperDashboard />
              </ProtectedRoute>
            } />
            <Route path="projects" element={
              <ProtectedRoute requiredRole="developer">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">My Projects</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="tasks" element={
              <ProtectedRoute requiredRole="developer">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Tasks</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="resources" element={
              <ProtectedRoute requiredRole="developer">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Resources</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
          </Route>

          {/* Client Routes */}
          <Route path="client">
            <Route path="dashboard" element={
              <ProtectedRoute requiredRole="client">
                <ClientDashboard />
              </ProtectedRoute>
            } />
            <Route path="projects" element={
              <ProtectedRoute requiredRole="client">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">My Projects</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="communications" element={
              <ProtectedRoute requiredRole="client">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Communications</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
            <Route path="billing" element={
              <ProtectedRoute requiredRole="client">
                <div className="p-8">
                  <h1 className="text-2xl font-bold">Billing</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } />
          </Route>
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
