import React from 'react';
import { Link } from 'react-router-dom';
import { FileX, Home, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center">
            <FileX className="h-8 w-8 text-gray-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or the URL may be incorrect.
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
          
          <button
            onClick={() => window.history.back()}
            className="btn-outline w-full btn-md"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
