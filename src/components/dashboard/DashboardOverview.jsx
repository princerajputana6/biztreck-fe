import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ReduxExample from '../common/ReduxExample';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FolderOpen, 
  Settings, 
  BarChart3, 
  Calendar, 
  Target,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

const DashboardOverview = () => {
  const stats = [
    { 
      name: 'Total Projects', 
      value: '24', 
      change: '+12%', 
      changeType: 'increase',
      icon: FolderOpen,
      color: 'blue'
    },
    { 
      name: 'Active Processes', 
      value: '18', 
      change: '+5%', 
      changeType: 'increase',
      icon: Settings,
      color: 'green'
    },
    { 
      name: 'Pipeline Value', 
      value: '$2.4M', 
      change: '+8%', 
      changeType: 'increase',
      icon: BarChart3,
      color: 'purple'
    },
    { 
      name: 'Team Members', 
      value: '12', 
      change: '+2', 
      changeType: 'increase',
      icon: Users,
      color: 'indigo'
    },
  ];

  const quickActions = [
    { name: 'Create Project', icon: FolderOpen, href: '/projects/create', color: 'blue' },
    { name: 'Start Process', icon: Settings, href: '/processes/create', color: 'green' },
    { name: 'Add Lead', icon: Target, href: '/pipelines/leads/new', color: 'purple' },
    { name: 'Schedule Meeting', icon: Calendar, href: '/calendar/new', color: 'indigo' },
  ];

  const recentActivity = [
    { id: 1, action: 'Project Alpha updated', time: '2 hours ago', user: 'John Doe', type: 'project', status: 'completed' },
    { id: 2, action: 'New lead added to pipeline', time: '4 hours ago', user: 'Jane Smith', type: 'lead', status: 'pending' },
    { id: 3, action: 'Process workflow completed', time: '6 hours ago', user: 'Mike Johnson', type: 'process', status: 'completed' },
    { id: 4, action: 'Team meeting scheduled', time: '1 day ago', user: 'Sarah Wilson', type: 'meeting', status: 'scheduled' },
  ];

  const projectStatus = [
    { status: 'Completed', count: 8, percentage: 33, color: 'bg-green-500' },
    { status: 'In Progress', count: 12, percentage: 50, color: 'bg-blue-500' },
    { status: 'Planning', count: 4, percentage: 17, color: 'bg-yellow-500' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'project':
        return 'bg-blue-100 text-blue-800';
      case 'lead':
        return 'bg-purple-100 text-purple-800';
      case 'process':
        return 'bg-green-100 text-green-800';
      case 'meeting':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-3">Welcome back, John! 👋</h1>
          <p className="text-blue-100 text-lg">Here's what's happening with your business today.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full translate-y-16 -translate-x-16"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} padding="small" className="hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className={`flex items-center mt-2 text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <Icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <Card.Header>
            <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-gray-600 text-sm">Get started with common tasks</p>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.name}
                    variant="outline"
                    fullWidth
                    className="h-24 flex-col space-y-3 hover:shadow-md transition-all duration-300 border-2 hover:border-blue-300"
                  >
                    <div className={`p-2 rounded-lg bg-${action.color}-100`}>
                      <Icon className={`h-6 w-6 text-${action.color}-600`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{action.name}</span>
                  </Button>
                );
              })}
            </div>
          </Card.Body>
        </Card>

        {/* Recent Activity */}
        <Card className="hover:shadow-lg transition-all duration-300">
          <Card.Header>
            <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>
            <p className="text-gray-600 text-sm">Latest updates from your team</p>
          </Card.Header>
          <Card.Body>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-medium">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                        {activity.type}
                      </span>
                      {getStatusIcon(activity.status)}
                    </div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="hover:shadow-lg transition-all duration-300">
          <Card.Header>
            <h3 className="text-xl font-semibold text-gray-900">Project Status</h3>
            <p className="text-gray-600 text-sm">Overview of project completion</p>
          </Card.Header>
          <Card.Body>
            <div className="space-y-6">
              {projectStatus.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.status}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.count} projects</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <Card.Header>
            <h3 className="text-xl font-semibold text-gray-900">Revenue Overview</h3>
            <p className="text-gray-600 text-sm">Financial performance summary</p>
          </Card.Header>
          <Card.Body>
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-gray-900">$2.4M</div>
                <p className="text-lg text-gray-600">Total Revenue</p>
                <div className="flex items-center justify-center text-green-600 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8% from last month
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">+$180K</div>
                  <p className="text-sm text-gray-600">This Month</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">$220K</div>
                  <p className="text-sm text-gray-600">Last Month</p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Redux Example Section */}
      <Card className="hover:shadow-lg transition-all duration-300">
        <Card.Header>
          <h3 className="text-xl font-semibold text-gray-900">Redux State Management</h3>
          <p className="text-gray-600 text-sm">Example of Redux integration</p>
        </Card.Header>
        <Card.Body>
          <ReduxExample />
        </Card.Body>
      </Card>
    </div>
  );
};

export default DashboardOverview;
