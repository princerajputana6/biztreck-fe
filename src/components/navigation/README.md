# BizTreck Navigation System

A comprehensive, role-based sidebar navigation system with advanced features including search, favorites, themes, and analytics.

## Features

- **Role-Based Navigation**: Dynamic menu structures based on user roles (superadmin, admin, manager, developer, client)
- **Responsive Design**: Mobile-first with bottom navigation and collapsible sidebar
- **Search Functionality**: Global menu search with keyboard shortcuts (Ctrl+K)
- **Favorites System**: Pin frequently used menu items
- **Theme Customization**: Light/dark themes with accent colors and accessibility options
- **Analytics Tracking**: Usage analytics for menu interactions
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Accessibility**: WCAG compliant with screen reader support

## Quick Start

### 1. Wrap your app with providers

```jsx
import { NavigationProvider } from './contexts/NavigationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AccessibilityProvider } from './components/accessibility/AccessibilityProvider';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AccessibilityProvider>
          <NavigationProvider>
            <AppRoutes />
          </NavigationProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
```

### 2. Use the AppLayout component

```jsx
import AppLayout from './components/layout/AppLayout';

function ProtectedPage() {
  return (
    <AppLayout>
      <YourPageContent />
    </AppLayout>
  );
}
```

### 3. Access navigation state

```jsx
import { useNavigation } from './contexts/NavigationContext';

function MyComponent() {
  const { 
    navigation, 
    activeMenu, 
    toggleSidebar, 
    searchNavigation 
  } = useNavigation();
  
  // Your component logic
}
```

## API Reference

### NavigationContext

#### State
- `navigation`: Array of navigation items for current user role
- `quickActions`: Role-based quick action buttons
- `isCollapsed`: Sidebar collapsed state
- `activeMenu`: Currently active menu item ID
- `expandedMenus`: Array of expanded menu IDs
- `favoriteMenus`: Array of favorite menu IDs
- `breadcrumbs`: Current page breadcrumb trail
- `searchResults`: Search results array
- `user`: Current user object

#### Actions
- `toggleSidebar()`: Toggle sidebar collapsed state
- `setActiveMenu(menuId)`: Set active menu item
- `toggleMenu(menuId)`: Toggle menu expansion
- `addFavorite(menuId)`: Add menu to favorites
- `removeFavorite(menuId)`: Remove menu from favorites
- `searchNavigation(query)`: Search menu items
- `trackAnalytics(event, data)`: Track user interactions

### ThemeContext

#### State
- `theme`: Current theme ('light', 'dark', 'auto')
- `accentColor`: Accent color name
- `sidebarWidth`: Sidebar width in pixels
- `compactMode`: Compact mode enabled
- `highContrast`: High contrast mode enabled

#### Actions
- `setTheme(theme)`: Change theme
- `setAccentColor(color)`: Change accent color
- `toggleCompactMode()`: Toggle compact mode
- `toggleHighContrast()`: Toggle high contrast

## Keyboard Shortcuts

- `Ctrl/Cmd + K`: Open search
- `Ctrl/Cmd + B`: Toggle sidebar
- `Escape`: Close search/modals
- `Alt + 1-9`: Quick navigate to menu items
- `Arrow Keys`: Navigate menu items when sidebar focused
- `Tab`: Navigate through interactive elements
- `Enter`: Activate focused item

## Customization

### Adding New Menu Items

Update the navigation configuration in `src/config/navigationConfig.js`:

```javascript
const navigationStructure = {
  admin: [
    {
      id: 'new_feature',
      label: 'New Feature',
      icon: 'Star',
      path: '/new-feature',
      order: 10,
      permissions: ['read'],
      children: [
        {
          id: 'sub_feature',
          label: 'Sub Feature',
          path: '/new-feature/sub',
          permissions: ['read']
        }
      ]
    }
  ]
};
```

### Custom Themes

Create custom theme configurations:

```javascript
const customTheme = {
  theme: 'dark',
  accentColor: 'purple',
  customColors: {
    primary: '#8b5cf6',
    background: '#1a1a1a'
  }
};
```

### Permission Gates

Protect components with role/permission requirements:

```jsx
import PermissionGate from './components/auth/PermissionGate';

<PermissionGate permission={['write']} role="admin">
  <AdminOnlyComponent />
</PermissionGate>
```

## Mobile Optimization

The navigation system automatically adapts for mobile devices:

- Sidebar becomes an overlay drawer
- Bottom navigation shows primary actions
- Touch-friendly menu items (44px minimum height)
- Swipe gestures for drawer control

## Analytics

Track user navigation patterns:

```javascript
// Automatic tracking
trackAnalytics('menu_click', { menuId: 'dashboard', path: '/dashboard' });

// Custom events
trackAnalytics('feature_used', { feature: 'search', query: 'projects' });
```

## Accessibility Features

- ARIA labels and roles
- Keyboard navigation
- Screen reader announcements
- High contrast mode
- Focus management
- Semantic HTML structure

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lazy loading of menu items
- Virtual scrolling for large menus
- Efficient re-rendering with React.memo
- Menu data caching
- Optimized animations

## Troubleshooting

### Common Issues

1. **Navigation not loading**: Check authentication token and API endpoints
2. **Styles not applied**: Ensure CSS imports are included
3. **Search not working**: Verify search API endpoint configuration
4. **Mobile drawer issues**: Check responsive breakpoints and z-index values

### Debug Mode

Enable debug logging:

```javascript
localStorage.setItem('biztreck_debug', 'true');
```

## Contributing

1. Follow the existing code structure
2. Add proper TypeScript types
3. Include accessibility attributes
4. Test on mobile devices
5. Update documentation

## License

MIT License - see LICENSE file for details.
