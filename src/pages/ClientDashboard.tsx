import React from 'react';
import { FolderOpen, Mail, CreditCard, Phone } from 'lucide-react';

const ClientDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FolderOpen className="h-8 w-8 mr-3 text-indigo-600" />
            Client Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Monitor your projects and communicate with your team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Invoices</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <Phone className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Support</p>
                <p className="text-2xl font-bold text-gray-900">Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <FolderOpen className="h-6 w-6 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900">View Projects</h3>
              <p className="text-sm text-gray-600">Check project progress</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <Mail className="h-6 w-6 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900">Messages</h3>
              <p className="text-sm text-gray-600">Communicate with team</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
              <CreditCard className="h-6 w-6 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900">Billing</h3>
              <p className="text-sm text-gray-600">View invoices and payments</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
