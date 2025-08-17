import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api/apiClient';

const NavigationContext = createContext();

// Navigation state
const initialState = {
  navigation: [],
  quickActions: [],
  isCollapsed: false,
  expandedMenus: [],
  favoriteMenus: ['dashboard'],
  activeMenu: null,
  breadcrumbs: [],
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  preferences: {
    sidebarWidth: 280,
    theme: 'light',
    showIcons: true,
    showLabels: true
  },
  loading: false,
  error: null,
  user: null
};

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_NAVIGATION: 'SET_NAVIGATION',
  SET_USER: 'SET_USER',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_COLLAPSED: 'SET_COLLAPSED',
  SET_ACTIVE_MENU: 'SET_ACTIVE_MENU',
  TOGGLE_MENU: 'TOGGLE_MENU',
  SET_EXPANDED_MENUS: 'SET_EXPANDED_MENUS',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  SET_BREADCRUMBS: 'SET_BREADCRUMBS',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_SEARCHING: 'SET_SEARCHING',
  SET_PREFERENCES: 'SET_PREFERENCES',
  CLEAR_SEARCH: 'CLEAR_SEARCH'
};

// Reducer
function navigationReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ACTIONS.SET_NAVIGATION:
      return { 
        ...state, 
        navigation: action.payload.navigation || [],
        quickActions: action.payload.quickActions || [],
        loading: false,
        error: null
      };
    
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    
    case ACTIONS.TOGGLE_SIDEBAR:
      return { ...state, isCollapsed: !state.isCollapsed };
    
    case ACTIONS.SET_COLLAPSED:
      return { ...state, isCollapsed: action.payload };
    
    case ACTIONS.SET_ACTIVE_MENU:
      return { ...state, activeMenu: action.payload };
    
    case ACTIONS.TOGGLE_MENU:
      const menuId = action.payload;
      const expandedMenus = state.expandedMenus.includes(menuId)
        ? state.expandedMenus.filter(id => id !== menuId)
        : [...state.expandedMenus, menuId];
      return { ...state, expandedMenus };
    
    case ACTIONS.SET_EXPANDED_MENUS:
      return { ...state, expandedMenus: action.payload };
    
    case ACTIONS.ADD_FAVORITE:
      if (!state.favoriteMenus.includes(action.payload)) {
        return { 
          ...state, 
          favoriteMenus: [...state.favoriteMenus, action.payload] 
        };
      }
      return state;
    
    case ACTIONS.REMOVE_FAVORITE:
      return { 
        ...state, 
        favoriteMenus: state.favoriteMenus.filter(id => id !== action.payload) 
      };
    
    case ACTIONS.SET_BREADCRUMBS:
      return { ...state, breadcrumbs: action.payload };
    
    case ACTIONS.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    
    case ACTIONS.SET_SEARCH_RESULTS:
      return { ...state, searchResults: action.payload };
    
    case ACTIONS.SET_SEARCHING:
      return { ...state, isSearching: action.payload };
    
    case ACTIONS.SET_PREFERENCES:
      return { 
        ...state, 
        preferences: { ...state.preferences, ...action.payload } 
      };
    
    case ACTIONS.CLEAR_SEARCH:
      return { 
        ...state, 
        searchQuery: '', 
        searchResults: [], 
        isSearching: false 
      };
    
    default:
      return state;
  }
}

// Navigation Provider
export function NavigationProvider({ children }) {
  const [state, dispatch] = useReducer(navigationReducer, initialState);
  const location = useLocation();

  // Load navigation data
  const loadNavigation = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      
      const data = await api.get('/api/navigation/menu');
      
      if (data.success) {
        dispatch({ type: ACTIONS.SET_NAVIGATION, payload: data });
        dispatch({ type: ACTIONS.SET_USER, payload: data.user });
      } else {
        throw new Error(data.error || 'Failed to load navigation');
      }
    } catch (error) {
      console.error('Navigation load error:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // Load user preferences
  const loadPreferences = async () => {
    try {
      const data = await api.get('/api/navigation/preferences');
      if (data.success && data.preferences) {
        dispatch({ type: ACTIONS.SET_PREFERENCES, payload: data.preferences });
        dispatch({ type: ACTIONS.SET_COLLAPSED, payload: data.preferences.sidebarCollapsed });
        dispatch({ type: ACTIONS.SET_EXPANDED_MENUS, payload: data.preferences.expandedMenus || [] });
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
    }
  };

  // Save preferences
  const savePreferences = async (preferences) => {
    try {
      const data = await api.post('/api/navigation/preferences', preferences);
      if (data.success) {
        dispatch({ type: ACTIONS.SET_PREFERENCES, payload: preferences });
      }
    } catch (error) {
      console.error('Failed to save preferences:', error);
    }
  };

  // Search navigation
  const searchNavigation = async (query) => {
    if (!query || query.length < 2) {
      dispatch({ type: ACTIONS.CLEAR_SEARCH });
      return;
    }

    try {
      dispatch({ type: ACTIONS.SET_SEARCHING, payload: true });
      dispatch({ type: ACTIONS.SET_SEARCH_QUERY, payload: query });
      
      const data = await api.post('/api/navigation/search', { query });
      if (data.success) {
        dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: data.results });
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      dispatch({ type: ACTIONS.SET_SEARCHING, payload: false });
    }
  };

  // Track analytics
  const trackAnalytics = async (event, data = {}) => {
    try {
      await api.post('/api/navigation/analytics', {
        event,
        ...data,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  };

  // Update active menu based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find matching menu item
    const findActiveMenu = (items, path) => {
      for (const item of items) {
        if (item.path === path || path.startsWith(item.path + '/')) {
          return item.id;
        }
        if (item.children) {
          const childMatch = findActiveMenu(item.children, path);
          if (childMatch) return childMatch;
        }
      }
      return null;
    };

    const activeMenuId = findActiveMenu(state.navigation, currentPath);
    if (activeMenuId && activeMenuId !== state.activeMenu) {
      dispatch({ type: ACTIONS.SET_ACTIVE_MENU, payload: activeMenuId });
    }

    // Load breadcrumbs
    const loadBreadcrumbs = async () => {
      try {
        const data = await api.get(`/api/navigation/breadcrumbs?path=${currentPath}`);
        if (data.success) {
          dispatch({ type: ACTIONS.SET_BREADCRUMBS, payload: data.breadcrumbs });
        }
      } catch (error) {
        console.error('Breadcrumbs error:', error);
      }
    };

    const publicPaths = ['/login', '/register', '/forgot-password'];
    const token = localStorage.getItem('token');

    if (token && !publicPaths.includes(location.pathname)) {
      loadBreadcrumbs();
    } else {
      dispatch({ type: ACTIONS.SET_BREADCRUMBS, payload: [] });
    }
  }, [location.pathname, state.navigation]);

  // Load navigation on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadNavigation();
      loadPreferences();
    }
  }, []);

  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    toggleSidebar: () => {
      dispatch({ type: ACTIONS.TOGGLE_SIDEBAR });
      trackAnalytics('sidebar_toggle', { collapsed: !state.isCollapsed });
    },
    
    setCollapsed: (collapsed) => {
      dispatch({ type: ACTIONS.SET_COLLAPSED, payload: collapsed });
      savePreferences({ ...state.preferences, sidebarCollapsed: collapsed });
    },
    
    toggleMenu: (menuId) => {
      dispatch({ type: ACTIONS.TOGGLE_MENU, payload: menuId });
      trackAnalytics('menu_toggle', { menuId, expanded: !state.expandedMenus.includes(menuId) });
    },
    
    setActiveMenu: (menuId) => {
      dispatch({ type: ACTIONS.SET_ACTIVE_MENU, payload: menuId });
      trackAnalytics('menu_click', { menuId });
    },
    
    addFavorite: (menuId) => {
      dispatch({ type: ACTIONS.ADD_FAVORITE, payload: menuId });
      const newFavorites = [...state.favoriteMenus, menuId];
      savePreferences({ ...state.preferences, favoriteMenus: newFavorites });
      trackAnalytics('favorite_add', { menuId });
    },
    
    removeFavorite: (menuId) => {
      dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: menuId });
      const newFavorites = state.favoriteMenus.filter(id => id !== menuId);
      savePreferences({ ...state.preferences, favoriteMenus: newFavorites });
      trackAnalytics('favorite_remove', { menuId });
    },
    
    searchNavigation,
    clearSearch: () => dispatch({ type: ACTIONS.CLEAR_SEARCH }),
    
    updatePreferences: (preferences) => {
      savePreferences({ ...state.preferences, ...preferences });
    },
    
    reloadNavigation: loadNavigation,
    trackAnalytics
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

// Custom hooks
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}

export function useActiveMenu() {
  const { activeMenu, setActiveMenu } = useNavigation();
  return { activeMenu, setActiveMenu };
}

export function useBreadcrumbs() {
  const { breadcrumbs } = useNavigation();
  return breadcrumbs;
}

export function useMenuPermissions() {
  const { user } = useNavigation();
  
  const checkPermission = (requiredPermissions = []) => {
    if (!user || !user.permissions) return false;
    if (user.role === 'superadmin') return true;
    
    return requiredPermissions.some(permission => 
      user.permissions.includes(permission)
    );
  };
  
  return { checkPermission, userRole: user?.role, userPermissions: user?.permissions };
}
