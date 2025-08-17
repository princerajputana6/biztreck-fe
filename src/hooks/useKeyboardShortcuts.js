import { useEffect } from 'react';
import { useNavigation } from '../contexts/NavigationContext';

const useKeyboardShortcuts = () => {
  const { toggleSidebar, searchNavigation, clearSearch } = useNavigation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ctrl/Cmd + K - Open search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        const searchButton = document.querySelector('[data-search-trigger]');
        if (searchButton) {
          searchButton.click();
        }
      }

      // Ctrl/Cmd + B - Toggle sidebar
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
      }

      // Escape - Close search or modals
      if (event.key === 'Escape') {
        clearSearch();
        // Close any open modals
        const modals = document.querySelectorAll('[data-modal]');
        modals.forEach(modal => {
          const closeButton = modal.querySelector('[data-modal-close]');
          if (closeButton) closeButton.click();
        });
      }

      // Alt + 1-9 - Quick navigation to menu items
      if (event.altKey && event.key >= '1' && event.key <= '9') {
        event.preventDefault();
        const index = parseInt(event.key) - 1;
        const menuItems = document.querySelectorAll('[data-menu-item]');
        if (menuItems[index]) {
          menuItems[index].click();
        }
      }

      // Arrow keys for menu navigation when sidebar is focused
      if (document.activeElement?.closest('[data-sidebar]')) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          const menuItems = Array.from(document.querySelectorAll('[data-menu-item]'));
          const currentIndex = menuItems.findIndex(item => item === document.activeElement);
          
          let nextIndex;
          if (event.key === 'ArrowDown') {
            nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
          } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
          }
          
          if (menuItems[nextIndex]) {
            menuItems[nextIndex].focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar, searchNavigation, clearSearch]);
};

export default useKeyboardShortcuts;
