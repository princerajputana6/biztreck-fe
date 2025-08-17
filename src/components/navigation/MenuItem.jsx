import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronRight, 
  Star, 
  StarOff,
  MoreHorizontal
} from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import { cn } from '../../utils/cn';

const MenuItem = ({ 
  item, 
  level = 0, 
  isActive = false, 
  isExpanded = false,
  isFavorite = false,
  showTooltip = false 
}) => {
  const navigate = useNavigate();
  const { 
    toggleMenu, 
    setActiveMenu, 
    addFavorite, 
    removeFavorite, 
    isCollapsed,
    trackAnalytics 
  } = useNavigation();
  
  const [showActions, setShowActions] = useState(false);
  
  const hasChildren = item.children && item.children.length > 0;
  const isNested = level > 0;
  
  // Get icon component dynamically
  const getIcon = (iconName) => {
    // This would typically use a dynamic import or icon library
    // For now, using a simple mapping
    const iconMap = {
      'LayoutDashboard': '📊',
      'Users': '👥',
      'Building2': '🏢',
      'TrendingUp': '📈',
      'Settings': '⚙️',
      'Briefcase': '💼',
      'GitBranch': '🔀',
      'BarChart3': '📊',
      'Link': '🔗',
      'Clock': '⏰',
      'UserCheck': '✅',
      'Code': '💻',
      'BookOpen': '📚',
      'FileText': '📄',
      'MessageSquare': '💬',
      'CreditCard': '💳',
      'HelpCircle': '❓'
    };
    
    return iconMap[iconName] || '📄';
  };

  const handleClick = (e) => {
    e.preventDefault();
    
    if (hasChildren) {
      toggleMenu(item.id);
      trackAnalytics('menu_expand', { 
        menuId: item.id, 
        expanded: !isExpanded,
        level 
      });
    } else {
      setActiveMenu(item.id);
      navigate(item.path);
      trackAnalytics('menu_navigate', { 
        menuId: item.id, 
        path: item.path,
        level 
      });
    }
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(item.id);
    } else {
      addFavorite(item.id);
    }
  };

  const menuItemClasses = cn(
    'group relative flex items-center w-full text-left transition-all duration-200',
    'hover:bg-gray-50 dark:hover:bg-gray-800',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset',
    {
      'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500': isActive,
      'text-gray-700 dark:text-gray-300': !isActive,
      'pl-4': level === 0,
      'pl-8': level === 1,
      'pl-12': level === 2,
      'py-2': !isCollapsed,
      'py-3 justify-center': isCollapsed && level === 0,
      'rounded-lg mx-2 mb-1': level === 0,
      'rounded-md mx-1 mb-0.5': level > 0
    }
  );

  const iconClasses = cn(
    'flex-shrink-0 transition-colors duration-200',
    {
      'w-5 h-5 mr-3': !isCollapsed || level > 0,
      'w-6 h-6': isCollapsed && level === 0,
      'text-blue-600 dark:text-blue-400': isActive,
      'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300': !isActive
    }
  );

  const labelClasses = cn(
    'flex-1 font-medium transition-all duration-200',
    {
      'text-sm': level === 0,
      'text-xs': level > 0,
      'hidden': isCollapsed && level === 0,
      'truncate': true
    }
  );

  const chevronClasses = cn(
    'flex-shrink-0 w-4 h-4 transition-transform duration-200',
    {
      'rotate-90': isExpanded,
      'text-gray-400 dark:text-gray-500': !isActive,
      'text-blue-600 dark:text-blue-400': isActive,
      'hidden': isCollapsed && level === 0
    }
  );

  return (
    <div className="relative">
      {/* Main Menu Item */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        className={menuItemClasses}
        title={showTooltip ? item.label : undefined}
      >
        {/* Icon */}
        <span className={iconClasses}>
          {getIcon(item.icon)}
        </span>
        
        {/* Label */}
        <span className={labelClasses}>
          {item.label}
        </span>
        
        {/* Badge/Counter */}
        {item.badge && (
          <span className="flex-shrink-0 ml-2 px-2 py-0.5 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full">
            {item.badge}
          </span>
        )}
        
        {/* Chevron for expandable items */}
        {hasChildren && (
          <ChevronRight className={chevronClasses} />
        )}
        
        {/* Favorite Star */}
        {!isCollapsed && showActions && level === 0 && (
          <button
            onClick={handleFavoriteToggle}
            className="flex-shrink-0 ml-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
            ) : (
              <StarOff className="w-3 h-3 text-gray-400" />
            )}
          </button>
        )}
      </button>
      
      {/* Submenu */}
      {hasChildren && isExpanded && (
        <div className={cn(
          'transition-all duration-200 ease-in-out overflow-hidden',
          {
            'ml-0': level === 0,
            'ml-2': level > 0
          }
        )}>
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              level={level + 1}
              isActive={child.id === useNavigation().activeMenu}
              isExpanded={useNavigation().expandedMenus.includes(child.id)}
              isFavorite={useNavigation().favoriteMenus.includes(child.id)}
              showTooltip={isCollapsed}
            />
          ))}
        </div>
      )}
      
      {/* Tooltip for collapsed sidebar */}
      {showTooltip && isCollapsed && level === 0 && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded shadow-lg z-50 whitespace-nowrap">
          {item.label}
          {hasChildren && (
            <div className="mt-1 text-xs text-gray-300">
              {item.children.length} items
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
