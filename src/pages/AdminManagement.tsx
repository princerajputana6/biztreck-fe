import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Shield,
  Building2,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Key
} from 'lucide-react';
import { superAdminService, Admin } from '@/services/superAdminService';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { cn } from '@/utils/cn';
import toast from 'react-hot-toast';

const AdminManagement: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      console.log('Fetching admins with params:', {
        page: currentPage,
        limit: 10,
        search: search || undefined,
        isActive: statusFilter === 'all' ? undefined : statusFilter === 'active',
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });
      
      const response = await superAdminService.getAdmins({
        page: currentPage,
        limit: 10,
        search: search || undefined,
        isActive: statusFilter === 'all' ? undefined : statusFilter === 'active',
        sortBy: 'createdAt',
        sortOrder: 'desc'
      });
      
      console.log('Admins response:', response);
      setAdmins(response.data.docs);
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      console.error('Error fetching admins:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [currentPage, search, statusFilter]);

  // Add a separate useEffect for initial load
  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    // Remove the fetchAdmins call here since useEffect will handle it
  };

  const handleDeleteAdmin = async () => {
    if (!selectedAdmin) return;

    try {
      await superAdminService.deleteAdmin(selectedAdmin._id);
      toast.success('Admin deleted successfully');
      setShowDeleteModal(false);
      setSelectedAdmin(null);
      fetchAdmins();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete admin');
    }
  };

  const handleResetPassword = async (admin: Admin) => {
    try {
      const response = await superAdminService.resetAdminPassword(admin._id);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    }
  };

  const handleToggleStatus = async (admin: Admin) => {
    try {
             await superAdminService.updateAdmin(admin._id, {
         isActive: !(admin.isActive === true)
       });
             toast.success(`Admin ${admin.isActive === true ? 'deactivated' : 'activated'} successfully`);
      fetchAdmins();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update admin status');
    }
  };

  if (loading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="h-8 w-8 mr-3 text-indigo-600" />
                Admin Management
              </h1>
              <p className="mt-1 text-gray-600">
                Manage administrator accounts and permissions
              </p>
            </div>
            <Link
              to="/super-admin/admins/create"
              className="btn-primary btn-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Admin
            </Link>
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
                  placeholder="Search admins by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </form>
            
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

        {/* Admins List */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
                         <h3 className="text-lg font-medium text-gray-900">
               Administrators ({admins ? admins.length : 0})
             </h3>
          </div>
          
                     {(!admins || admins.length === 0) && !loading && (
            <div className="px-6 py-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No admins found</h3>
              <p className="text-gray-500 mb-4">
                {search ? `No admins match "${search}"` : 'No administrators have been created yet.'}
              </p>
              <Link
                to="/super-admin/admins/create"
                className="btn-primary btn-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Admin
              </Link>
            </div>
          )}
          
                     {/* Loading State */}
           {loading && (
             <div className="text-center py-12">
               <LoadingSpinner />
               <p className="text-gray-600 mt-4">Loading admins...</p>
             </div>
           )}
           
           {!loading && admins && admins.length > 0 && (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Admin
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
                                      {admins && admins.length > 0 ? admins.map((admin) => (
                     <tr key={admin._id || `admin-${Math.random()}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                                                     <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                             <span className="text-indigo-700 font-medium text-sm">
                               {admin.profile?.firstName?.[0] || 'A'}{admin.profile?.lastName?.[0] || 'D'}
                             </span>
                           </div>
                           <div className="ml-4">
                             <div className="text-sm font-medium text-gray-900">
                               {admin.profile?.fullName || `${admin.profile?.firstName || 'Unknown'} ${admin.profile?.lastName || 'Admin'}`}
                             </div>
                                                         <div className="text-sm text-gray-500 flex items-center">
                               <Mail className="h-4 w-4 mr-1" />
                               {admin.email || 'No email'}
                             </div>
                                                         {admin.profile?.phone && (
                               <div className="text-sm text-gray-500 flex items-center">
                                 <Phone className="h-4 w-4 mr-1" />
                                 {admin.profile?.phone}
                               </div>
                             )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {admin.organization ? (
                          <div className="flex items-center">
                            <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                            <div>
                                                             <div className="text-sm font-medium text-gray-900">
                                 {admin.organization?.name || 'Unknown Organization'}
                               </div>
                               <div className="text-sm text-gray-500">
                                 {admin.organization?.subscription?.plan || 'No plan'}
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
                           admin.isActive === true
                             ? 'bg-green-100 text-green-800'
                             : 'bg-red-100 text-red-800'
                         )}>
                           {admin.isActive === true ? (
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
                        {admin.lastLogin ? (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(admin.lastLogin).toLocaleDateString()}
                          </div>
                        ) : (
                          'Never'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                 <div className="flex items-center">
                           <Calendar className="h-4 w-4 mr-1" />
                           {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'Unknown'}
                         </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                                                     <button
                             onClick={() => admin._id && handleResetPassword(admin)}
                             className="text-indigo-600 hover:text-indigo-900"
                             title="Reset Password"
                             disabled={!admin._id}
                           >
                            <Key className="h-4 w-4" />
                          </button>
                                                     <Link
                             to={`/super-admin/admins/${admin._id || 'unknown'}/edit`}
                             className="text-indigo-600 hover:text-indigo-900"
                             title="Edit Admin"
                           >
                            <Edit className="h-4 w-4" />
                          </Link>
                                                     <button
                             onClick={() => admin._id && handleToggleStatus(admin)}
                             className={cn(
                               'hover:opacity-80',
                               admin.isActive === true ? 'text-red-600' : 'text-green-600'
                             )}
                             title={admin.isActive === true ? 'Deactivate' : 'Activate'}
                             disabled={!admin._id}
                           >
                             {admin.isActive === true ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                          </button>
                                                     <button
                             onClick={() => {
                               if (admin._id) {
                                 setSelectedAdmin(admin);
                                 setShowDeleteModal(true);
                               }
                             }}
                             className="text-red-600 hover:text-red-900"
                             title="Delete Admin"
                             disabled={!admin._id}
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

        {/* Empty State */}
        {(!admins || admins.length === 0) && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No admins found</h3>
            <p className="text-gray-600 mb-6">
              {search ? 'Try adjusting your search criteria' : 'Create your first admin account to get started'}
            </p>
            <Link to="/super-admin/admins/create" className="btn-primary btn-md">
              <Plus className="h-4 w-4 mr-2" />
              Create Admin
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAdmin && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Admin</h3>
              <div className="mt-2 px-7 py-3">
                                 <p className="text-sm text-gray-500">
                   Are you sure you want to delete <strong>{selectedAdmin.profile?.fullName || `${selectedAdmin.profile?.firstName || 'Unknown'} ${selectedAdmin.profile?.lastName || 'Admin'}`}</strong>? 
                   This action cannot be undone.
                 </p>
              </div>
              <div className="flex items-center px-4 py-3 space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedAdmin(null);
                  }}
                  className="btn-outline w-full btn-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAdmin}
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

export default AdminManagement;
