import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { useAuth } from '@/hooks/useAuth';
import { superAdminService, DashboardStats } from '@/services/superAdminService';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { cn } from '@/utils/cn';

const SuperAdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await superAdminService.getDashboardStats();
        setStats(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  if (loading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-red-200">
          <div className="flex items-center space-x-3 text-red-600 mb-4">
            <AlertTriangle className="h-6 w-6" />
            <h2 className="text-lg font-semibold">Error Loading Dashboard</h2>
          </div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Shield className="h-8 w-8 mr-3 text-indigo-600" />
                Super Admin Dashboard
              </h1>
              <p className="mt-1 text-gray-600">
                Welcome back, {user?.profile.firstName}! Here's your system overview.
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                to="/super-admin/admins/create"
                className="btn-primary btn-md"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create Admin
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.users.total.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">
                  +{stats?.users.recentlyAdded} this week
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Organizations */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Organizations</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.organizations.total}</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {stats?.organizations.active} active
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Building2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{stats?.projects.total.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Across all organizations
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-3xl font-bold text-gray-900">{formatUptime(stats?.system.uptime || 0)}</p>
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <Activity className="h-4 w-4 mr-1" />
                  {stats?.system.environment}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Settings className="h-8 w-8 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* User Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">User Distribution by Role</h3>
                <Link
                  to="/super-admin/analytics/users"
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center"
                >
                  View Details
                  <TrendingUp className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Super Admins', count: stats?.users.superAdmins || 0, color: 'bg-red-500' },
                  { label: 'Admins', count: stats?.users.admins || 0, color: 'bg-blue-500' },
                  { label: 'Managers', count: stats?.users.managers || 0, color: 'bg-green-500' },
                  { label: 'Developers', count: stats?.users.developers || 0, color: 'bg-purple-500' },
                  { label: 'Clients', count: stats?.users.clients || 0, color: 'bg-yellow-500' }
                ].map((role) => {
                  const percentage = stats?.users.total ? (role.count / stats.users.total) * 100 : 0;
                  return (
                    <div key={role.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn('w-3 h-3 rounded-full', role.color)} />
                        <span className="text-sm font-medium text-gray-700">{role.label}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className={cn('h-2 rounded-full', role.color)}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 w-8 text-right">
                          {role.count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserPlus className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {stats?.users.recentlyAdded} new users
                    </p>
                    <p className="text-xs text-gray-500">Last 7 days</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {stats?.organizations.recentlyAdded} new organizations
                    </p>
                    <p className="text-xs text-gray-500">Last 7 days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Node.js Version</span>
                  <span className="text-sm font-medium text-gray-900">{stats?.system.nodeVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Environment</span>
                  <span className={cn(
                    'text-xs px-2 py-1 rounded-full font-medium',
                    stats?.system.environment === 'production' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  )}>
                    {stats?.system.environment}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatUptime(stats?.system.uptime || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/super-admin/admins"
            className="card p-6 hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
          >
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Manage Admins</p>
                <p className="text-sm text-gray-600">View and manage admin accounts</p>
              </div>
            </div>
          </Link>

          <Link
            to="/super-admin/organizations"
            className="card p-6 hover:shadow-md transition-shadow border-l-4 border-l-green-500"
          >
            <div className="flex items-center space-x-3">
              <Building2 className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Organizations</p>
                <p className="text-sm text-gray-600">Manage organizations</p>
              </div>
            </div>
          </Link>

          <Link
            to="/super-admin/analytics"
            className="card p-6 hover:shadow-md transition-shadow border-l-4 border-l-purple-500"
          >
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-6 w-6 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Analytics</p>
                <p className="text-sm text-gray-600">View system analytics</p>
              </div>
            </div>
          </Link>

          <Link
            to="/super-admin/settings"
            className="card p-6 hover:shadow-md transition-shadow border-l-4 border-l-orange-500"
          >
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6 text-orange-600" />
              <div>
                <p className="font-medium text-gray-900">System Settings</p>
                <p className="text-sm text-gray-600">Configure system settings</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
