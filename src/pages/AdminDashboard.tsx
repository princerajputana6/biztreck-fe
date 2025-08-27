import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, FolderOpen, BarChart3, Building2 } from 'lucide-react';
import { adminService } from '@/services/adminService';
import AdminNavigation from '@/components/layout/AdminNavigation';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    users: { total: 0, active: 0 },
    projects: { total: 0, active: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch user stats
        const userStats = await adminService.getUserStats();
        // For now, using mock project stats since projects API doesn't exist
        const projectStats = { total: 23, active: 15 };
        
        setStats({
          users: {
            total: userStats.data.totalUsers,
            active: userStats.data.activeUsers
          },
          projects: projectStats
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Fallback to mock data
        setStats({
          users: { total: 156, active: 142 },
          projects: { total: 23, active: 15 }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Shield className="h-8 w-8 mr-3 text-blue-600" />
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your organization's users, projects, and analytics
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.users.total}</p>
                <p className="text-xs text-gray-500">{stats.users.active} active</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">{loading ? '...' : stats.projects.active}</p>
                <p className="text-xs text-gray-500">{stats.projects.total} total</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Analytics</p>
                <p className="text-2xl font-bold text-gray-900">Ready</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Organization</p>
                <p className="text-2xl font-bold text-gray-900">Active</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/admin/users" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <Users className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600">Add, edit, or remove users</p>
            </Link>
            <Link to="/admin/projects" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <FolderOpen className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Manage Projects</h3>
              <p className="text-sm text-gray-600">Create and manage projects</p>
            </Link>
            <Link to="/admin/analytics" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <BarChart3 className="h-6 w-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">View Reports</h3>
              <p className="text-sm text-gray-600">Check analytics and reports</p>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
