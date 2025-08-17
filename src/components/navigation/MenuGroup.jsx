import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigation } from '../../contexts/NavigationContext';
import MenuItem from './MenuItem';
import { cn } from '../../utils/cn';

const MenuGroup = ({ 
  title, 
  items, 
  isExpanded = false, 
  onToggle,
  showDivider = true,
  collapsible = true 
}) => {
  const { isCollapsed, expandedMenus, activeMenu, favoriteMenus } = useNavigation();
  
  if (!items || items.length === 0) return null;
  
  const handleToggle = () => {
    if (collapsible && onToggle) {
      onToggle();
    }
  };

  return (
    <div className="mb-2">
      {/* Group Header */}
      {title && !isCollapsed && (
        <div className="px-4 mb-2">
          {showDivider && (
            <div className="border-t border-gray-200 dark:border-gray-700 mb-3" />
          )}
          
          {collapsible ? (
            <button
              onClick={handleToggle}
              className="flex items-center w-full text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <span className="flex-1">{title}</span>
              {collapsible && (
                <ChevronRight 
                  className={cn(
                    'w-3 h-3 transition-transform duration-200',
                    { 'rotate-90': isExpanded }
                  )} 
                />
              )}
            </button>
          ) : (
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {title}
            </div>
          )}
        </div>
      )}
      
      {/* Group Items */}
      <div className={cn(
        'transition-all duration-200 ease-in-out overflow-hidden',
        {
          'max-h-0': collapsible && !isExpanded,
          'max-h-screen': !collapsible || isExpanded
        }
      )}>
        {items.map((item) => (
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
      </div>
    </div>
  );
};

export default MenuGroup;
