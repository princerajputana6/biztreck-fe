import React from 'react';
import Sidebar from '../navigation/Sidebar';
import BottomNavigation from '../navigation/BottomNavigation';
import Breadcrumbs from '../navigation/Breadcrumbs';
import { useNavigation } from '../../contexts/NavigationContext';
import { cn } from '../../utils/cn';

const AppLayout = ({ children }) => {
  const { isCollapsed } = useNavigation();

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className={cn(
        'flex-1 flex flex-col transition-all duration-300 min-w-0',
        {
          'ml-16': isCollapsed,
          'ml-72': !isCollapsed
        },
        'md:ml-0' // Reset margin on mobile since sidebar is overlay
      )}>
        
        {/* Top Navigation Bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <Breadcrumbs />
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      
      {/* Bottom Navigation (Mobile Only) */}
      <BottomNavigation />
    </div>
  );
};

export default AppLayout;
