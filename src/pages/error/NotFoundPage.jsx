import React from 'react';

const PageNotFoundPage = () => {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
        <p className="text-gray-600 mt-1">The page you are looking for does not exist</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">Page Not Found coming soon...</p>
      </div>
    </div>
  );
};

export default PageNotFoundPage;
