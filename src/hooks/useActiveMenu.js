import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from '../contexts/NavigationContext';

const useActiveMenu = () => {
  const location = useLocation();
  const { navigation, setActiveMenu, activeMenu } = useNavigation();

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Route to menu mapping
    const routeMenuMap = {
      '/dashboard': 'dashboard',
      '/admin/users': 'user_management',
      '/admin/users/admins': 'admins',
      '/admin/users/list': 'users',
      '/admin/create-admin': 'create_admin',
      '/admin/roles': 'roles',
      '/organization': 'organization',
      '/organization/profile': 'company',
      '/organization/departments': 'departments',
      '/organization/billing': 'billing',
      '/analytics': 'analytics',
      '/analytics/usage': 'usage_reports',
      '/analytics/performance': 'performance',
      '/analytics/audit': 'audit_logs',
      '/system': 'system_config',
      '/system/email': 'email_settings',
      '/system/integrations': 'integrations',
      '/system/security': 'security',
      '/team': 'team_management',
      '/team/users': 'users',
      '/team/teams': 'teams',
      '/team/departments': 'departments',
      '/projects': 'project_management',
      '/projects/my': 'my_projects',
      '/projects/active': 'active_projects',
      '/projects/assigned': 'assigned_projects',
      '/projects/templates': 'templates',
      '/projects/categories': 'categories',
      '/projects/planning': 'project_planning',
      '/pipelines': 'pipeline_management',
      '/pipelines/sales': 'sales_pipelines',
      '/pipelines/projects': 'project_pipelines',
      '/pipelines/workflows': 'workflows',
      '/pipelines/clients': 'client_pipelines',
      '/pipelines/approvals': 'approvals',
      '/time': 'time_resource',
      '/time/tracking': 'time_tracking',
      '/time/my': 'my_time_logs',
      '/time/team': 'team_time_logs',
      '/time/timesheets': 'timesheets',
      '/time/resources': 'resource_planning',
      '/time/capacity': 'capacity',
      '/time/log': 'time_tracking',
      '/reports': 'reports',
      '/reports/projects': 'project_reports',
      '/reports/team': 'team_reports',
      '/reports/financial': 'financial_reports',
      '/reports/development': 'development_reports',
      '/reports/sprints': 'sprint_reports',
      '/reports/clients': 'client_reports',
      '/clients': 'client_management',
      '/clients/portal': 'client_portal',
      '/clients/communication': 'communication',
      '/clients/contracts': 'contracts',
      '/dev': 'development_tools',
      '/dev/jira': 'jira_issues',
      '/dev/bitbucket': 'bitbucket_repos',
      '/dev/activity': 'code_activity',
      '/dev/reviews': 'code_reviews',
      '/knowledge': 'knowledge_base',
      '/knowledge/docs': 'documentation',
      '/knowledge/practices': 'best_practices',
      '/knowledge/standards': 'code_standards',
      '/documents': 'documents',
      '/documents/projects': 'project_files',
      '/documents/reports': 'reports',
      '/documents/contracts': 'contracts',
      '/communication': 'communication',
      '/communication/messages': 'messages',
      '/communication/meetings': 'meeting_notes',
      '/communication/updates': 'updates',
      '/communication/new': 'communication',
      '/billing': 'billing',
      '/billing/invoices': 'invoices',
      '/billing/payments': 'payment_history',
      '/billing/details': 'billing_details',
      '/support': 'support',
      '/support/help': 'help_center',
      '/support/contact': 'contact_support',
      '/support/feedback': 'feedback',
      '/tasks/my': 'my_tasks',
      '/tasks/team': 'team_tasks',
      '/tasks/assign': 'my_tasks',
      '/tasks/create': 'my_tasks'
    };

    // Find exact match first
    let menuId = routeMenuMap[currentPath];
    
    // If no exact match, try to find the best partial match
    if (!menuId) {
      const pathSegments = currentPath.split('/').filter(Boolean);
      
      // Try progressively shorter paths
      for (let i = pathSegments.length; i > 0; i--) {
        const partialPath = '/' + pathSegments.slice(0, i).join('/');
        if (routeMenuMap[partialPath]) {
          menuId = routeMenuMap[partialPath];
          break;
        }
      }
    }

    // Fallback: search through navigation items
    if (!menuId && navigation.length > 0) {
      const findMenuByPath = (items, path) => {
        for (const item of items) {
          if (item.path === path || path.startsWith(item.path + '/')) {
            return item.id;
          }
          if (item.children) {
            const childMatch = findMenuByPath(item.children, path);
            if (childMatch) return childMatch;
          }
        }
        return null;
      };
      
      menuId = findMenuByPath(navigation, currentPath);
    }

    // Set active menu if found and different from current
    if (menuId && menuId !== activeMenu) {
      setActiveMenu(menuId);
    }
  }, [location.pathname, navigation, setActiveMenu, activeMenu]);

  return { activeMenu, setActiveMenu };
};

export default useActiveMenu;
