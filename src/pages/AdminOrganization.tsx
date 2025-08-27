import React, { useState, useEffect } from 'react';
import { Building2, Settings, Users, Shield, Globe, Mail, Phone } from 'lucide-react';
import AdminNavigation from '@/components/layout/AdminNavigation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { cn } from '@/utils/cn';

interface OrganizationSettings {
  name: string;
  description: string;
  website: string;
  contactInfo: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      zipCode: string;
    };
  };
  settings: {
    allowSelfRegistration: boolean;
    maxUsers: number;
    maxProjects: number;
    customDomain: string;
  };
  branding: {
    primaryColor: string;
    logoUrl: string;
  };
}

const AdminOrganization: React.FC = () => {
  const [settings, setSettings] = useState<OrganizationSettings>({
    name: 'BizTreck Solutions',
    description: 'Leading software development company specializing in modern web applications',
    website: 'https://biztreck.com',
    contactInfo: {
      email: 'contact@biztreck.com',
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Business Street',
        city: 'Tech City',
        state: 'CA',
        country: 'United States',
        zipCode: '90210'
      }
    },
    settings: {
      allowSelfRegistration: true,
      maxUsers: 500,
      maxProjects: 100,
      customDomain: 'app.biztreck.com'
    },
    branding: {
      primaryColor: '#4F46E5',
      logoUrl: '/logo.png'
    }
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call to save organization settings
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Building2 className="h-8 w-8 mr-3 text-orange-600" />
                Organization Settings
              </h1>
              <p className="mt-1 text-gray-600">
                Manage your organization's profile, settings, and branding
              </p>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="btn-outline btn-md"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary btn-md"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary btn-md"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Settings
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-gray-600" />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    value={settings.name}
                    onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    className="input w-full"
                    value={settings.website}
                    onChange={(e) => setSettings(prev => ({ ...prev, website: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="input w-full"
                    value={settings.description}
                    onChange={(e) => setSettings(prev => ({ ...prev, description: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-600" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input w-full"
                    value={settings.contactInfo.email}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      contactInfo: { ...prev.contactInfo, email: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="input w-full"
                    value={settings.contactInfo.phone}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      contactInfo: { ...prev.contactInfo, phone: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    value={settings.contactInfo.address.street}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      contactInfo: { 
                        ...prev.contactInfo, 
                        address: { ...prev.contactInfo.address, street: e.target.value }
                      }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    value={settings.contactInfo.address.city}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      contactInfo: { 
                        ...prev.contactInfo, 
                        address: { ...prev.contactInfo.address, city: e.target.value }
                      }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    value={settings.contactInfo.address.state}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      contactInfo: { 
                        ...prev.contactInfo, 
                        address: { ...prev.contactInfo.address, state: e.target.value }
                      }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    value={settings.contactInfo.address.country}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      contactInfo: { 
                        ...prev.contactInfo, 
                        address: { ...prev.contactInfo.address, country: e.target.value }
                      }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    value={settings.contactInfo.address.zipCode}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      contactInfo: { 
                        ...prev.contactInfo, 
                        address: { ...prev.contactInfo.address, zipCode: e.target.value }
                      }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* System Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-600" />
                System Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Users
                  </label>
                  <input
                    type="number"
                    className="input w-full"
                    value={settings.settings.maxUsers}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      settings: { ...prev.settings, maxUsers: parseInt(e.target.value) || 0 }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Projects
                  </label>
                  <input
                    type="number"
                    className="input w-full"
                    value={settings.settings.maxProjects}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      settings: { ...prev.settings, maxProjects: parseInt(e.target.value) || 0 }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Custom Domain
                  </label>
                  <input
                    type="text"
                    className="input w-full"
                    value={settings.settings.customDomain}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      settings: { ...prev.settings, customDomain: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="selfRegistration"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={settings.settings.allowSelfRegistration}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      settings: { ...prev.settings, allowSelfRegistration: e.target.checked }
                    }))}
                    disabled={!isEditing}
                  />
                  <label htmlFor="selfRegistration" className="ml-2 block text-sm text-gray-900">
                    Allow Self Registration
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organization Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-gray-600" />
                Organization Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Users</span>
                  <span className="text-sm font-medium text-gray-900">156 / 500</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Projects</span>
                  <span className="text-sm font-medium text-gray-900">23 / 100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <span className="text-sm font-medium text-gray-900">45%</span>
                </div>
              </div>
            </div>

            {/* Branding */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-gray-600" />
                Branding
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      className="h-10 w-16 rounded border border-gray-300"
                      value={settings.branding.primaryColor}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        branding: { ...prev.branding, primaryColor: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      className="input flex-1"
                      value={settings.branding.primaryColor}
                      onChange={(e) => setSettings(prev => ({ 
                        ...prev, 
                        branding: { ...prev.branding, primaryColor: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    className="input w-full"
                    value={settings.branding.logoUrl}
                    onChange={(e) => setSettings(prev => ({ 
                      ...prev, 
                      branding: { ...prev.branding, logoUrl: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrganization;
