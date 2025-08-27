import React from 'react';
import { Settings as SettingsIcon, Shield, Bell, Database, Globe } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="h-8 w-8 mr-3 text-primary-600" />
            Settings
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your application settings and preferences.
          </p>
        </div>

        <div className="space-y-6">
          {/* Security Settings */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">Security</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <button className="btn-primary btn-sm">Enable</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Login notifications</p>
                  <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-primary-600 rounded" />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-6 w-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email notifications</p>
                  <p className="text-sm text-gray-500">Receive important updates via email</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-primary-600 rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Push notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-primary-600 rounded" />
              </div>
            </div>
          </div>

          {/* Data Settings */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Database className="h-6 w-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">Data & Privacy</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Data export</p>
                  <p className="text-sm text-gray-500">Download a copy of your data</p>
                </div>
                <button className="btn-outline btn-sm">Export</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Delete account</p>
                  <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                </div>
                <button className="btn-destructive btn-sm">Delete</button>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="card p-6">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-primary-600 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">System</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Language</p>
                  <p className="text-sm text-gray-500">Choose your preferred language</p>
                </div>
                <select className="input w-32">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Time zone</p>
                  <p className="text-sm text-gray-500">Set your local time zone</p>
                </div>
                <select className="input w-40">
                  <option>UTC</option>
                  <option>EST</option>
                  <option>PST</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
