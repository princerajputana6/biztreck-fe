import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useBreadcrumbs } from '../../contexts/NavigationContext';
import { cn } from '../../utils/cn';

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  if (!breadcrumbs || breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isFirst = index === 0;
        
        return (
          <React.Fragment key={`breadcrumb-${index}`}>
            {/* Separator */}
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            )}
            
            {/* Breadcrumb Item */}
            {isLast ? (
              <span className="text-gray-900 dark:text-white font-medium">
                {isFirst && <Home className="w-4 h-4 inline mr-1" />}
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className={cn(
                  'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200',
                  'flex items-center'
                )}
              >
                {isFirst && <Home className="w-4 h-4 mr-1" />}
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
