import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderOpen,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Eye,
  EyeOff,
  UserPlus
} from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { cn } from '@/utils/cn';
import toast from 'react-hot-toast';
import { adminService, Project, CreateProjectData } from '@/services/adminService';
import AdminNavigation from '@/components/layout/AdminNavigation';

interface CreateProjectForm {
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  endDate: string;
  manager: string;
  client: string;
  budget: {
    estimated: number;
    currency: string;
  };
}

const AdminProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState<CreateProjectForm>({
    name: '',
    description: '',
    status: 'planning',
    priority: 'medium',
    startDate: '',
    endDate: '',
    manager: '',
    client: '',
    budget: {
      estimated: 0,
      currency: 'USD'
    }
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // For now, using mock data since projects API doesn't exist yet
      // In real implementation, this would call the projects API
      const mockProjects: Project[] = [
        {
          _id: '1',
          name: 'E-commerce Platform',
          description: 'Modern e-commerce platform with React and Node.js',
          status: 'active',
          priority: 'high',
          startDate: '2024-01-15',
          endDate: '2024-06-30',
          progress: 65,
          budget: {
            estimated: 50000,
            actual: 32500,
            currency: 'USD'
          },
          createdAt: '2024-01-15',
          updatedAt: '2024-03-15'
        },
        {
          _id: '2',
          name: 'Mobile App Development',
          description: 'Cross-platform mobile app for iOS and Android',
          status: 'planning',
          priority: 'medium',
          startDate: '2024-04-01',
          endDate: '2024-09-30',
          progress: 0,
          budget: {
            estimated: 35000,
            actual: 0,
            currency: 'USD'
          },
          createdAt: '2024-03-01',
          updatedAt: '2024-03-01'
        }
      ];
      
      setProjects(mockProjects);
      setTotalPages(1);
      
      // TODO: Replace with actual API call when projects endpoint is available
      // const response = await adminService.getProjects({
      //   page: currentPage,
      //   limit: 10,
      //   search: search || undefined,
      //   status: statusFilter === 'all' ? undefined : statusFilter,
      //   priority: priorityFilter === 'all' ? undefined : priorityFilter,
      //   sortBy: 'createdAt',
      //   sortOrder: 'desc'
      // });
      // setProjects(response.data.docs || []);
      // setTotalPages(response.data.totalPages || 1);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      toast.error(error.message || 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, search, statusFilter, priorityFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // For now, just add to local state since API doesn't exist
      const newProject: Project = {
        _id: Date.now().toString(),
        name: createForm.name,
        description: createForm.description,
        status: createForm.status,
        priority: createForm.priority,
        startDate: createForm.startDate,
        endDate: createForm.endDate,
        progress: 0,
        budget: {
          estimated: createForm.budget.estimated,
          actual: 0,
          currency: createForm.budget.currency
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setProjects(prev => [newProject, ...prev]);
      toast.success('Project created successfully');
      setShowCreateModal(false);
      setCreateForm({
        name: '',
        description: '',
        status: 'planning',
        priority: 'medium',
        startDate: '',
        endDate: '',
        manager: '',
        client: '',
        budget: {
          estimated: 0,
          currency: 'USD'
        }
      });
      
      // TODO: Replace with actual API call when projects endpoint is available
      // const projectData: CreateProjectData = {
      //   name: createForm.name,
      //   description: createForm.description,
      //   status: createForm.status,
      //   priority: createForm.priority,
      //   startDate: createForm.startDate,
      //   endDate: createForm.endDate,
      //   manager: createForm.manager || undefined,
      //   client: createForm.client || undefined,
      //   budget: createForm.budget
      // };
      // await adminService.createProject(projectData);
      // fetchProjects();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create project');
    }
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;

    try {
      // For now, just remove from local state since API doesn't exist
      setProjects(prev => prev.filter(p => p._id !== selectedProject._id));
      toast.success('Project deleted successfully');
      setShowDeleteModal(false);
      setSelectedProject(null);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete project');
    }
  };

  const handleToggleStatus = async (project: Project) => {
    try {
      // For now, just update local state since API doesn't exist
      setProjects(prev => prev.map(p => 
        p._id === project._id 
          ? { ...p, status: p.status === 'active' ? 'on-hold' : 'active' }
          : p
      ));
      
      const newStatus = project.status === 'active' ? 'on-hold' : 'active';
      toast.success(`Project ${newStatus === 'active' ? 'activated' : 'put on hold'} successfully`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update project status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'urgent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    if (progress >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (loading) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <FolderOpen className="h-8 w-8 mr-3 text-indigo-600" />
                Project Management
              </h1>
              <p className="mt-1 text-gray-600">
                Manage projects, track progress, and coordinate team efforts
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary btn-md"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Project
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
                  placeholder="Search projects by name or description..."
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
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              className="input w-auto"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as any)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Projects List */}
        <div className="card">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Projects ({projects ? projects.length : 0})
            </h3>
          </div>
          
          {(!projects || projects.length === 0) && !loading && (
            <div className="px-6 py-8 text-center">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-4">
                {search ? `No projects match "${search}"` : 'No projects have been created yet.'}
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary btn-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Project
              </button>
            </div>
          )}
          
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <LoadingSpinner />
              <p className="text-gray-600 mt-4">Loading projects...</p>
            </div>
          )}
          
          {!loading && projects && projects.length > 0 && (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timeline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects && projects.length > 0 ? projects.map((project) => (
                    <tr key={project._id || `project-${Math.random()}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <FolderOpen className="h-5 w-5 text-indigo-700" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {project.name}
                            </div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {project.description || 'No description'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getStatusColor(project.status)
                        )}>
                          {project.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          getPriorityColor(project.priority)
                        )}>
                          {project.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={cn('h-2 rounded-full', getProgressColor(project.progress))}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <div>
                            <div>Start: {new Date(project.startDate).toLocaleDateString()}</div>
                            {project.endDate && (
                              <div>End: {new Date(project.endDate).toLocaleDateString()}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {project.budget ? (
                          <div>
                            <div className="font-medium">
                              ${project.budget.estimated.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">
                              Est. Budget
                            </div>
                          </div>
                        ) : (
                          <span>No budget</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            to={`/admin/projects/${project._id || 'unknown'}/edit`}
                            className="text-indigo-600 hover:text-indigo-900"
                            title="Edit Project"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => project._id && handleToggleStatus(project)}
                            className={cn(
                              'hover:opacity-80',
                              project.status === 'active' ? 'text-yellow-600' : 'text-green-600'
                            )}
                            title={project.status === 'active' ? 'Put on Hold' : 'Activate'}
                            disabled={!project._id}
                          >
                            {project.status === 'active' ? <Clock className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => {
                              if (project._id) {
                                setSelectedProject(project);
                                setShowDeleteModal(true);
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Project"
                            disabled={!project._id}
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

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Project</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    required
                    className="input w-full"
                    value={createForm.name}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="input w-full"
                    value={createForm.description}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      required
                      className="input w-full"
                      value={createForm.status}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, status: e.target.value as any }))}
                    >
                      <option value="planning">Planning</option>
                      <option value="active">Active</option>
                      <option value="on-hold">On Hold</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Priority
                    </label>
                    <select
                      required
                      className="input w-full"
                      value={createForm.priority}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, priority: e.target.value as any }))}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      className="input w-full"
                      value={createForm.startDate}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      className="input w-full"
                      value={createForm.endDate}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Manager
                    </label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Manager name"
                      value={createForm.manager}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, manager: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Client
                    </label>
                    <input
                      type="text"
                      className="input w-full"
                      placeholder="Client name"
                      value={createForm.client}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, client: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estimated Budget
                    </label>
                    <input
                      type="number"
                      className="input w-full"
                      placeholder="0"
                      value={createForm.budget.estimated}
                      onChange={(e) => setCreateForm(prev => ({ 
                        ...prev, 
                        budget: { ...prev.budget, estimated: parseFloat(e.target.value) || 0 }
                      }))}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Currency
                    </label>
                    <select
                      className="input w-full"
                      value={createForm.budget.currency}
                      onChange={(e) => setCreateForm(prev => ({ 
                        ...prev, 
                        budget: { ...prev.budget, currency: e.target.value }
                      }))}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-outline btn-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary btn-md"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedProject && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Delete Project</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete <strong>{selectedProject.name}</strong>? 
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex items-center px-4 py-3 space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedProject(null);
                  }}
                  className="btn-outline w-full btn-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProject}
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

export default AdminProjectManagement;
