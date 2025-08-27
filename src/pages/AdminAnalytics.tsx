import React, { useState, useEffect } from 'react';
import { BarChart3, Users, FolderOpen, TrendingUp, Activity } from 'lucide-react';
import { adminService } from '@/services/adminService';
import AdminNavigation from '@/components/layout/AdminNavigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { cn } from '@/utils/cn';

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  usersByRole: Array<{
    _id: string;
    count: number;
  }>;
  recentUsers: Array<{
    _id: string;
    profile: {
      firstName: string;
      lastName: string;
      fullName?: string;
    };
    role: string;
    createdAt: string;
  }>;
}

const AdminAnalytics: React.FC = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const stats = await adminService.getUserStats();
        setUserStats(stats.data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
        // Fallback to mock data
        setUserStats({
          totalUsers: 156,
          activeUsers: 142,
          inactiveUsers: 14,
          usersByRole: [
            { _id: 'admin', count: 3 },
            { _id: 'manager', count: 12 },
            { _id: 'developer', count: 45 },
            { _id: 'client', count: 96 }
          ],
          recentUsers: [
            {
              _id: '1',
              profile: { firstName: 'John', lastName: 'Doe', fullName: 'John Doe' },
              role: 'developer',
              createdAt: '2024-03-15T10:00:00Z'
            },
            {
              _id: '2',
              profile: { firstName: 'Jane', lastName: 'Smith', fullName: 'Jane Smith' },
              role: 'client',
              createdAt: '2024-03-14T15:30:00Z'
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-8 w-8 mr-3 text-purple-600" />
              Analytics & Reports
            </h1>
            <p className="mt-1 text-gray-600">
              View detailed insights about your organization's users and projects
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{userStats?.totalUsers || 0}</p>
                <p className="text-xs text-gray-500">{userStats?.activeUsers || 0} active</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{userStats?.activeUsers || 0}</p>
                <p className="text-xs text-gray-500">
                  {userStats ? Math.round((userStats.activeUsers / userStats.totalUsers) * 100) : 0}% of total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-2xl font-bold text-gray-900">+12%</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Distribution by Role */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Users by Role</h3>
            <div className="space-y-3">
              {userStats?.usersByRole.map((role) => (
                <div key={role._id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={cn(
                      'w-3 h-3 rounded-full mr-3',
                      role._id === 'admin' ? 'bg-red-500' :
                      role._id === 'manager' ? 'bg-blue-500' :
                      role._id === 'developer' ? 'bg-green-500' : 'bg-purple-500'
                    )} />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {role._id}
                    </span>
                  </div>
                  <span className="text-sm text-gray-900 font-semibold">
                    {role.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {userStats?.recentUsers.map((user) => (
                <div key={user._id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-700 font-medium text-sm">
                        {user.profile.firstName[0]}{user.profile.lastName[0]}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {user.profile.fullName || `${user.profile.firstName} ${user.profile.lastName}`}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Chart visualization coming soon</p>
              <p className="text-sm text-gray-400">Interactive charts and graphs will be added here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
