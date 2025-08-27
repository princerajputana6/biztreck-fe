import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  Building2,
  BarChart3,
  Settings,
  Activity,
  UserPlus,
  Shield,
  Home,
  FolderOpen,
  Calendar,
  FileText,
  CreditCard,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Code,
  UserCheck,
  Database,
  Globe,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  CheckSquare,
  Clock
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/cn';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  children?: NavItem[];
}

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemLabel: string) => {
    setExpandedItems(prev => 
      prev.includes(itemLabel) 
        ? prev.filter(item => item !== itemLabel)
        : [...prev, itemLabel]
    );
  };

  const handleLogout = () => {
    logout();
  };

  const getNavItems = (): NavItem[] => {
    if (!user) return [];

    switch (user.role) {
      case 'super_admin':
        return [
          {
            label: 'Dashboard',
            href: '/super-admin/dashboard',
            icon: Home
          },
          {
            label: 'Admin Management',
            href: '/super-admin/admins',
            icon: Shield,
            children: [
              {
                label: 'All Admins',
                href: '/super-admin/admins',
                icon: Users
              },
              {
                label: 'Create Admin',
                href: '/super-admin/admins/create',
                icon: UserPlus
              },
              {
                label: 'Admin Permissions',
                href: '/super-admin/admins/permissions',
                icon: UserCheck
              }
            ]
          },
          {
            label: 'Organizations',
            href: '/super-admin/organizations',
            icon: Building2,
            children: [
              {
                label: 'All Organizations',
                href: '/super-admin/organizations',
                icon: Building2
              },
              {
                label: 'Create Organization',
                href: '/super-admin/organizations/create',
                icon: UserPlus
              },
              {
                label: 'Organization Settings',
                href: '/super-admin/organizations/settings',
                icon: Settings
              }
            ]
          },
          {
            label: 'Analytics & Reports',
            href: '/super-admin/analytics',
            icon: BarChart3,
            children: [
              {
                label: 'User Analytics',
                href: '/super-admin/analytics/users',
                icon: Users
              },
              {
                label: 'Project Reports',
                href: '/super-admin/analytics/projects',
                icon: FolderOpen
              },
              {
                label: 'Revenue Reports',
                href: '/super-admin/analytics/revenue',
                icon: CreditCard
              },
              {
                label: 'System Health',
                href: '/super-admin/analytics/health',
                icon: Activity
              }
            ]
          },
          {
            label: 'System Settings',
            href: '/super-admin/settings',
            icon: Settings,
            children: [
              {
                label: 'General Settings',
                href: '/super-admin/settings/general',
                icon: Settings
              },
              {
                label: 'Email Templates',
                href: '/super-admin/settings/email',
                icon: Mail
              },
              {
                label: 'Security Settings',
                href: '/super-admin/settings/security',
                icon: Shield
              },
              {
                label: 'Backup & Restore',
                href: '/super-admin/settings/backup',
                icon: Database
              }
            ]
          },
          {
            label: 'Activity Logs',
            href: '/super-admin/activity-logs',
            icon: Activity
          }
        ];

      case 'admin':
        return [
          {
            label: 'Dashboard',
            href: '/admin/dashboard',
            icon: Home
          },
          {
            label: 'User Management',
            href: '/admin/users',
            icon: Users,
            children: [
              {
                label: 'All Users',
                href: '/admin/users',
                icon: Users
              },
              {
                label: 'Create User',
                href: '/admin/users/create',
                icon: UserPlus
              },
              {
                label: 'User Permissions',
                href: '/admin/users/permissions',
                icon: UserCheck
              }
            ]
          },
          {
            label: 'Project Management',
            href: '/admin/projects',
            icon: FolderOpen,
            children: [
              {
                label: 'All Projects',
                href: '/admin/projects',
                icon: FolderOpen
              },
              {
                label: 'Create Project',
                href: '/admin/projects/create',
                icon: UserPlus
              },
              {
                label: 'Project Templates',
                href: '/admin/projects/templates',
                icon: FileText
              }
            ]
          },
          {
            label: 'Analytics',
            href: '/admin/analytics',
            icon: BarChart3,
            children: [
              {
                label: 'User Analytics',
                href: '/admin/analytics/users',
                icon: Users
              },
              {
                label: 'Project Analytics',
                href: '/admin/analytics/projects',
                icon: FolderOpen
              },
              {
                label: 'Performance Reports',
                href: '/admin/analytics/performance',
                icon: Activity
              }
            ]
          },
          {
            label: 'Organization',
            href: '/admin/organization',
            icon: Building2,
            children: [
              {
                label: 'Profile',
                href: '/admin/organization/profile',
                icon: Building2
              },
              {
                label: 'Settings',
                href: '/admin/organization/settings',
                icon: Settings
              },
              {
                label: 'Billing',
                href: '/admin/organization/billing',
                icon: CreditCard
              }
            ]
          }
        ];

      case 'manager':
        return [
          {
            label: 'Dashboard',
            href: '/manager/dashboard',
            icon: Home
          },
          {
            label: 'Team Management',
            href: '/manager/team',
            icon: Users,
            children: [
              {
                label: 'Team Members',
                href: '/manager/team',
                icon: Users
              },
              {
                label: 'Assignments',
                href: '/manager/team/assignments',
                icon: UserCheck
              },
              {
                label: 'Performance',
                href: '/manager/team/performance',
                icon: Activity
              }
            ]
          },
          {
            label: 'Projects',
            href: '/manager/projects',
            icon: FolderOpen,
            children: [
              {
                label: 'My Projects',
                href: '/manager/projects',
                icon: FolderOpen
              },
              {
                label: 'Create Project',
                href: '/manager/projects/create',
                icon: UserPlus
              },
              {
                label: 'Project Timeline',
                href: '/manager/projects/timeline',
                icon: Calendar
              }
            ]
          },
          {
            label: 'Reports',
            href: '/manager/reports',
            icon: BarChart3,
            children: [
              {
                label: 'Team Reports',
                href: '/manager/reports/team',
                icon: Users
              },
              {
                label: 'Project Reports',
                href: '/manager/reports/projects',
                icon: FolderOpen
              },
              {
                label: 'Progress Reports',
                href: '/manager/reports/progress',
                icon: Activity
              }
            ]
          }
        ];

      case 'developer':
        return [
          {
            label: 'Dashboard',
            href: '/developer/dashboard',
            icon: Home
          },
          {
            label: 'My Projects',
            href: '/developer/projects',
            icon: FolderOpen,
            children: [
              {
                label: 'Active Projects',
                href: '/developer/projects',
                icon: FolderOpen
              },
              {
                label: 'Completed Projects',
                href: '/developer/projects/completed',
                icon: CheckCircle
              },
              {
                label: 'Project Details',
                href: '/developer/projects/details',
                icon: FileText
              }
            ]
          },
          {
            label: 'Tasks',
            href: '/developer/tasks',
            icon: Briefcase,
            children: [
              {
                label: 'My Tasks',
                href: '/developer/tasks',
                icon: Briefcase
              },
              {
                label: 'Task Board',
                href: '/developer/tasks/board',
                icon: CheckSquare
              },
              {
                label: 'Time Tracking',
                href: '/developer/tasks/time',
                icon: Clock
              }
            ]
          },
          {
            label: 'Resources',
            href: '/developer/resources',
            icon: Code,
            children: [
              {
                label: 'Documentation',
                href: '/developer/resources/docs',
                icon: FileText
              },
              {
                label: 'Code Repository',
                href: '/developer/resources/repo',
                icon: Code
              },
              {
                label: 'Tools',
                href: '/developer/resources/tools',
                icon: Settings
              }
            ]
          }
        ];

      case 'client':
        return [
          {
            label: 'Dashboard',
            href: '/client/dashboard',
            icon: Home
          },
          {
            label: 'My Projects',
            href: '/client/projects',
            icon: FolderOpen,
            children: [
              {
                label: 'Active Projects',
                href: '/client/projects',
                icon: FolderOpen
              },
              {
                label: 'Completed Projects',
                href: '/client/projects/completed',
                icon: CheckCircle
              },
              {
                label: 'Project Requests',
                href: '/client/projects/requests',
                icon: UserPlus
              }
            ]
          },
          {
            label: 'Communications',
            href: '/client/communications',
            icon: Mail,
            children: [
              {
                label: 'Messages',
                href: '/client/communications/messages',
                icon: Mail
              },
              {
                label: 'Notifications',
                href: '/client/communications/notifications',
                icon: Bell
              },
              {
                label: 'Support',
                href: '/client/communications/support',
                icon: Phone
              }
            ]
          },
          {
            label: 'Billing',
            href: '/client/billing',
            icon: CreditCard,
            children: [
              {
                label: 'Invoices',
                href: '/client/billing/invoices',
                icon: FileText
              },
              {
                label: 'Payment History',
                href: '/client/billing/history',
                icon: CreditCard
              },
              {
                label: 'Payment Methods',
                href: '/client/billing/methods',
                icon: Settings
              }
            ]
          }
        ];

      default:
        return [
          {
            label: 'Dashboard',
            href: '/dashboard',
            icon: Home
          }
        ];
    }
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isActive = location.pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);
    const Icon = item.icon;

    return (
      <div key={item.href} className="space-y-1">
        <Link
          to={item.href}
          className={cn(
            'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
            level === 0 ? 'mx-2' : 'mx-4',
            isActive
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
          )}
          onClick={() => hasChildren && toggleExpanded(item.label)}
        >
          <Icon className={cn('h-5 w-5 mr-3', level > 0 && 'h-4 w-4 mr-2')} />
          {!collapsed && (
            <>
              <span className="flex-1">{item.label}</span>
              {hasChildren && (
                <ChevronRight
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isExpanded && 'rotate-90'
                  )}
                />
              )}
            </>
          )}
        </Link>

        {hasChildren && isExpanded && !collapsed && (
          <div className="ml-2 space-y-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const navItems = getNavItems();

  return (
    <div className={cn(
      'flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">BizTreck</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {navItems.map(item => renderNavItem(item))}
      </nav>

      {/* User Profile & Logout */}
      {!collapsed && user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <span className="text-indigo-700 font-medium text-sm">
                {user.profile?.firstName?.[0] || user.email?.[0] || 'U'}
                {user.profile?.lastName?.[0] || ''}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.profile?.firstName && user.profile?.lastName 
                  ? `${user.profile.firstName} ${user.profile.lastName}`
                  : user.email || 'User'
                }
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role?.replace('_', ' ') || 'User'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}

      {/* Collapsed User Profile */}
      {collapsed && user && (
        <div className="p-2 border-t border-gray-200">
          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-indigo-700 font-medium text-sm">
              {user.profile?.firstName?.[0] || user.email?.[0] || 'U'}
              {user.profile?.lastName?.[0] || ''}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
