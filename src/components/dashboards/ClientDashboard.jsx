import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../../services/api/projectService';
import { 
  FolderOpen, 
  Calendar, 
  DollarSign,
  Clock,
  CheckCircle,
  MessageCircle,
  FileText,
  Eye
} from 'lucide-react';

const ClientDashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalInvestment: 0
  });
  const [myProjects, setMyProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await projectService.getProjects();
      const projects = response.projects || [];

      // Filter projects owned by client (simplified for now)
      const clientProjects = projects.slice(0, 4); // Mock: showing first 4 as client's projects

      const totalInvestment = clientProjects.reduce((sum, project) => {
        const b = project.budget;
        const val = typeof b === 'number'
          ? b
          : (b && typeof b === 'object' && typeof b.amount === 'number')
              ? b.amount
              : 0;
        return sum + val;
      }, 0);

      setStats({
        totalProjects: clientProjects.length,
        activeProjects: clientProjects.filter(p => p.status === 'active').length,
        completedProjects: clientProjects.filter(p => p.status === 'completed').length,
        totalInvestment
      });

      setMyProjects(clientProjects);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, description }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center">
        <div className={`p-3 ${color} rounded-xl mr-4`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600">{title}</p>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = (project) => {
    // Mock progress calculation based on status
    switch (project.status) {
      case 'completed': return 100;
      case 'active': return Math.floor(Math.random() * 50) + 30; // 30-80%
      case 'on-hold': return Math.floor(Math.random() * 30) + 10; // 10-40%
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your projects and investments</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            to="/projects/create"
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FolderOpen className="h-5 w-5 mr-2" />
            New Project
          </Link>
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Eye className="h-5 w-5 mr-2" />
            View All
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={FolderOpen}
          color="bg-blue-500"
          description="All your projects"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={Clock}
          color="bg-green-500"
          description="Currently in progress"
        />
        <StatCard
          title="Completed"
          value={stats.completedProjects}
          icon={CheckCircle}
          color="bg-emerald-500"
          description="Successfully delivered"
        />
        <StatCard
          title="Total Investment"
          value={`$${stats.totalInvestment.toLocaleString()}`}
          icon={DollarSign}
          color="bg-purple-500"
          description="Total project budget"
        />
      </div>

      {/* My Projects */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">My Projects</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myProjects.map((project) => {
            const progress = getProgressPercentage(project);
            return (
              <div key={project._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                      <FolderOpen className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{project.title}</h4>
                      <p className="text-xs text-gray-500">
                        Budget: {
                          typeof project.budget === 'number'
                            ? `$${project.budget.toLocaleString()}`
                            : (project.budget && typeof project.budget === 'object' && typeof project.budget.amount === 'number')
                                ? `$${project.budget.amount.toLocaleString()}`
                                : 'N/A'
                        }
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status || 'active'}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {project.team?.length || 0} members
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {myProjects.length === 0 && (
            <div className="col-span-2 text-center py-8">
              <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No projects yet</p>
              <Link
                to="/projects/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-3"
              >
                Create Your First Project
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/projects/create"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FolderOpen className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Start New Project</p>
              <p className="text-sm text-gray-500">Create a new project</p>
            </div>
          </Link>
          <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <MessageCircle className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Contact Support</p>
              <p className="text-sm text-gray-500">Get help with your projects</p>
            </div>
          </div>
          <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <FileText className="h-6 w-6 text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Project Reports</p>
              <p className="text-sm text-gray-500">View detailed reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
