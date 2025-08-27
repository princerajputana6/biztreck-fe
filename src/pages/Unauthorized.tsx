import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, ArrowLeft, Home } from 'lucide-react';

const Unauthorized: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-16 w-16 bg-error-100 rounded-full flex items-center justify-center">
            <ShieldX className="h-8 w-8 text-error-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="btn-primary w-full btn-md"
          >
            <Home className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Link>
          
          <Link
            to="/"
            className="btn-outline w-full btn-md"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
