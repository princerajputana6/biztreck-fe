import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../contexts/NavigationContext';
import { cn } from '../../utils/cn';

const MenuSearch = ({ onClose }) => {
  const navigate = useNavigate();
  const { 
    searchNavigation, 
    searchResults, 
    isSearching, 
    clearSearch,
    trackAnalytics,
    setActiveMenu 
  } = useNavigation();
  
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('biztreck_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load recent searches:', error);
      }
    }
  }, []);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle search
  useEffect(() => {
    if (query.trim()) {
      const debounceTimer = setTimeout(() => {
        searchNavigation(query);
      }, 300);
      
      return () => clearTimeout(debounceTimer);
    } else {
      clearSearch();
    }
  }, [query, searchNavigation, clearSearch]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!searchResults.length) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : searchResults.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            handleResultClick(searchResults[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchResults, selectedIndex, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && searchResults.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex, searchResults]);

  const saveRecentSearch = (searchTerm) => {
    const updated = [
      searchTerm,
      ...recentSearches.filter(term => term !== searchTerm)
    ].slice(0, 5); // Keep only 5 recent searches
    
    setRecentSearches(updated);
    localStorage.setItem('biztreck_recent_searches', JSON.stringify(updated));
  };

  const handleResultClick = (result) => {
    saveRecentSearch(query);
    setActiveMenu(result.id);
    navigate(result.path);
    trackAnalytics('search_navigate', { 
      query, 
      resultId: result.id, 
      resultPath: result.path 
    });
    onClose();
  };

  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm);
    searchNavigation(searchTerm);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('biztreck_recent_searches');
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 rounded px-1">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-96 flex flex-col">
        
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search menu items..."
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          {isSearching && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {query && searchResults.length > 0 && (
            <div ref={resultsRef} className="py-2">
              {searchResults.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={cn(
                    'w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200',
                    {
                      'bg-blue-50 dark:bg-blue-900/20': index === selectedIndex
                    }
                  )}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-sm">
                      {result.icon || '📄'}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {highlightMatch(result.label, query)}
                    </div>
                    {result.parentLabel && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {result.fullLabel}
                      </div>
                    )}
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}

          {query && !isSearching && searchResults.length === 0 && (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
            </div>
          )}

          {!query && (
            <div className="py-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="px-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Recent Searches
                    </h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((searchTerm, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearchClick(searchTerm)}
                        className="w-full flex items-center px-2 py-2 text-left text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-200"
                      >
                        <Clock className="w-4 h-4 mr-2 opacity-50" />
                        {searchTerm}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Tips */}
              <div className="px-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Quick Tips
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs mr-2">↑↓</kbd>
                    Navigate results
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs mr-2">Enter</kbd>
                    Open selected item
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs mr-2">Esc</kbd>
                    Close search
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuSearch;
