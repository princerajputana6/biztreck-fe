import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ThemeContext = createContext();

// Theme state
const initialState = {
  theme: 'light', // 'light', 'dark', 'auto'
  sidebarTheme: 'light',
  accentColor: 'blue',
  sidebarWidth: 280,
  compactMode: false,
  showIcons: true,
  showLabels: true,
  animationsEnabled: true,
  highContrast: false,
  customColors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#1f2937'
  }
};

// Action types
const ACTIONS = {
  SET_THEME: 'SET_THEME',
  SET_SIDEBAR_THEME: 'SET_SIDEBAR_THEME',
  SET_ACCENT_COLOR: 'SET_ACCENT_COLOR',
  SET_SIDEBAR_WIDTH: 'SET_SIDEBAR_WIDTH',
  TOGGLE_COMPACT_MODE: 'TOGGLE_COMPACT_MODE',
  TOGGLE_ICONS: 'TOGGLE_ICONS',
  TOGGLE_LABELS: 'TOGGLE_LABELS',
  TOGGLE_ANIMATIONS: 'TOGGLE_ANIMATIONS',
  TOGGLE_HIGH_CONTRAST: 'TOGGLE_HIGH_CONTRAST',
  SET_CUSTOM_COLORS: 'SET_CUSTOM_COLORS',
  RESET_THEME: 'RESET_THEME'
};

// Reducer
function themeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };
    
    case ACTIONS.SET_SIDEBAR_THEME:
      return { ...state, sidebarTheme: action.payload };
    
    case ACTIONS.SET_ACCENT_COLOR:
      return { ...state, accentColor: action.payload };
    
    case ACTIONS.SET_SIDEBAR_WIDTH:
      return { ...state, sidebarWidth: action.payload };
    
    case ACTIONS.TOGGLE_COMPACT_MODE:
      return { ...state, compactMode: !state.compactMode };
    
    case ACTIONS.TOGGLE_ICONS:
      return { ...state, showIcons: !state.showIcons };
    
    case ACTIONS.TOGGLE_LABELS:
      return { ...state, showLabels: !state.showLabels };
    
    case ACTIONS.TOGGLE_ANIMATIONS:
      return { ...state, animationsEnabled: !state.animationsEnabled };
    
    case ACTIONS.TOGGLE_HIGH_CONTRAST:
      return { ...state, highContrast: !state.highContrast };
    
    case ACTIONS.SET_CUSTOM_COLORS:
      return { 
        ...state, 
        customColors: { ...state.customColors, ...action.payload } 
      };
    
    case ACTIONS.RESET_THEME:
      return initialState;
    
    default:
      return state;
  }
}

// Theme Provider
export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('biztreck_theme');
    if (savedTheme) {
      try {
        const themeData = JSON.parse(savedTheme);
        // Only load the theme if it was explicitly saved, otherwise default to light
        if (themeData.theme) {
          dispatch({ type: ACTIONS.SET_THEME, payload: themeData.theme });
        }
        // Load other theme settings
        Object.keys(themeData).forEach(key => {
          if (key !== 'theme' && key in initialState) {
            const actionType = `SET_${key.toUpperCase()}`;
            if (ACTIONS[actionType]) {
              dispatch({ type: ACTIONS[actionType], payload: themeData[key] });
            }
          }
        });
      } catch (error) {
        console.error('Failed to load theme:', error);
        // If there's an error, ensure we default to light theme
        dispatch({ type: ACTIONS.SET_THEME, payload: 'light' });
      }
    } else {
      // No saved theme, explicitly set to light
      dispatch({ type: ACTIONS.SET_THEME, payload: 'light' });
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('biztreck_theme', JSON.stringify(state));
  }, [state]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Apply theme class to both html and body elements
    if (state.theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const themeToApply = prefersDark ? 'dark' : 'light';
      root.classList.add(themeToApply);
      body.classList.add(themeToApply);
      root.setAttribute('data-theme', themeToApply);
    } else {
      root.classList.add(state.theme);
      body.classList.add(state.theme);
      root.setAttribute('data-theme', state.theme);
    }

    // Apply custom CSS properties
    root.style.setProperty('--sidebar-width', `${state.sidebarWidth}px`);
    root.style.setProperty('--primary-color', state.customColors.primary);
    root.style.setProperty('--secondary-color', state.customColors.secondary);
    root.style.setProperty('--success-color', state.customColors.success);
    root.style.setProperty('--warning-color', state.customColors.warning);
    root.style.setProperty('--error-color', state.customColors.error);
    root.style.setProperty('--background-color', state.customColors.background);
    root.style.setProperty('--surface-color', state.customColors.surface);
    root.style.setProperty('--text-color', state.customColors.text);

    // Apply accent color
    const accentColors = {
      blue: '#3b82f6',
      green: '#10b981',
      purple: '#8b5cf6',
      pink: '#ec4899',
      orange: '#f97316',
      red: '#ef4444',
      indigo: '#6366f1',
      teal: '#14b8a6'
    };
    root.style.setProperty('--accent-color', accentColors[state.accentColor] || accentColors.blue);

    // Apply high contrast
    if (state.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply animations
    if (!state.animationsEnabled) {
      root.classList.add('no-animations');
    } else {
      root.classList.remove('no-animations');
    }

    // Log theme change for debugging
    console.log('Theme applied:', state.theme);
    console.log('Document classes:', root.className);
  }, [state]);

  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    setTheme: (theme) => dispatch({ type: ACTIONS.SET_THEME, payload: theme }),
    setSidebarTheme: (theme) => dispatch({ type: ACTIONS.SET_SIDEBAR_THEME, payload: theme }),
    setAccentColor: (color) => dispatch({ type: ACTIONS.SET_ACCENT_COLOR, payload: color }),
    setSidebarWidth: (width) => dispatch({ type: ACTIONS.SET_SIDEBAR_WIDTH, payload: width }),
    toggleCompactMode: () => dispatch({ type: ACTIONS.TOGGLE_COMPACT_MODE }),
    toggleIcons: () => dispatch({ type: ACTIONS.TOGGLE_ICONS }),
    toggleLabels: () => dispatch({ type: ACTIONS.TOGGLE_LABELS }),
    toggleAnimations: () => dispatch({ type: ACTIONS.TOGGLE_ANIMATIONS }),
    toggleHighContrast: () => dispatch({ type: ACTIONS.TOGGLE_HIGH_CONTRAST }),
    setCustomColors: (colors) => dispatch({ type: ACTIONS.SET_CUSTOM_COLORS, payload: colors }),
    resetTheme: () => dispatch({ type: ACTIONS.RESET_THEME })
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
