import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import ReduxExample from '../../components/common/ReduxExample';

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">BizTreck</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Interactive Demo</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience BizTreck's powerful features with this interactive demo. 
            Try the authentication system and project management features below.
          </p>
        </div>

        {/* Redux Example Component */}
        <div className="max-w-4xl mx-auto">
          <ReduxExample />
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Ready to start using these features for your business?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="primary" size="large">
                Create Free Account
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="large">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
