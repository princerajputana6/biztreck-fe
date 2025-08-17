import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import authService from '../../services/api/authService';
import { 
  ArrowLeft, 
  Edit3, 
  Save, 
  X, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Calendar,
  Shield,
  UserCheck,
  UserX,
  AlertCircle
} from 'lucide-react';

const UserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [currentUserRole, setCurrentUserRole] = useState('');
  
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    company: '',
    phone: '',
    isActive: true
  });

  useEffect(() => {
    // Get current user role from token
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserRole(decoded.role || '');
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    fetchUser();
  }, [userId, token]);

  const fetchUser = async () => {
    try {
      const response = await authService.getUsers();
      const foundUser = response.users.find(u => u._id === userId);
      
      if (foundUser) {
        setUser(foundUser);
        setEditForm({
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          role: foundUser.role,
          company: foundUser.company || '',
          phone: foundUser.phone || '',
          isActive: foundUser.isActive
        });
      } else {
        setError('User not found');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      // Update role if changed
      if (editForm.role !== user.role) {
        const roleResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/update-role/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ role: editForm.role })
        });

        if (!roleResponse.ok) {
          const errorData = await roleResponse.json();
          throw new Error(errorData.error || 'Failed to update role');
        }
      }

      // Update status if changed
      if (editForm.isActive !== user.isActive) {
        const statusResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${userId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ isActive: editForm.isActive })
        });

        if (!statusResponse.ok) {
          const errorData = await statusResponse.json();
          throw new Error(errorData.error || 'Failed to update status');
        }
      }

      // Refresh user data
      await fetchUser();
      setEditing(false);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const canManageUser = () => {
    if (!user) return false;
    if (currentUserRole === 'superadmin') return true;
    if (currentUserRole === 'admin' && !['superadmin', 'admin'].includes(user.role)) return true;
    return false;
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'superadmin': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'manager': return 'bg-green-100 text-green-800';
      case 'developer': return 'bg-yellow-100 text-yellow-800';
      case 'client': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailableRoles = () => {
    if (currentUserRole === 'superadmin') {
      return ['superadmin', 'admin', 'manager', 'developer', 'client'];
    } else if (currentUserRole === 'admin') {
      return ['manager', 'developer', 'client'];
    }
    return [];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-gray-500">{error || 'User not found'}</p>
        <button
          onClick={() => navigate('/admin/users')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/users')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
            <p className="text-gray-600 mt-1">View and manage user information</p>
          </div>
        </div>
        
        {canManageUser() && (
          <div className="flex space-x-3">
            {editing ? (
              <>
                <button
                  onClick={() => setEditing(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit User
              </button>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* User Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-8 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="flex items-center">
            <div className="h-20 w-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-6">
              <span className="text-white text-2xl font-bold">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">
                {editing ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleInputChange}
                      className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-3 py-1 text-white placeholder-white placeholder-opacity-70"
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleInputChange}
                      className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded px-3 py-1 text-white placeholder-white placeholder-opacity-70"
                      placeholder="Last Name"
                    />
                  </div>
                ) : (
                  `${user.firstName} ${user.lastName}`
                )}
              </h2>
              <p className="text-blue-100 mt-1">{user.email}</p>
              <div className="flex items-center mt-2 space-x-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  editing ? 'bg-white bg-opacity-20' : 'bg-white bg-opacity-20'
                }`}>
                  {user.role === 'superadmin' && <Shield className="h-4 w-4 mr-1" />}
                  {editing ? (
                    <select
                      name="role"
                      value={editForm.role}
                      onChange={handleInputChange}
                      className="bg-transparent border-none text-white focus:outline-none"
                    >
                      {getAvailableRoles().map(role => (
                        <option key={role} value={role} className="text-gray-900">
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.role
                  )}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.isActive ? 'bg-green-500 bg-opacity-20' : 'bg-red-500 bg-opacity-20'
                }`}>
                  {editing ? (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={editForm.isActive}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Active
                    </label>
                  ) : (
                    <>
                      {user.isActive ? (
                        <>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <UserX className="h-4 w-4 mr-1" />
                          Inactive
                        </>
                      )}
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {editing ? (
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900">{user.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {editing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Phone number"
                      />
                    ) : (
                      <p className="text-gray-900">{user.phone || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    {editing ? (
                      <input
                        type="text"
                        name="company"
                        value={editForm.company}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Company name"
                      />
                    ) : (
                      <p className="text-gray-900">{user.company || 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                    <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                    <p className="text-gray-900 font-mono text-sm">{user._id}</p>
                  </div>
                </div>

                {user.lastLogin && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                      <p className="text-gray-900">{new Date(user.lastLogin).toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
