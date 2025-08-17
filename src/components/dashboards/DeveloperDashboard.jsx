import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '../../services/api/projectService';
import { 
  Code, 
  FolderOpen, 
  Calendar, 
  Clock,
  CheckCircle,
  GitBranch,
  Activity,
  Target
} from 'lucide-react';

const DeveloperDashboard = () => {
  const [stats, setStats] = useState({
    assignedProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    upcomingDeadlines: 0
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

      // Filter projects where user is a team member (simplified for now)
      const myProjectsList = projects.slice(0, 3); // Mock: showing first 3 as "assigned"

      setStats({
        assignedProjects: myProjectsList.length,
        activeProjects: myProjectsList.filter(p => p.status === 'active').length,
        completedProjects: myProjectsList.filter(p => p.status === 'completed').length,
        upcomingDeadlines: myProjectsList.filter(p => {
          const deadline = new Date(p.deadline);
          const today = new Date();
          const diffTime = deadline - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= 7 && diffDays > 0;
        }).length
      });

      setMyProjects(myProjectsList);
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

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
          <p className="text-gray-600 mt-2">Your projects and development tasks</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <FolderOpen className="h-5 w-5 mr-2" />
            View Projects
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Projects"
          value={stats.assignedProjects}
          icon={FolderOpen}
          color="bg-blue-500"
          description="Projects you're working on"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={Activity}
          color="bg-green-500"
          description="Currently in progress"
        />
        <StatCard
          title="Completed"
          value={stats.completedProjects}
          icon={CheckCircle}
          color="bg-emerald-500"
          description="Successfully finished"
        />
        <StatCard
          title="Upcoming Deadlines"
          value={stats.upcomingDeadlines}
          icon={Clock}
          color="bg-orange-500"
          description="Due within 7 days"
        />
      </div>

      {/* My Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">My Projects</h3>
          <div className="space-y-3">
            {myProjects.map((project) => (
              <div key={project._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Code className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{project.title}</p>
                    <p className="text-xs text-gray-500">
                      Deadline: {new Date(project.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status || 'active'}
                  </span>
                  {getDaysUntilDeadline(project.deadline) <= 7 && getDaysUntilDeadline(project.deadline) > 0 && (
                    <span className="text-xs text-orange-600 font-medium">
                      {getDaysUntilDeadline(project.deadline)}d left
                    </span>
                  )}
                </div>
              </div>
            ))}
            {myProjects.length === 0 && (
              <p className="text-gray-500 text-center py-4">No projects assigned yet</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <GitBranch className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Code Reviews</p>
                <p className="text-xs text-gray-500">3 pending reviews</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Tasks Completed</p>
                <p className="text-xs text-gray-500">12 tasks this week</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-900">Time Logged</p>
                <p className="text-xs text-gray-500">32 hours this week</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/projects"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FolderOpen className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">View Projects</p>
              <p className="text-sm text-gray-500">See all assigned projects</p>
            </div>
          </Link>
          <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <Code className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Code Repository</p>
              <p className="text-sm text-gray-500">Access project repositories</p>
            </div>
          </div>
          <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <Target className="h-6 w-6 text-purple-600 mr-3" />
            <div>
              <p className="font-medium text-gray-900">Task Board</p>
              <p className="text-sm text-gray-500">View and update tasks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
