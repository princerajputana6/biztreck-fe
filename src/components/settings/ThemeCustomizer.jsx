import React, { useState } from 'react';
import { 
  Palette, 
  Monitor, 
  Sun, 
  Moon, 
  Settings, 
  Eye, 
  EyeOff,
  RotateCcw,
  Check
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { cn } from '../../utils/cn';

const ThemeCustomizer = ({ isOpen, onClose }) => {
  const {
    theme,
    sidebarTheme,
    accentColor,
    sidebarWidth,
    compactMode,
    showIcons,
    showLabels,
    animationsEnabled,
    highContrast,
    customColors,
    setTheme,
    setSidebarTheme,
    setAccentColor,
    setSidebarWidth,
    toggleCompactMode,
    toggleIcons,
    toggleLabels,
    toggleAnimations,
    toggleHighContrast,
    setCustomColors,
    resetTheme
  } = useTheme();

  const [activeTab, setActiveTab] = useState('appearance');

  if (!isOpen) return null;

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'Auto', icon: Monitor }
  ];

  const accentColors = [
    { value: 'blue', color: '#3b82f6', name: 'Blue' },
    { value: 'green', color: '#10b981', name: 'Green' },
    { value: 'purple', color: '#8b5cf6', name: 'Purple' },
    { value: 'pink', color: '#ec4899', name: 'Pink' },
    { value: 'orange', color: '#f97316', name: 'Orange' },
    { value: 'red', color: '#ef4444', name: 'Red' },
    { value: 'indigo', color: '#6366f1', name: 'Indigo' },
    { value: 'teal', color: '#14b8a6', name: 'Teal' }
  ];

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'sidebar', label: 'Sidebar', icon: Settings },
    { id: 'accessibility', label: 'Accessibility', icon: Eye }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[80vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Theme Customizer
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors duration-200',
                  {
                    'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400': activeTab === tab.id,
                    'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300': activeTab !== tab.id
                  }
                )}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              
              {/* Theme Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Theme
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {themeOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={cn(
                          'flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200',
                          {
                            'border-blue-500 bg-blue-50 dark:bg-blue-900/20': theme === option.value,
                            'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600': theme !== option.value
                          }
                        )}
                      >
                        <IconComponent className="w-6 h-6 mb-2" />
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Accent Color
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setAccentColor(color.value)}
                      className={cn(
                        'flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200',
                        {
                          'border-gray-400 dark:border-gray-500': accentColor === color.value,
                          'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600': accentColor !== color.value
                        }
                      )}
                    >
                      <div 
                        className="w-8 h-8 rounded-full mb-2 relative"
                        style={{ backgroundColor: color.color }}
                      >
                        {accentColor === color.value && (
                          <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                        )}
                      </div>
                      <span className="text-xs font-medium">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Tab */}
          {activeTab === 'sidebar' && (
            <div className="space-y-6">
              
              {/* Sidebar Width */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Sidebar Width
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="240"
                    max="400"
                    step="20"
                    value={sidebarWidth}
                    onChange={(e) => setSidebarWidth(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Narrow (240px)</span>
                    <span>Current: {sidebarWidth}px</span>
                    <span>Wide (400px)</span>
                  </div>
                </div>
              </div>

              {/* Sidebar Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Sidebar Options
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Compact Mode
                    </span>
                    <button
                      onClick={toggleCompactMode}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                        {
                          'bg-blue-600': compactMode,
                          'bg-gray-200 dark:bg-gray-700': !compactMode
                        }
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                          {
                            'translate-x-6': compactMode,
                            'translate-x-1': !compactMode
                          }
                        )}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show Icons
                    </span>
                    <button
                      onClick={toggleIcons}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                        {
                          'bg-blue-600': showIcons,
                          'bg-gray-200 dark:bg-gray-700': !showIcons
                        }
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                          {
                            'translate-x-6': showIcons,
                            'translate-x-1': !showIcons
                          }
                        )}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show Labels
                    </span>
                    <button
                      onClick={toggleLabels}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                        {
                          'bg-blue-600': showLabels,
                          'bg-gray-200 dark:bg-gray-700': !showLabels
                        }
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                          {
                            'translate-x-6': showLabels,
                            'translate-x-1': !showLabels
                          }
                        )}
                      />
                    </button>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Accessibility Tab */}
          {activeTab === 'accessibility' && (
            <div className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Accessibility Options
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        High Contrast
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <button
                      onClick={toggleHighContrast}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                        {
                          'bg-blue-600': highContrast,
                          'bg-gray-200 dark:bg-gray-700': !highContrast
                        }
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                          {
                            'translate-x-6': highContrast,
                            'translate-x-1': !highContrast
                          }
                        )}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Animations
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Enable smooth transitions and animations
                      </p>
                    </div>
                    <button
                      onClick={toggleAnimations}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
                        {
                          'bg-blue-600': animationsEnabled,
                          'bg-gray-200 dark:bg-gray-700': !animationsEnabled
                        }
                      )}
                    >
                      <span
                        className={cn(
                          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
                          {
                            'translate-x-6': animationsEnabled,
                            'translate-x-1': !animationsEnabled
                          }
                        )}
                      />
                    </button>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={resetTheme}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Default</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
