import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Settings, LogOut, Bell } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import MenuItem from './MenuItem';
import MenuSearch from './MenuSearch';
import QuickActions from './QuickActions';
import { cn } from '../../utils/cn';

const Sidebar = () => {
  const {
    navigation,
    isCollapsed,
    toggleSidebar,
    user,
    loading,
    error,
    favoriteMenus,
    expandedMenus,
    activeMenu
  } = useNavigation();

  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get favorite menu items
  const favoriteItems = navigation.filter(item => 
    favoriteMenus.includes(item.id)
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className={cn(
        'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-72'
      )}>
        <div className="flex items-center justify-center h-16">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(
        'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300',
        isCollapsed ? 'w-16' : 'w-72'
      )}>
        <div className="flex items-center justify-center h-16 text-red-500">
          <span className="text-sm">Error loading menu</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 z-50',
        'fixed md:relative h-full',
        {
          'w-72': !isCollapsed,
          'w-16': isCollapsed,
          '-translate-x-full md:translate-x-0': isMobile && isCollapsed,
          'translate-x-0': !isMobile || !isCollapsed
        }
      )}>
        
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BT</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  BizTreck
                </h1>
              </div>
            </div>
          )}
          
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* User Info */}
        {!isCollapsed && user && (
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user.role}
                </p>
              </div>
              <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        {!isCollapsed && (
          <div className="px-4 py-3">
            <button
              onClick={() => setShowSearch(true)}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <Search className="w-4 h-4" />
              <span>Search menu... (Ctrl+K)</span>
            </button>
          </div>
        )}

        {/* Quick Actions */}
        <QuickActions />

        {/* Favorites */}
        {!isCollapsed && favoriteItems.length > 0 && (
          <div className="px-4 py-2">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Favorites
            </h3>
            <div className="space-y-1">
              {favoriteItems.map((item) => (
                <MenuItem
                  key={`fav-${item.id}`}
                  item={item}
                  level={0}
                  isActive={activeMenu === item.id}
                  isExpanded={expandedMenus.includes(item.id)}
                  isFavorite={true}
                  showTooltip={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-4 pr-2">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                level={0}
                isActive={activeMenu === item.id}
                isExpanded={expandedMenus.includes(item.id)}
                isFavorite={favoriteMenus.includes(item.id)}
                showTooltip={isCollapsed}
              />
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <button 
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              <button 
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <MenuSearch onClose={() => setShowSearch(false)} />
      )}
    </>
  );
};

export default Sidebar;
