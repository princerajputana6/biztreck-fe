import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Users,
  Building2,
  BarChart3,
  Settings,
  Activity,
  TrendingUp,
  UserPlus,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/utils/cn';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="h-8 w-8 mr-3 text-indigo-600" />
            Welcome to BizTreck
          </h1>
          <p className="mt-2 text-gray-600">
            Hello {user?.profile.firstName}! Here's your system overview.
          </p>
        </div>

        {/* Role-based Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {user?.role === 'super_admin' && (
            <>
              <Link
                to="/super-admin/dashboard"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-red-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Super Admin Dashboard</h3>
                    <p className="text-gray-600">Manage system-wide settings and users</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/super-admin/admins"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Admin Management</h3>
                    <p className="text-gray-600">Create and manage admin accounts</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/super-admin/organizations"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Organizations</h3>
                    <p className="text-gray-600">Manage client organizations</p>
                  </div>
                </div>
              </Link>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <Link
                to="/admin/dashboard"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Admin Dashboard</h3>
                    <p className="text-gray-600">Manage your organization</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/admin/users"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                    <p className="text-gray-600">Manage team members</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/admin/projects"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Project Management</h3>
                    <p className="text-gray-600">Oversee project development</p>
                  </div>
                </div>
              </Link>
            </>
          )}

          {user?.role === 'manager' && (
            <>
              <Link
                to="/manager/dashboard"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Manager Dashboard</h3>
                    <p className="text-gray-600">Lead your team effectively</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/manager/team"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Team Management</h3>
                    <p className="text-gray-600">Manage team members and assignments</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/manager/projects"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Project Overview</h3>
                    <p className="text-gray-600">Monitor project progress</p>
                  </div>
                </div>
              </Link>
            </>
          )}

          {user?.role === 'developer' && (
            <>
              <Link
                to="/developer/dashboard"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Developer Dashboard</h3>
                    <p className="text-gray-600">Track your development progress</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/developer/projects"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">My Projects</h3>
                    <p className="text-gray-600">View assigned projects</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/developer/tasks"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Activity className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Task Management</h3>
                    <p className="text-gray-600">Manage your tasks and time</p>
                  </div>
                </div>
              </Link>
            </>
          )}

          {user?.role === 'client' && (
            <>
              <Link
                to="/client/dashboard"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-indigo-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Client Dashboard</h3>
                    <p className="text-gray-600">Monitor your projects</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/client/projects"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">My Projects</h3>
                    <p className="text-gray-600">View project progress</p>
                  </div>
                </div>
              </Link>
              <Link
                to="/client/communications"
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <Activity className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Communications</h3>
                    <p className="text-gray-600">Stay in touch with your team</p>
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>

        {/* General Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Current Role</p>
              <p className="font-medium text-gray-900 capitalize">{user?.role?.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Organization</p>
              <p className="font-medium text-gray-900">
                {user?.organization?.name || 'Not assigned'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Login</p>
              <p className="font-medium text-gray-900">
                {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Account Status</p>
              <span className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                user?.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              )}>
                {user?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
