import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Edit,
  Trash2,
  Building2,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  UserPlus,
  Eye,
  EyeOff
} from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { cn } from '@/utils/cn';
import toast from 'react-hot-toast';
import { adminService, User } from '@/services/adminService';
import AdminNavigation from '@/components/layout/AdminNavigation';
import ComprehensiveUserForm from '@/components/forms/ComprehensiveUserForm';


const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'manager' | 'developer' | 'client'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers({
        page: currentPage,
        limit: 10,
        search: search || undefined,
        role: roleFilter === 'all' ? undefined : roleFilter,
        isActive: statusFilter === 'all' ? undefined : statusFilter === 'active',
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });
      
      setUsers(response.data.docs || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error(error.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, search, roleFilter, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCreateUser = async (userData: any) => {
    try {
      await adminService.createUser(userData);

      toast.success('User created successfully');
      setShowCreateModal(false);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create user');
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await adminService.deleteUser(selectedUser._id);

      toast.success('User deleted successfully');
      setShowDeleteModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete user');
    }
  };

  const handleToggleStatus = async (user: User) => {
    try {
      await adminService.updateUser(user._id, {
        isActive: !user.isActive
      });

      toast.success(`User ${user.isActive ? 'deactivated' : 'activated'} successfully`);
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update user status');
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'developer':
        return 'bg-green-100 text-green-800';
      case 'client':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };



  if (loading) {
    return <LoadingSpinner className="h-screen" />;
  }

  return (
    <div className="h-screen bg-gray-50">
      <AdminNavigation />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="h-8 w-8 mr-3 text-indigo-600" />
                User Management
              </h1>
              <p className="mt-1 text-gray-600">
                Manage users, roles, and permissions across your organization
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary btn-md"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create User
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="input pl-10"
                  placeholder="Search users by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
            
            <select
              className="input w-auto"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
            >
              <option value="all">All Roles</option>
              <option value="manager">Managers</option>
              <option value="developer">Developers</option>
              <option value="client">Clients</option>
            </select>

            <select
              className="input w-auto"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Users List */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Users ({users ? users.length : 0})
            </h3>
          </div>
          
          {(!users || users.length === 0) && !loading && (
            <div className="px-6 py-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500 mb-4">
                {search ? `No users match "${search}"` : 'No users have been created yet.'}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary btn-md"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create First User
              </button>
            </div>
          )}
          
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <LoadingSpinner />
              <p className="text-gray-600 mt-4">Loading users...</p>
            </div>
          )}
          
          {!loading && users && users.length > 0 && (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users && users.length > 0 ? users.map((user) => (
                    <tr key={user._id || `user-${Math.random()}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-700 font-medium text-sm">
                              {user.profile?.firstName?.[0] || 'U'}{user.profile?.lastName?.[0] || 'S'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.profile?.fullName || `${user.profile?.firstName || 'Unknown'} ${user.profile?.lastName || 'User'}`}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {user.email || 'No email'}
                            </div>
                            {user.profile?.phone && (
                              <div className="text-sm text-gray-500 flex items-center">
                                <Phone className="h-4 w-4 mr-1" />
                                {user.profile?.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getRoleColor(user.role)
                        )}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.organization ? (
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.organization?.name || 'Unknown Organization'}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">No organization</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          user.isActive === true
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        )}>
                          {user.isActive === true ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Inactive
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastLogin ? (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </div>
                        ) : (
                          'Never'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/admin/users/${user._id || 'unknown'}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit User"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => user._id && handleToggleStatus(user)}
                            className={cn(
                              'hover:opacity-80',
                              user.isActive === true ? 'text-red-600' : 'text-green-600'
                            )}
                            title={user.isActive === true ? 'Deactivate' : 'Activate'}
                            disabled={!user._id}
                          >
                            {user.isActive === true ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => {
                              if (user._id) {
                                setSelectedUser(user);
                                setShowDeleteModal(true);
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Delete User"
                            disabled={!user._id}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : null}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages && totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Page {currentPage || 1} of {totalPages || 1}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, (prev || 1) - 1))}
                    disabled={(currentPage || 1) === 1}
                    className="btn-outline btn-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages || 1, (prev || 1) + 1))}
                    disabled={(currentPage || 1) === (totalPages || 1)}
                    className="btn-outline btn-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <ComprehensiveUserForm
          onSubmit={handleCreateUser}
          onCancel={() => setShowCreateModal(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete User</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <strong>{selectedUser.profile?.fullName || `${selectedUser.profile?.firstName || 'Unknown'} ${selectedUser.profile?.lastName || 'User'}`}</strong>? 
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center px-4 py-3 space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                  className="btn-outline w-full btn-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="btn-destructive w-full btn-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
