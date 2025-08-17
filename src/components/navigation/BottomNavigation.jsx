import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Clock, 
  MessageSquare, 
  Menu,
  Bell
} from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { cn } from '../../utils/cn';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, toggleSidebar, trackAnalytics } = useNavigation();

  // Don't show on desktop
  const isMobile = window.innerWidth < 768;
  if (!isMobile) return null;

  // Define primary navigation items based on user role
  const getPrimaryNavItems = (userRole) => {
    const baseItems = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        path: '/dashboard'
      }
    ];

    switch (userRole) {
      case 'superadmin':
      case 'admin':
        return [
          ...baseItems,
          {
            id: 'users',
            label: 'Users',
            icon: MessageSquare,
            path: '/admin/users'
          },
          {
            id: 'projects',
            label: 'Projects',
            icon: Briefcase,
            path: '/projects'
          },
          {
            id: 'analytics',
            label: 'Analytics',
            icon: Clock,
            path: '/analytics'
          }
        ];
      
      case 'manager':
        return [
          ...baseItems,
          {
            id: 'projects',
            label: 'Projects',
            icon: Briefcase,
            path: '/projects/my'
          },
          {
            id: 'team',
            label: 'Team',
            icon: MessageSquare,
            path: '/team'
          },
          {
            id: 'time',
            label: 'Time',
            icon: Clock,
            path: '/time'
          }
        ];
      
      case 'developer':
        return [
          ...baseItems,
          {
            id: 'projects',
            label: 'Projects',
            icon: Briefcase,
            path: '/projects/assigned'
          },
          {
            id: 'time',
            label: 'Time',
            icon: Clock,
            path: '/time/my'
          },
          {
            id: 'dev',
            label: 'Dev Tools',
            icon: MessageSquare,
            path: '/dev'
          }
        ];
      
      case 'client':
        return [
          ...baseItems,
          {
            id: 'projects',
            label: 'Projects',
            icon: Briefcase,
            path: '/projects'
          },
          {
            id: 'documents',
            label: 'Documents',
            icon: Clock,
            path: '/documents'
          },
          {
            id: 'communication',
            label: 'Messages',
            icon: MessageSquare,
            path: '/communication'
          }
        ];
      
      default:
        return baseItems;
    }
  };

  const navItems = getPrimaryNavItems(user?.role);

  const handleNavClick = (item) => {
    navigate(item.path);
    trackAnalytics('bottom_nav_click', { 
      itemId: item.id, 
      path: item.path 
    });
  };

  const handleMenuClick = () => {
    toggleSidebar();
    trackAnalytics('bottom_nav_menu_toggle');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40 md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {/* Navigation Items */}
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors duration-200 min-w-0 flex-1',
                {
                  'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20': active,
                  'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white': !active
                }
              )}
            >
              <IconComponent className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium truncate">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* More Menu Button */}
        <button
          onClick={handleMenuClick}
          className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors duration-200 min-w-0 flex-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <Menu className="w-5 h-5 mb-1" />
          <span className="text-xs font-medium">More</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
