import React from 'react';

const UnauthorizedPage = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Unauthorized</h1>
        <p className="text-gray-600 mt-1">You do not have permission to access this page</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">Unauthorized coming soon...</p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
