import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import superAdminService from '../../services/api/superAdminService';
import { 
  ArrowLeft, 
  Shield, 
  Eye, 
  EyeOff, 
  UserPlus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const CreateAdminPage = () => {
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    role: 'admin'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('');

  React.useEffect(() => {
    // Get current user role from token
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserRole(decoded.role || '');
        
        // Only superadmin can access this page
        if (decoded.role !== 'superadmin') {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        navigate('/login');
      }
    } else {
      // No token, redirect to login
      navigate('/login');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.username) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      console.log('Creating admin with data:', formData);
      console.log('Using token:', token ? 'Present' : 'Missing');
      
      const response = await superAdminService.createAdmin(formData);
      console.log('Admin creation response:', response);
      
      if (response.success) {
        setSuccess(`${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} user created successfully!`);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          role: 'admin'
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/admin/users');
        }, 2000);
      } else {
        setError(response.message || 'Admin creation failed');
      }
    } catch (error) {
      console.error('Admin creation error:', error);
      
      // Show more detailed error information
      if (error.message.includes('401')) {
        setError('Authentication failed. Please login again.');
      } else if (error.message.includes('403')) {
        setError('Access denied. You need superadmin privileges.');
      } else if (error.message.includes('500')) {
        setError('Server error. Please check the backend logs.');
      } else {
        setError(error.message || 'Failed to create admin user');
      }
    } finally {
      setLoading(false);
    }
  };

  // If the user role has been checked and is not superadmin, show an unauthorized message.
  if (currentUserRole && currentUserRole !== 'superadmin') {
    return (
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Unauthorized Access</h1>
        <p className="text-gray-600">You do not have the necessary permissions to view this page.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-4 rounded-lg font-medium"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // While the token is being verified and role checked, show a loader.
  if (!token || !currentUserRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/admin/users')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Admin User</h1>
          <p className="text-gray-600 mt-1">Create a new admin or super admin user</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-full">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>

          {/* Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Admin User Creation</p>
                <p>Admin users will have elevated privileges to manage other users and system settings.</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <p className="text-sm text-green-800">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Super Admin has full system access, Admin has user management access
              </p>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin/users')}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminPage;
