import React from 'react';
import { Plus, Clock, Users, BarChart3, UserPlus, Activity, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../contexts/NavigationContext';
import { cn } from '../../utils/cn';

const QuickActions = () => {
  const navigate = useNavigate();
  const { quickActions, isCollapsed, user, trackAnalytics } = useNavigation();

  if (!quickActions || quickActions.length === 0) return null;

  const getIcon = (iconName) => {
    const iconMap = {
      'Plus': Plus,
      'Clock': Clock,
      'Users': Users,
      'BarChart3': BarChart3,
      'UserPlus': UserPlus,
      'Activity': Activity,
      'Database': Database,
      'UserCheck': Users,
      'GitPullRequest': BarChart3,
      'TrendingUp': BarChart3,
      'MessageSquare': Users,
      'Download': Database
    };
    
    return iconMap[iconName] || Plus;
  };

  const handleActionClick = (action) => {
    if (action.path) {
      navigate(action.path);
      trackAnalytics('quick_action_navigate', { 
        actionId: action.id, 
        path: action.path 
      });
    } else if (action.action) {
      // Handle custom actions
      trackAnalytics('quick_action_custom', { 
        actionId: action.id, 
        action: action.action 
      });
      
      switch (action.action) {
        case 'backup':
          // Handle backup action
          console.log('Backup action triggered');
          break;
        default:
          console.log('Unknown action:', action.action);
      }
    }
  };

  if (isCollapsed) {
    return (
      <div className="px-2 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          {quickActions.slice(0, 3).map((action) => {
            const IconComponent = getIcon(action.icon);
            return (
              <button
                key={action.id}
                onClick={() => handleActionClick(action)}
                className="w-full p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200 group"
                title={action.label}
              >
                <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 gap-2">
        {quickActions.map((action) => {
          const IconComponent = getIcon(action.icon);
          return (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className="flex items-center space-x-3 w-full p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors duration-200 group"
            >
              <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300 truncate">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
