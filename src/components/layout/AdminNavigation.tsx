import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  Users,
  FolderOpen,
  BarChart3,
  Building2,
  Settings,
  Home
} from 'lucide-react';
import { cn } from '@/utils/cn';

const AdminNavigation: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Project Management', href: '/admin/projects', icon: FolderOpen },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Organization', href: '/admin/organization', icon: Building2 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors',
                  isActive
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
