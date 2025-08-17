import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import superAdminService from '../../services/api/superAdminService';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  Users, 
  Shield, 
  Settings, 
  UserPlus, 
  Activity,
  TrendingUp,
  Database,
  AlertTriangle,
  DollarSign,
  Sun,
  Moon
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const { theme, setTheme } = useTheme();
  const [dashboardData, setDashboardData] = useState({
    adminStats: {
      totalAdmins: 0,
      activeAdmins: 0,
      recentAdmins: 0,
      inactiveAdmins: 0
    },
    systemStats: {
      totalUsers: 0,
      activeUsers: 0,
      inactiveUsers: 0
    },
    revenueStats: {
      totalRevenue: 0,
      monthlyRevenue: 0,
      revenueGrowth: 0
    },
    recentAdmins: [],
    roleDistribution: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await superAdminService.getDashboardStats();
        console.log('Dashboard response:', response);
        if (response.success) {
          setDashboardData({
            ...response.data,
            revenueStats: {
              totalRevenue: 125000,
              monthlyRevenue: 15000,
              revenueGrowth: 12.5
            }
          });
        } else {
          throw new Error(response.message || 'Failed to fetch dashboard data');
        }
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const toggleTheme = () => {
    try {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      console.log('Toggling theme from', theme, 'to', newTheme);
      setTheme(newTheme);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, description }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center">
        <div className={`p-3 ${color} rounded-xl mr-4`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
          {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Super Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">System overview and user management</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          
          {/* Conditional Create Admin Button */}
          {dashboardData.adminStats.totalAdmins === 0 ? (
            <Link
              to="/admin/create-admin"
              className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 text-white font-medium rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl animate-pulse"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Create First Admin
            </Link>
          ) : (
            <Link
              to="/admin/create-admin"
              className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Create Admin
            </Link>
          )}
          
          <Link
            to="/admin/users"
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-medium rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Users className="h-5 w-5 mr-2" />
            Manage Users
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Admins"
          value={dashboardData.adminStats.totalAdmins}
          icon={Shield}
          color="bg-purple-500"
          description="All admin users"
        />
        <StatCard
          title="Active Admins"
          value={dashboardData.adminStats.activeAdmins}
          icon={Users}
          color="bg-green-500"
          description="Currently active admins"
        />
        <StatCard
          title="Total Revenue"
          value={`$${dashboardData.revenueStats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-emerald-500"
          description="Total system revenue"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${dashboardData.revenueStats.monthlyRevenue.toLocaleString()}`}
          icon={TrendingUp}
          color="bg-blue-500"
          description="This month's revenue"
        />
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admins */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Admins</h2>
            <Link 
              to="/admin/admins" 
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600">{error}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dashboardData.recentAdmins.length > 0 ? (
                dashboardData.recentAdmins.map((admin) => (
                  <div key={admin._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-medium text-sm">
                          {admin.firstName?.[0]}{admin.lastName?.[0]}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {admin.firstName} {admin.lastName}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{admin.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        admin.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {admin.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No recent admins</p>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <Link
              to="/admin/create-admin"
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <UserPlus className="h-8 w-8 text-purple-600 mr-4" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Create New Admin</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Add a new administrator to the system</p>
              </div>
            </Link>
            
            <Link
              to="/admin/admins"
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 border border-gray-200 dark:border-gray-700"
            >
              <Users className="h-8 w-8 text-green-600 mr-4" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Manage Admins</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">View and manage all administrators</p>
              </div>
            </Link>
            
            <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Activity className="h-8 w-8 text-indigo-600 mr-4" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">System Activity</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Monitor system health and activity</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Settings className="h-8 w-8 text-gray-600 mr-4" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">System Settings</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Configure system preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Distribution */}
      {dashboardData.roleDistribution.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Role Distribution</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {dashboardData.roleDistribution.map((role) => (
              <div key={role._id} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{role.count}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{role._id}s</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
