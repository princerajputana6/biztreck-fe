import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Project Details</h1>
        <p className="text-gray-600 mt-1">Project ID: {id}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">Project details view coming soon...</p>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
