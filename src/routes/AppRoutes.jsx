import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { jwtDecode } from 'jwt-decode';
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Auth Pages
import LandingPage from '../pages/auth/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import DemoPage from '../pages/auth/DemoPage';

// Admin Pages
import SuperAdminSetupPage from '../pages/admin/SuperAdminSetupPage';
import UsersPage from '../pages/admin/UsersPage';
import UserDetailsPage from '../pages/admin/UserDetailsPage';
import CreateAdminPage from '../pages/admin/CreateAdminPage';
import AddAdminPage from '../pages/admin/AddAdminPage';

// Dashboard Pages
import DashboardPage from '../pages/dashboard/DashboardPage';

// Project Pages
import ProjectsPage from '../pages/projects/ProjectsPage';
import ProjectDetailsPage from '../pages/projects/ProjectDetailsPage';
import CreateProjectPage from '../pages/projects/CreateProjectPage';

// Process Pages
import ProcessesPage from '../pages/processes/ProcessesPage';
import ProcessDesignerPage from '../pages/processes/ProcessDesignerPage';

// Pipeline Pages
import PipelinesPage from '../pages/pipelines/PipelinesPage';
import SalesAnalyticsPage from '../pages/pipelines/SalesAnalyticsPage';

// Team Pages
import TeamPage from '../pages/team/TeamPage';
import UserProfilePage from '../pages/team/UserProfilePage';

// Other Pages
import IntegrationsPage from '../pages/integrations/IntegrationsPage';
import CalendarPage from '../pages/calendar/CalendarPage';
import ReportsPage from '../pages/reports/ReportsPage';
import SettingsPage from '../pages/settings/SettingsPage';
import ClientsPage from '../pages/clients/ClientsPage';

// Error Pages
import NotFoundPage from '../pages/error/NotFoundPage';
import UnauthorizedPage from '../pages/error/UnauthorizedPage';

const AppRoutes = () => {
  const { isAuthenticated, userRole } = useAppSelector((state) => state.auth);
  
  // Get user role safely
  let role = userRole;
  if (!role) {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        role = decodedToken.role;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      role = null;
    }
  }

  return (
    <Routes>
        {/* Public Routes */}
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <LoginPage />
          </PublicRoute>
        } />

        <Route path="/signup" element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignupPage />
          </PublicRoute>
        } />

        <Route path="/demo" element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <DemoPage />
          </PublicRoute>
        } />

        <Route path="/admin/setup" element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SuperAdminSetupPage />
          </PublicRoute>
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <DashboardPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* Projects */}
        {role !== 'superadmin' && (
          <>
            <Route path="/projects" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <ProjectsPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/projects/create" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <CreateProjectPage />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/projects/:id" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <ProjectDetailsPage />
                </AppLayout>
              </ProtectedRoute>
            } />
          </>
        )}

        {/* Processes */}
        <Route path="/processes" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <ProcessesPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/processes/designer" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <ProcessDesignerPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* Pipelines */}
        <Route path="/pipelines" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <PipelinesPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/pipelines/analytics" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <SalesAnalyticsPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* Team */}
        <Route path="/team" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <TeamPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <UserProfilePage />
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* Other Protected Routes */}
        <Route path="/integrations" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <IntegrationsPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/calendar" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <CalendarPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reports" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <ReportsPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/clients" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <ClientsPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/users" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <UsersPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/users/:userId" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <UserDetailsPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/users/:userId/edit" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <UserDetailsPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
                <Route path="/admin/add" element={<Navigate to="/admin/create-admin" replace />} />

        <Route path="/admin/create-admin" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <CreateAdminPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/users" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <AppLayout>
              <UsersPage />
            </AppLayout>
          </ProtectedRoute>
        } />

        {/* Error Routes */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};

export default AppRoutes;
